import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { injectRegistrationScript } from '../scripts/injectScript';
import { getEmails } from '../storage/emailStorage';

// Definimos los métodos que HomeScreen podrá usar
export type WebViewRef = {
  injectScript: () => Promise<void>;
  reloadWebView: () => void;
};

type WebViewComponentProps = {
  url: string;
};

// forwardRef permite que HomeScreen acceda a métodos de este componente
const WebViewComponent = forwardRef<WebViewRef, WebViewComponentProps>(({ url }, ref) => {
  const webViewRef = useRef<WebView>(null);
  const [emails, setEmails] = useState<string[]>([]);
  const [webKey, setWebKey] = useState(0); // 🔥 Cambia la clave para forzar recarga del WebView

  // Función para cargar correos y actualizar el estado
  const loadEmails = async () => {
    const storedEmails = await getEmails();
    console.log("📩 Correos obtenidos:", storedEmails);
    setEmails(storedEmails || []);
  };

  useEffect(() => {
    loadEmails();
  }, []);

  // Exponemos el método `injectScript` y `reloadWebView`
  useImperativeHandle(ref, () => ({
    injectScript: async () => {
      await loadEmails();

      console.log("📩 Correos después de recargar:", emails);
      if (!emails || emails.length === 0) {
        console.warn("⚠️ No hay correos disponibles. Agrega correos antes de continuar.");
        return;
      }

      if (webViewRef.current) {
        const scriptToInject = injectRegistrationScript(emails);
        console.log("🟢 Inyectando script con correos:", emails);
        webViewRef.current.injectJavaScript(scriptToInject);
      }
    },
    reloadWebView: () => {
      setWebKey(prevKey => prevKey + 1); // 🔥 Cambiamos la clave para forzar recarga
    },
  }));

  return (
    <View style={styles.container}>
      <WebView
        key={webKey} // 🔥 Se cambia la clave del WebView, forzando su recarga
        ref={webViewRef}
        source={{ uri: url }}
        javaScriptEnabled
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default WebViewComponent;
