import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import EmailStorageScreen from './screens/EmailStorageScreen';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  EmailStorage: undefined;
  ManageEmails: undefined; // ✅ Agregar esta línea
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EmailStorage" component={EmailStorageScreen} />
        <Stack.Screen name="ManageEmails" component={EmailStorageScreen} /> {/* ✅ Agregar esta línea */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
