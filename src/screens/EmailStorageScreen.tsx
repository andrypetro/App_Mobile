import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { storeEmail, getEmails, removeEmail } from '../storage/emailStorage';

const EmailStorageScreen = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    const fetchEmails = async () => {
      const storedEmails = await getEmails();
      setEmails(storedEmails || []);
    };
    fetchEmails();
  }, []);

  const addEmail = async () => {
    if (newEmail.trim() === '') {
      Alert.alert('Error', 'El campo de correo no puede estar vacío');
      return;
    }

    // Separar correos pegados por espacios, comas, punto y coma o saltos de línea
    const emailArray = newEmail
      .split(/[\s,;]+/) // Divide por espacios, comas o punto y coma
      .map(email => email.trim()) // Limpia espacios adicionales
      .filter(email => email !== ''); // Elimina vacíos

    if (emailArray.length === 0) {
      Alert.alert('Error', 'No se detectaron correos válidos');
      return;
    }

    // Obtener correos almacenados
    const storedEmails = await getEmails();

    // Evitar correos duplicados
    const uniqueEmails = [...new Set([...storedEmails, ...emailArray])];

    // Guardar y actualizar lista
    await storeEmail(uniqueEmails);
    setEmails(uniqueEmails);
    setNewEmail('');
  };

  const deleteEmail = async (emailToDelete: string) => {
    await removeEmail(emailToDelete);
    const updatedEmails = await getEmails();
    setEmails(updatedEmails || []);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar Correos</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese correos (separados por comas, espacios o saltos de línea)"
        value={newEmail}
        onChangeText={setNewEmail}
        multiline
      />
      <Button title="Agregar" onPress={addEmail} />

      <FlatList
        data={emails}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.emailItem}>
            <Text style={styles.emailText}>{item}</Text>
            <Button title="❌" onPress={() => deleteEmail(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5, minHeight: 60 },
  emailItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1 },
  emailText: { fontSize: 16 },
});

export default EmailStorageScreen;
