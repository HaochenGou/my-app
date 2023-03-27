import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text, TextInput } from 'react-native';

const Field = ({ label, onChangeText, isNumberInput }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateValue, setDateValue] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateValue(date.toISOString().substring(0, 10));
    onChangeText(date.getTime());
    hideDatePicker();
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
        {isDateInput ? (
<>
<Pressable onPress={showDatePicker} style={styles.dateInput}>
<Text>{dateValue || 'Select date'}</Text>
</Pressable>
<DateTimePickerModal
         isVisible={isDatePickerVisible}
         mode="date"
         onConfirm={handleConfirm}
         onCancel={hideDatePicker}
       />
</>
) : (
<TextInput
style={styles.input}
onChangeText={onChangeText}
keyboardType={isNumberInput ? 'numeric' : 'default'}
/>
)}
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
dateInput: {
borderWidth: 1,
borderColor: '#ccc',
padding: 10,
borderRadius: 5,
},
});

export default Field;
