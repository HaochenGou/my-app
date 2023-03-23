import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { app } from "../firebase/firebase";
import {
  getAuth,
  onAuthStateChanged,
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      const inventoryRef = collection(db, "Inventory");
      const snapshot = await getDocs(inventoryRef);
      if (snapshot.empty) {
        console.log("No matching documents found.");
        return;
      }
      let inventoryItems = [];
      snapshot.forEach((doc) => {
        console.log("Fetched data: ", doc.data());
        const data = doc.data();
        inventoryItems.push({
          id: doc.id,
          name: doc.id,
          quantity: data.quantity,
        });
      });
      console.log("Fetched inventory items: ", inventoryItems); // Add this line
      setInventoryData(inventoryItems);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>Quantity: {item.quantity}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

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
