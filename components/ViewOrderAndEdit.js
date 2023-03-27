import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ViewOrderAndEdit = ({ isPaid, setIsPaid, isDelivered, setIsDelivered }) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.checkBoxContainer}>
        <TouchableOpacity onPress={() => setIsPaid(!isPaid)} style={[styles.checkBox, isPaid && styles.checkedBox]}>
          {isPaid && <Text style={styles.checkBoxText}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.checkBoxLabel}>Is Paid</Text>
      </View>
      <View style={styles.checkBoxContainer}>
        <TouchableOpacity onPress={() => setIsDelivered(!isDelivered)} style={[styles.checkBox, isDelivered && styles.checkedBox]}>
          {isDelivered && <Text style={styles.checkBoxText}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.checkBoxLabel}>Is Delivered</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedBox: {
  backgroundColor: 'black',
  },
  checkBoxText: {
  color: 'white',
  },
  checkBoxLabel: {
  fontSize: 16,
  },
  });
  
  export default ViewOrderAndEdit;
 
