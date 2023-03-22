import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Field from '../components/Field';

const InputPage = () => {

  return (
    <View style={styles.container}>
        <Field label="Order Address"/>
        <Field label="Order Name"/>
        <Field label="Order License"/>
        <Field label="Order Payment"/>
        <Field label="Order number"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default InputPage;
