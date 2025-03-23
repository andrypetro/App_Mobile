import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { injectRegistrationScript } from '../scripts/injectScript';
import { Button, View } from 'react-native';

const WebViewComponent = () => {
  const webViewRef = useRef(null);

  const injectScript = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(injectRegistrationScript);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView 
        ref={webViewRef}
        source={{ uri: 'https://auth.ankama.com/register/ankama/form?origin_tracker=https://ankabox.ankama.com/es/identificacion?from%3Dhttps%253A%252F%252Fankabox.ankama.com%252Fes%26authlogin%3D8663E36437937395C2B945968064&redirect_uri=https://auth.ankama.com/login-authorized?state%3DeyJzdGF0ZV9pZCI6IjlmemVvcS01QzJDR0I3ZVlrMUh0S2NrMnJrZWg0TmJyamttem55NWxtM3MiLCJyZWRpcmVjdF91cmkiOiJodHRwczovL2FjY291bnQuYW5rYW1hLmNvbS9hdXRob3JpemVkIiwicHJvdmlkZXIiOiJBbmthbWEifQ' }} 
      />
      <Button title="Iniciar automatización" onPress={injectScript} />
    </View>
  );
};

export default WebViewComponent;



