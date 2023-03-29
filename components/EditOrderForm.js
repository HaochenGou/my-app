import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { app } from "../firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Field from "./Field";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User signed in:", user);
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

signIn("haochen@hawkepro.com", "hawkeprohibition");

const EditOrderForm = ({ selectedOrder, setSelectedOrder, onSave }) => {
  const [birdieJuiceQuantity, setBirdieJuiceQuantity] = useState(0);
  const [babyXVodkaQuantity, setBabyXVodkaQuantity] = useState(0);
  const [LadySophiaQuantity, setLadySophiaQuantity] = useState(0);
  const [orangeFloatQuantity, setOrangeFloatQuantity] = useState(0);
  const [SugarLipsVodkaQuantity, setSugarLipsVodkaQuantity] = useState(0);
  const [SirPerwinkleGinQuantity, setSirPerwinkleGinQuantity] = useState(0);
  const [ScoundrelRumbumQuantity, setScoundrelRumbumQuantity] = useState(0);
  const [
    ThickDirtySignatureCreamQuantity,
    setThickDirtySignatureCreamQuantity,
  ] = useState(0);
  const [ThickDirtyRootBeerQuantity, setThickDirtyRootBeerQuantity] =
    useState(0);
  const [ThickDirtySaltedCaramelQuantity, setThickDirtySaltedCaramelQuantity] =
    useState(0);
  const [WilliamLondonDryQuantity, setWilliamLondonDryQuantity] = useState(0);
  const handleChange = (key, value) => {
    setSelectedOrder({ ...selectedOrder, [key]: value });
    saveOrder(selectedOrder);
  };

  const saveOrder = async (order) => {
    try {
      const orderRef = doc(db, "Orders", order.id);
      await updateDoc(orderRef, {
        orderAddress: order.orderAddress,
        orderName: order.orderName,
        orderNumber: order.orderNumber,
        orderDate: order.orderDate,
        orderLicense: order.orderLicense,
      });
      const alcoholOrders = [
        { label: "Birdie Juice", quantity: birdieJuiceQuantity },
        { label: "Baby-X-Vodka", quantity: babyXVodkaQuantity },
        { label: "Lady Sophia", quantity: LadySophiaQuantity },
        { label: "Orange Float", quantity: orangeFloatQuantity },
        { label: "SugarLips Vodka", quantity: SugarLipsVodkaQuantity },
        { label: "Sir Perwinkle Gin", quantity: SirPerwinkleGinQuantity },
        { label: "Scoundrel Rumbum", quantity: ScoundrelRumbumQuantity },
        {
          label: "Thick & Dirty Signature Cream",
          quantity: ThickDirtySignatureCreamQuantity,
        },
        {
          label: "Thick & Dirty Root Beer",
          quantity: ThickDirtyRootBeerQuantity,
        },
        {
          label: "Thick & Dirty Salted Caramel",
          quantity: ThickDirtySaltedCaramelQuantity,
        },
        { label: "William London Dry", quantity: WilliamLondonDryQuantity },
        // Add other alcohols here
      ];
      for (const alcoholOrder of alcoholOrders) {
        const alcoholRef = doc(docRef, "alcohol", alcoholOrder.label);
        await updateDoc(alcoholRef, {
          label: alcoholOrder.label,
          quantity: alcoholOrder.quantity,
        });
      }
      console.log("Order updated successfully");
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleSavePress = () => {
    saveOrder(selectedOrder);
    onSave();
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
      <Field
        label="Birdie Juice"
        onChangeText={(text) => setBirdieJuiceQuantity(parseInt(text) || 0)}
        isNumberInput
      />
      <Field
        label="Baby-X-Vodka"
        onChangeText={(text) => setBabyXVodkaQuantity(parseInt(text) || 0)}
        isNumberInput
      />
      <Field
        label="Lady Sophia"
        onChangeText={(text) => setLadySophiaQuantity(parseInt(text) || 0)}
        isNumberInput
      />
      <Field
        label="Orange Float"
        onChangeText={(text) => setOrangeFloatQuantity(parseInt(text) || 0)}
        isNumberInput
      />

      <Field
        label="SugarLips Vodka"
        onChangeText={(text) => setSugarLipsVodkaQuantity(parseInt(text) || 0)}
        isNumberInput
      />
      <Field
        label="Sir Perwinkle Gin"
        onChangeText={(text) => setSirPerwinkleGinQuantity(parseInt(text) || 0)}
        isNumberInput
      />
      <Field
        label="Scoundrel Rumbum"
        onChangeText={(text) => setScoundrelRumbumQuantity(parseInt(text) || 0)}
        isNumberInput
      />
      <Field
        label="Thick & Dirty Signature Cream"
        onChangeText={(text) =>
          setThickDirtySignatureCreamQuantity(parseInt(text) || 0)
        }
        isNumberInput
      />
      <Field
        label="Thick & Dirty Root Beer"
        onChangeText={(text) =>
          setThickDirtyRootBeerQuantity(parseInt(text) || 0)
        }
        isNumberInput
      />
      <Field
        label="Thick & Dirty Salted Caramel"
        onChangeText={(text) =>
          setThickDirtySaltedCaramelQuantity(parseInt(text) || 0)
        }
        isNumberInput
      />
      <Field
        label="William London Dry"
        onChangeText={(text) =>
          setWilliamLondonDryQuantity(parseInt(text) || 0)
        }
        isNumberInput
      />
      <TouchableOpacity style={styles.button} onPress={handleSavePress}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

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
  button: {
    backgroundColor: "#f4511e",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EditOrderForm;
