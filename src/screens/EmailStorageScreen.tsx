import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import emailStorage from '../storage/emailStorage';

const EmailStorageScreen = () => {
  const [emails, setEmails] = useState<string[]>([]);

  useEffect(() => {
    const fetchEmails = async () => {
      const storedEmails = await emailStorage.getEmails();
      setEmails(storedEmails);
    };

    fetchEmails();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Correos Almacenados</Text>
      <FlatList
        data={emails}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.email}>{item}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default EmailStorageScreen;
