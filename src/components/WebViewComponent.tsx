import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { injectRegistrationScript } from '../scripts/injectScript';
import { getEmails } from '../storage/emailStorage';

// Definimos los métodos que HomeScreen podrá usar
export type WebViewRef = {
  injectScript: () => void;
};

type WebViewComponentProps = {
  url: string;
};

// forwardRef permite que HomeScreen acceda a métodos de este componente
const WebViewComponent = forwardRef<WebViewRef, WebViewComponentProps>(({ url }, ref) => {
  const webViewRef = useRef<WebView>(null);
  const [emails, setEmails] = useState<string[]>([]);

  useEffect(() => {
    const loadEmails = async () => {
      const storedEmails = await getEmails();
      setEmails(storedEmails);
    };

    loadEmails();
  }, []);

  // Exponemos el método `injectScript`
  useImperativeHandle(ref, () => ({
    injectScript: () => {
      if (webViewRef.current) {
        const scriptToInject = injectRegistrationScript(emails);
        webViewRef.current.injectJavaScript(scriptToInject);
      }
    },
  }));

  return (
    <View style={styles.container}>
      <WebView
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
