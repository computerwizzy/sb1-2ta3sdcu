import { serve } from 'https://deno.fresh.runtime.dev';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
const GOOGLE_SHEETS_ID = Deno.env.get('GOOGLE_SHEETS_ID')!;
const GOOGLE_SERVICE_ACCOUNT = JSON.parse(Deno.env.get('GOOGLE_SERVICE_ACCOUNT')!);

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

serve(async (req) => {
  try {
    // Get the email from the newsletter_subscriptions table
    const { data: subscriptions, error } = await supabase
      .from('newsletter_subscriptions')
      .select('email, created_at')
      .eq('synced_to_sheets', false);

    if (error) throw error;

    if (!subscriptions?.length) {
      return new Response(JSON.stringify({ message: 'No new subscriptions' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Prepare the values for Google Sheets
    const values = subscriptions.map(sub => [
      sub.email,
      new Date(sub.created_at).toISOString()
    ]);

    // Append to Google Sheets
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/A1:B1:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await getAccessToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: values,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to append to Google Sheets');
    }

    // Update synced status in Supabase
    const { error: updateError } = await supabase
      .from('newsletter_subscriptions')
      .update({ synced_to_sheets: true })
      .in('email', subscriptions.map(sub => sub.email));

    if (updateError) throw updateError;

    return new Response(
      JSON.stringify({ 
        message: `Successfully synced ${subscriptions.length} subscriptions` 
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

async function getAccessToken() {
  const jwtHeader = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const jwtClaimSet = {
    iss: GOOGLE_SERVICE_ACCOUNT.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = btoa(JSON.stringify(jwtHeader));
  const encodedClaimSet = btoa(JSON.stringify(jwtClaimSet));
  const signatureInput = `${encodedHeader}.${encodedClaimSet}`;
  
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    GOOGLE_SERVICE_ACCOUNT.private_key,
    new TextEncoder().encode(signatureInput)
  );

  const jwt = `${signatureInput}.${btoa(String.fromCharCode(...new Uint8Array(signature)))}`;

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  const { access_token } = await tokenResponse.json();
  return access_token;
}