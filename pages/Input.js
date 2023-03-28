import React from 'react';
import { StyleSheet, View } from 'react-native';
import OrderInput from '../components/OrderInput';

const InputPage = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
    <OrderInput navigation={navigation} route={route}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
});

export default InputPage;
