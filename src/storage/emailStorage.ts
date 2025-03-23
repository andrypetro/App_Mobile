import AsyncStorage from '@react-native-async-storage/async-storage';

// Guarda múltiples correos en el almacenamiento
export const storeEmail = async (emails: string | string[]) => {
  try {
    const storedEmails = await AsyncStorage.getItem('emails');
    const emailList = storedEmails ? JSON.parse(storedEmails) : [];

    // Convertir a array si es solo un string
    const emailsToStore = Array.isArray(emails) ? emails : [emails];

    // Agregar nuevos correos y eliminar duplicados
    const uniqueEmails = [...new Set([...emailList, ...emailsToStore])];

    await AsyncStorage.setItem('emails', JSON.stringify(uniqueEmails));
  } catch (error) {
    console.error('Error al guardar los correos:', error);
  }
};

// Obtiene todos los correos almacenados
export const getEmails = async (): Promise<string[]> => {
  try {
    const storedEmails = await AsyncStorage.getItem('emails');
    return storedEmails ? JSON.parse(storedEmails) : [];
  } catch (error) {
    console.error('Error al obtener los correos:', error);
    return [];
  }
};

// Elimina un correo del almacenamiento
export const removeEmail = async (email: string) => {
  try {
    const storedEmails = await AsyncStorage.getItem('emails');
    let emailList = storedEmails ? JSON.parse(storedEmails) : [];
    emailList = emailList.filter((e: string) => e !== email);
    await AsyncStorage.setItem('emails', JSON.stringify(emailList));
  } catch (error) {
    console.error('Error al eliminar el correo:', error);
  }
};
