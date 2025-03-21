import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Nav from './Screen/Nav';
import Scan from './Screen/Scan';
import Payment from './Screen/Payment';
import SuccessScreen from './Screen/SuccessScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={Nav} />
        <Stack.Screen name='Scan' component={Scan} />
        <Stack.Screen name='Payment' component={Payment} />
        <Stack.Screen name='SuccessScreen' component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
