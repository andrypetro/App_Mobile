import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import EmailStorageScreen from './screens/EmailStorageScreen';

// 👇 Exporta correctamente la lista de parámetros de navegación
export type RootStackParamList = {
  Home: undefined;
  EmailStorage: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EmailStorage" component={EmailStorageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
