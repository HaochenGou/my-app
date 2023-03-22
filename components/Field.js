import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text, TextInput } from 'react-native';


const Field = ({ label}) => {
    const [input, setInput] = useState('');

    
  return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
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