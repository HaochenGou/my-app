import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Field from '../components/Field';
import { app } from "../firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const InputPage = () => {
  const [orderAddress, setOrderAddress] = useState('');
  const [orderName, setOrderName] = useState('');
  const [orderLicense, setOrderLicense] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDate, setOrderDate] = useState('');
  // Add alcohol quantities as state
  const [birdieJuiceQuantity, setBirdieJuiceQuantity] = useState('');
  const [babyXVodkaQuantity, setBabyXVodkaQuantity] = useState('');
  // Add other alcohols here

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed in:", user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const saveOrder = async () => {
    try {
      const ordersRef = collection(db, "Orders");
      const docRef = await addDoc(ordersRef, {
        orderAddress: orderAddress,
        orderName: orderName,
        orderLicense: orderLicense,
        orderNumber: orderNumber,
        orderDate: new Date(orderDate),
      });
      console.log("Order saved with ID:", docRef.id);

      const alcoholOrders = [
        { label: "Birdie Juice", quantity: birdieJuiceQuantity },
        { label: "Baby-X-Vodka", quantity: babyXVodkaQuantity },
        // Add other alcohols here
      ];

      // Save alcohol orders in the sub-collection
      for (const alcoholOrder of alcoholOrders) {
        const alcoholRef = collection(docRef, "Alcohol");
        await addDoc(alcoholRef, {
          label: alcoholOrder.label,
          quantity: alcoholOrder.quantity,
        });
      }
      console.log("Alcohol orders saved in the sub-collection.");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const cancelOrder = () => {
    // Reset state values
    setOrderAddress('');
    setOrderName('');
    setOrderLicense('');
    setOrderNumber('');
    setOrderDate('');
    setBirdieJuiceQuantity('');
    setBabyXVodkaQuantity('');
    // Reset other alcohol quantities
  };

  signIn("haochen@hawkepro.com", "hawkeprohibition");

  return (
    <View style={styles.container}>
      <Field label="Order Address" onChangeText={setOrderAddress} />
      <Field label="Order Name" onChangeText={setOrderName} />
      <Field label="Order License" onChangeText={setOrderLicense} />
      <Field label="Order number" onChangeText={setOrderNumber} />
      <Field label="Order Date" onChangeText={setOrderDate} isDateInput />
      <Field label="Birdie Juice" onChangeText={setBirdieJuiceQuantity} />
      <Field label="Baby-X-Vodka" onChangeText={setBabyXVodkaQuantity} />
      
      {/* Add other alcohol fields here */}
      {/* Add more alcohol fields as needed */}
      <Button title="Save" onPress={saveOrder} />
      <Button title="Cancel" onPress={cancelOrder} />
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

