import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { WebView } from 'react-native-webview';
import { injectRegistrationScript } from '../scripts/injectScript';

export type WebViewRef = {
  injectScript: () => void;
};

const WebViewComponent = forwardRef<WebViewRef, { url: string }>(({ url }, ref) => {
  const webViewRef = useRef<WebView>(null);

  useImperativeHandle(ref, () => ({
    injectScript: () => {
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(injectRegistrationScript);
      }
    },
  }));

  return (
    <WebView 
      ref={webViewRef}
      source={{ uri: url }} // Usa la URL que viene como prop
      javaScriptEnabled
    />
  );
});

export default WebViewComponent;
