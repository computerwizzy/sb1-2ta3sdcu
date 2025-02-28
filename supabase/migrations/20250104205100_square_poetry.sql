/*
  # Update admin user email

  Updates the email address for the admin user to match the correct credentials
*/

UPDATE auth.users
SET email = 'computerwizzy@ymail.com'
WHERE email = 'wizzy';