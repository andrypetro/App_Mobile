import React, { useRef, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import WebViewComponent, { WebViewRef } from '../components/WebViewComponent';
import Buttons from '../components/Buttons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const webViewRef = useRef<WebViewRef>(null);
  
  // Estado para manejar la URL actual
  const [url, setUrl] = useState('https://auth.ankama.com/register/ankama/form?origin_tracker=https://ankabox.ankama.com/es/identificacion');

  const injectScript = () => {
    if (webViewRef.current) {
      webViewRef.current.injectScript();
    }
  };

  const reloadWebView = () => {
    // En lugar de recargar, reasignamos la URL para que se reinicie completamente
    setUrl(''); // Vacía la URL temporalmente
    setTimeout(() => setUrl('https://auth.ankama.com/login/ankama/form?origin_tracker=https://ankabox.ankama.com/es/identificacion?from%3Dhttps%253A%252F%252Fankabox.ankama.com%252Fes%26authlogin%3D8663E36437937395C2B945968064&redirect_uri=https://auth.ankama.com/login-authorized?state%3DeyJzdGF0ZV9pZCI6IjZCWngtNDNxTTZ0dHNqVXlXZkEzZlVid0w1el9vcXdoZDdGOW81OFFySXciLCJyZWRpcmVjdF91cmkiOiJodHRwczovL2FjY291bnQuYW5rYW1hLmNvbS9hdXRob3JpemVkIiwicHJvdmlkZXIiOiJBbmthbWEifQ'), 100);
  };

  return (
    <View style={styles.container}>
      <Buttons
        onPress1={() => navigation.navigate('EmailStorage')}
        onPress2={() => console.log('Función futura 1')}
        onPress3={() => console.log('Función futura 2')}
      />
      <WebViewComponent ref={webViewRef} url={url} />
      <Button title="Iniciar automatización" onPress={injectScript} />
      <Button title="Recargar WebView" onPress={reloadWebView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
