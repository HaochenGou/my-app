import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import { app } from "../firebase/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);
    
  };

  const fetchData = async () => {
      const inventoryRef = collection(db, "Inventory");
      const snapshot = await getDocs(inventoryRef);

      if (snapshot.empty) {
        return;
      }
      let inventoryItems = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        inventoryItems.push({
          id: doc.id,
          name: data.name,
          quantity: data.quantity,
        });
      });
      setInventoryData(inventoryItems);
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      const itemRef = doc(db, "Inventory", id);
      await updateDoc(itemRef, { quantity: Number(newQuantity) });
    } catch (error) {
      console.error("Error updating quantity: ", error);
    }
  };

  useEffect(() => {
    signIn("haochen@hawkepro.com", "hawkeprohibition");
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <TextInput
        style={styles.quantityInput}
        keyboardType="numeric"
        value={String(item.quantity)}
        onChangeText={(text) => {
          updateQuantity(item.id, text);
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={inventoryData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  item: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginBottom: 15,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default Inventory;
