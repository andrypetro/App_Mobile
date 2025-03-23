import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import WebViewComponent from '../components/WebViewComponent';
import Buttons from '../components/Buttons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation'; // Importa los tipos de navegación

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Tipado correcto

  return (
    <View style={styles.container}>
      <Buttons
        onPress1={() => navigation.navigate('EmailStorage')}
        onPress2={() => console.log('Función futura 1')}
        onPress3={() => console.log('Función futura 2')}
      />
      <WebViewComponent />
      <Button title="Iniciar automatización" onPress={() => console.log('Automatización iniciada')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
