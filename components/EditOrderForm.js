import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const EditOrderForm = ({ selectedOrder, setSelectedOrder }) => {
  const handleChange = (key, value) => {
    setSelectedOrder({ ...selectedOrder, [key]: value });
  };

  return (
    <View>
      <Text style={styles.label}>
        Order Address:
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange("orderAddress", text)}
          value={selectedOrder.orderAddress}
          placeholder="Order Address"
        />
      </Text>
      <Text style={styles.label}>
        Order Name:
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange("orderName", text)}
          value={selectedOrder.orderName}
          placeholder="Order Name"
        />
      </Text>
      <Text style={styles.label}>
        Order Number:
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange("orderNumber", text)}
          value={selectedOrder.orderNumber}
          placeholder="Order Number"
        />
      </Text>
      <Text style={styles.label}>
        Order Date:
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange("orderDate", text)}
          value={selectedOrder.orderDate}
          placeholder="Order Date"
        />
      </Text>
      <Text style={styles.label}>
        Order License:
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange("orderLicense", text)}
          value={selectedOrder.orderLicense}
          placeholder="Order License"
        />
      </Text>

      {/* Add other input fields for other details */}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default EditOrderForm;
