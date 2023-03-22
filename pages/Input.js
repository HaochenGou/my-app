import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputPage = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Input 1:</Text>
        <TextInput
          style={styles.input}
          value={input1}
          onChangeText={setInput1}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Input 2:</Text>
        <TextInput
          style={styles.input}
          value={input2}
          onChangeText={setInput2}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Input 3:</Text>
        <TextInput
          style={styles.input}
          value={input3}
          onChangeText={setInput3}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Input 4:</Text>
        <TextInput
          style={styles.input}
          value={input4}
          onChangeText={setInput4}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Input 5:</Text>
        <TextInput
          style={styles.input}
          value={input5}
          onChangeText={setInput5}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
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

export default InputPage;
