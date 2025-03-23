import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storeEmail, getEmails, removeEmail } from '../storage/emailStorage';

const ManageEmailsScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState<string[]>([]);

  // Cargar correos guardados al iniciar la pantalla
  useEffect(() => {
    const fetchEmails = async () => {
      const storedEmails = await getEmails();
      setEmailList(storedEmails || []);
    };
    fetchEmails();
  }, []);

  // Agregar uno o varios correos
  const addEmail = async () => {
    if (email.trim() === '') {
      Alert.alert('Error', 'El campo de correo no puede estar vacío');
      return;
    }

    // Separar correos pegados usando espacios, comas, punto y coma o saltos de línea
    const emailArray = email
      .split(/[\s,;]+/) // Divide por espacios, comas, punto y coma o saltos de línea
      .map(email => email.trim()) // Elimina espacios extra en cada email
      .filter(email => email !== ''); // Quita entradas vacías

    if (emailArray.length === 0) {
      Alert.alert('Error', 'No se detectaron correos válidos');
      return;
    }

    await storeEmail(emailArray); // Guardar los correos como un array
    setEmail(''); // Limpiar input
    updateEmailList(); // Refrescar la lista
  };

  // Eliminar un correo
  const deleteEmail = async (emailToDelete: string) => {
    await removeEmail(emailToDelete);
    updateEmailList();
  };

  // Actualizar la lista de correos después de agregar/eliminar
  const updateEmailList = async () => {
    const updatedEmails = await getEmails();
    setEmailList(updatedEmails || []);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar Correos</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese uno o varios correos"
        value={email}
        onChangeText={setEmail}
        multiline={true} // Permitir pegar varias líneas
      />
      <Button title="Agregar" onPress={addEmail} />

      {/* Lista de correos almacenados */}
      <FlatList
        data={emailList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.emailItem}>
            <Text>{item}</Text>
            <Button title="Eliminar" onPress={() => deleteEmail(item)} />
          </View>
        )}
      />

      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, minHeight: 80, textAlignVertical: 'top' },
  emailItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1 },
});

export default ManageEmailsScreen;
