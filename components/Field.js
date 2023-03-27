import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

const Field = ({ label, onChangeText, isNumberInput }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, isNumberInput && styles.numberInput]}
        onChangeText={onChangeText}
        keyboardType={isNumberInput ? 'numeric' : 'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 16,
    minWidth: 80,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  numberInput: {
    width: 80,
  },
});

export default Field;
