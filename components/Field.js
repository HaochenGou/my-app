import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text, TextInput } from 'react-native';


const field = ({ label, theme }) => {
    const [input, setInput] = useState('');

    
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
