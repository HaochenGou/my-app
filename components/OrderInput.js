import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Field from '../components/Field';
import { app } from "../firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { CommonActions } from '@react-navigation/native';

const auth = getAuth(app);
const db = getFirestore(app);

const OrderInput = ({ navigation, route }) => {
  const [orderAddress, setOrderAddress] = useState('');
  const [orderName, setOrderName] = useState('');
  const [orderLicense, setOrderLicense] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
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
  const docId = route.params?.docId;

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed in:", user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  useEffect(() => {
    if (docId) {
      fetchDocument(docId);
    }
  }, [docId]);

  const fetchDocument = async (docId) => {
    try {
      const docRef = doc(db, "Orders", docId);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        setOrderAddress(data.orderAddress);
        setOrderName(data.orderName);
        setOrderLicense(data.orderLicense);
        setOrderNumber(data.orderNumber);
        setOrderDate(data.orderDate);
        setIsPaid(data.isPaid);
        setIsDelivered(data.isDelivered);
        // Add alcohol quantities as state
        setBirdieJuiceQuantity(data.birdieJuiceQuantity);
        setBabyXVodkaQuantity(data.babyXVodkaQuantity);
        setLadySophiaQuantity(data.LadySophiaQuantity);
        setSugarLipsVodkaQuantity(data.SugarLipsVodkaQuantity);
        setSirPerwinkleGinQuantity(data.SirPerwinkleGinQuantity);
        setScoundrelRumbumQuantity(data.ScoundrelRumbumQuantity);
        setThickDirtySignatureCreamQuantity(data.ThickDirtySignatureCreamQuantity);
        setThickDirtyRootBeerQuantity(data.ThickDirtyRootBeerQuantity);
        setThickDirtySaltedCaramelQuantity(data.ThickDirtySaltedCaramelQuantity);
        setWilliamLondonDryQuantity(data.WilliamLondonDryQuantity);
        // Add other alcohols here
        } else {
        console.log("No such document!");
        }
        } catch (error) {
            console.error("Error fetching document:", error);
        }
    };

       
  
  

  const saveOrder = async () => {
    try {
      if (!orderAddress && !orderName && !orderLicense && !orderNumber && !orderDate) {
        // Show alert if all required fields are empty
        alert("Please fill in at least one field");
        return;
      }

      const ordersRef = collection(db, "Orders");
      if(docId) {
        const docRef = doc(db, "Orders", docId);
        await updateDoc(docRef, {
            orderAddress: orderAddress,
            orderName: orderName,
            orderLicense: orderLicense,
            orderNumber: orderNumber,
            orderDate: orderDate,
            isPaid: isPaid,
            isDelivered: isDelivered,
            // Add alcohol quantities as state
        });
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
          for (const alcoholOrder of alcoholOrders) {
            const alcoholRef = doc(docRef, "alcohol", alcoholOrder.label);
            await setDoc(alcoholRef, {
            label: alcoholOrder.label,
            quantity: alcoholOrder.quantity,
          });
        }
        } else {
      const docRef = await addDoc(ordersRef, {
        orderAddress: orderAddress,
        orderName: orderName,
        orderLicense: orderLicense,
        orderNumber: orderNumber,
        orderDate: orderDate,
        isPaid: isPaid,
        isDelivered: isDelivered,
      });
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

      for (const alcoholOrder of alcoholOrders) {
        const alcoholRef = doc(docRef, "alcohol", alcoholOrder.label);
        await setDoc(alcoholRef, {
        label: alcoholOrder.label,
        quantity: alcoholOrder.quantity,
      });
    }

      // Show success alert
      alert("Order saved successfully!");

      // Return to the home page
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Home' },
            { name: 'Input Order' },
          ],
        })
      );
    }
    } catch (error) {
        console.error("Error adding document:", error);
    }
    };

  const resetOrder = () => {
    setOrderAddress('');
    setOrderName('');
    setOrderLicense('');
    setOrderNumber('');
    setOrderDate('');
    setIsPaid(false);
    setIsDelivered(false);
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
    <Field label="Birdie Juice" onChangeText={(text) => setBirdieJuiceQuantity(parseInt(text) || 0)} isNumberInput/>
    <Field label="Baby-X-Vodka" onChangeText={(text) => setBabyXVodkaQuantity(parseInt(text) || 0)} isNumberInput/>
    <Field label="Lady Sophia" onChangeText={(text) => setLadySophiaQuantity(parseInt(text) || 0)} isNumberInput/>
    <Field label="SugarLips Vodka" onChangeText={(text) => setSugarLipsVodkaQuantity(parseInt(text) || 0)} isNumberInput/>
    <Field label="Sir Perwinkle Gin" onChangeText={(text) => setSirPerwinkleGinQuantity(parseInt(text) || 0)} isNumberInput/>
    <Field label="Scoundrel Rumbum" onChangeText={(text) => setScoundrelRumbumQuantity(parseInt(text) || 0)} isNumberInput/>
    <Field label="Thick & Dirty Signature Cream" onChangeText={(text) => setThickDirtySignatureCreamQuantity(parseInt(text) || 0)} isNumberInput/>
    <Field label="Thick & Dirty Root Beer" onChangeText={(text) => setThickDirtyRootBeerQuantity(parseInt(text) || 0)} isNumberInput/>
    <Field label="Thick & Dirty Salted Caramel" onChangeText={(text) => setThickDirtySaltedCaramelQuantity(parseInt(text) || 0)} isNumberInput/>
    <Field label="William London Dry" onChangeText={(text) => setWilliamLondonDryQuantity(parseInt(text) || 0)} isNumberInput/>
    {/* Add other alcohol fields here */}
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
    {/* Add other alcohol fields here /}
    {/ Add more alcohol fields as needed */}
    <View style={styles.rowContainer}>
      <TouchableOpacity style={styles.button} onPress={saveOrder}>
      <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      {!docId && (
      <TouchableOpacity style={styles.button} onPress={resetOrder}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
        )}
    </View>
  </View>
  );
};

const styles = StyleSheet.create({container: {
  flex: 1,
  padding: 20,
  },
  rowContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
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


  
export default OrderInput;