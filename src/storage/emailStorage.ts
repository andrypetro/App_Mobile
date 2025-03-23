import AsyncStorage from '@react-native-async-storage/async-storage';

const EMAIL_STORAGE_KEY = 'stored_emails';

const emailStorage = {
  saveEmail: async (email: string) => {
    try {
      const emails = await emailStorage.getEmails();
      emails.push(email);
      await AsyncStorage.setItem(EMAIL_STORAGE_KEY, JSON.stringify(emails));
    } catch (error) {
      console.error('Error al guardar el correo:', error);
    }
  },

  getEmails: async (): Promise<string[]> => {
    try {
      const emails = await AsyncStorage.getItem(EMAIL_STORAGE_KEY);
      return emails ? JSON.parse(emails) : [];
    } catch (error) {
      console.error('Error al recuperar correos:', error);
      return [];
    }
  },
};

export default emailStorage;
