import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Button from './components/Button';



const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.footerContainer}>
        <Button theme="input" label="Input Order" />
        <Button theme="view" label="View/Edit Order" />
        <Button theme="paid" label="Paid Order" />
        <Button theme="delivered" label="Delivered Order/History" />
      </View>
      <StatusBar style="auto" />
    </View>
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
