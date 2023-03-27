import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text, TextInput } from 'react-native';

const Field = ({ label, inputType }) => {
  const [input, setInput] = useState('');

  const keyboardType = inputType === 'quantity' or ===''? 'numeric' : 'default';

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        keyboardType={keyboardType}
        value={input}
        onChangeText={setInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default Field;
