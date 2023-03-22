import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import InputPage from './pages/Input';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Button from './components/Button';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.footerContainer}>
        <Button theme="input" label="Input Order" direction="Input"/>
        <Button theme="view" label="View/Edit Order" />
        <Button theme="paid" label="Paid Order" />
        <Button theme="delivered" label="Delivered Order/History" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Input" component={InputPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  }
});
