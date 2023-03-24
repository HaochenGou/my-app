import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { app } from "../firebase/firebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [user, setUser] = useState(null);


  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);
      console.log("User signed in:", user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  

 
  const fetchData = async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    signIn("haochen@hawkepro.com","68003725gk");
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>Quantity: {item.quantity}</Text>
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
});

export default Inventory;
