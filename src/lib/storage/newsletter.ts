interface NewsletterSubscriber {
  email: string;
  date: string;
}

export const newsletterStorage = {
  subscribe: (email: string): void => {
    const subscribers: NewsletterSubscriber[] = JSON.parse(
      localStorage.getItem('newsletter_subscribers') || '[]'
    );
    subscribers.push({ email, date: new Date().toISOString() });
    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
  },

  getSubscribers: (): NewsletterSubscriber[] => {
    return JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
  }
};