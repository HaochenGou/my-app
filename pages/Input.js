import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Field from '../components/Field';
import { app } from "../firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";
import { CommonActions } from '@react-navigation/native';


const auth = getAuth(app);
const db = getFirestore(app);

const InputPage = ({navigation}) => {
  const [orderAddress, setOrderAddress] = useState('');
  const [orderName, setOrderName] = useState('');
  const [orderLicense, setOrderLicense] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDate, setOrderDate] = useState('');
  // Add alcohol quantities as state
  const [birdieJuiceQuantity, setBirdieJuiceQuantity] = useState(0);
  const [babyXVodkaQuantity, setBabyXVodkaQuantity] = useState(0);
  const [LadySophiaQuantity, setLadySophiaQuantity] = useState(0);
  const [SugarLipsVodkaQuantity, setSugarLipsVodkaQuantity] = useState(0);
  const [SirPerwinkleGinQuantity, setSirPerwinkleGinQuantity] = useState(0);
  const [ScoundrelRumbumQuantity, setScoundrelRumbumQuantity] = useState(0);
  const [ThickDirtySignatureCreamQuantity, setThickDirtySignatureCreamQuantity] = useState(0);
  const [ThickDirtyRootBeerQuantity, setThickDirtyRootBeerQuantity] = useState(0);
  const [ThickDirtySaltedCaramelQuantity, setThickDirtySaltedCaramelQuantity] = useState(0);
  const [WilliamLondonDryQuantity, setWilliamLondonDryQuantity] = useState(0)

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
      if (!orderAddress || !orderName || !orderLicense || !orderNumber || !orderDate) {
        // Show alert if any of the required fields are empty
        alert("Please fill in all required fields");
        return;
      }
  
      const ordersRef = collection(db, "Orders");
      const docRef = await addDoc(ordersRef, {

        orderAddress: orderAddress,
        orderName: orderName,
        orderLicense: orderLicense,
        orderNumber: orderNumber,
        orderDate: orderDate,
      });
      console.log("Order saved with ID:", docRef.id);

      const alcoholOrders = [
        { label: "Birdie Juice", quantity: birdieJuiceQuantity },
        { label: "Baby-X-Vodka", quantity: babyXVodkaQuantity },
        { label: "Lady Sophia", quantity: LadySophiaQuantity},
        { label: "SugarLips Vodka", quantity: SugarLipsVodkaQuantity},
        { label: "Sir Perwinkle Gin", quantity: SirPerwinkleGinQuantity},
        { label: "Scoundrel Rumbum", quantity: ScoundrelRumbumQuantity},
        { label: "Thick & Dirty Signature Cream", quantity: ThickDirtySignatureCreamQuantity},
        { label: "Thick & Dirty Root Beer", quantity: ThickDirtyRootBeerQuantity},
        { label: "Thick & Dirty Salted Caramel", quantity: ThickDirtySaltedCaramelQuantity},
        { label: "William London Dry", quantity: WilliamLondonDryQuantity}
        // Add other alcohols here
      ];

      // Save alcohol orders in the sub-collection
      for (const alcoholOrder of alcoholOrders) {
        const alcoholRef = doc(docRef, "alcohol", alcoholOrder.label);
        await setDoc(alcoholRef, {
        label: alcoholOrder.label,
        quantity: alcoholOrder.quantity,
      });
      }
      console.log("Alcohol orders saved in the sub-collection.");

    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const resetOrder = () => {
      // Reset state values
      setOrderAddress('');
      setOrderName('');
      setOrderLicense('');
      setOrderNumber('');
      setOrderDate('');
      setBirdieJuiceQuantity(0);
      setBabyXVodkaQuantity(0);
      setLadySophiaQuantity(0);
      setSugarLipsVodkaQuantity(0);
      setSirPerwinkleGinQuantity(0);
      setScoundrelRumbumQuantity(0);
      setThickDirtySignatureCreamQuantity(0);
      setThickDirtyRootBeerQuantity(0);
      setThickDirtySaltedCaramelQuantity(0);
      setWilliamLondonDryQuantity(0)
      // Reset other alcohol quantities
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Home' },
            { name: 'Input Order' },
          ],
        })
      );
      
    };

  signIn("haochen@hawkepro.com", "hawkeprohibition");

  return (
    <View style={styles.container}>
      <Field label="Order Address" onChangeText={setOrderAddress} />
      <Field label="Order Name" onChangeText={setOrderName} />
      <Field label="Order License" onChangeText={setOrderLicense} />
      <Field label="Order number" onChangeText={setOrderNumber} />
      <Field label="Order Date" onChangeText={setOrderDate} />
      <Field label="Birdie Juice" onChangeText={setBirdieJuiceQuantity} isNumberInput/>
      <Field label="Baby-X-Vodka" onChangeText={setBabyXVodkaQuantity} isNumberInput/>
      <Field label="Lady Sophia" onChangeText={setLadySophiaQuantity} isNumberInput/>
      <Field label="SugarLips Vodka" onChangeText={setSugarLipsVodkaQuantity} isNumberInput/>
      <Field label="Sir Perwinkle Gin" onChangeText={setSirPerwinkleGinQuantity} isNumberInput/>
      <Field label="Scoundrel Rumbum" onChangeText={setScoundrelRumbumQuantity} isNumberInput/>
      <Field label="Thick & Dirty Signature Cream" onChangeText={setThickDirtySignatureCreamQuantity} isNumberInput/>
      <Field label="Thick & Dirty Root Beer" onChangeText={setThickDirtyRootBeerQuantity} isNumberInput/>
      <Field label="Thick & Dirty Salted Caramel" onChangeText={setThickDirtySaltedCaramelQuantity} isNumberInput/>
      <Field label="William London Dry" onChangeText={setWilliamLondonDryQuantity} isNumberInput/>

      {/* Add other alcohol fields here */}
      {/* Add more alcohol fields as needed */}
      <TouchableOpacity style={styles.button} onPress={saveOrder}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={resetOrder}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default InputPage;

