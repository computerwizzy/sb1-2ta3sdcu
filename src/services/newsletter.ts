import { newsletterStorage } from '../lib/storage/newsletter';

export const newsletterService = {
  subscribe: async (email: string): Promise<void> => {
    newsletterStorage.subscribe(email);
  },

  getSubscribers: async () => {
    return newsletterStorage.getSubscribers();
  }
};