import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import OrderInput from '../components/OrderInput';

const InputPage = ({ navigation, route }) => {
  return (
    <OrderInput navigation={navigation} route={route}/>
  );
};

export default InputPage;
