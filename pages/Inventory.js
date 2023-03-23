import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { app } from "../firebase/firebase";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  collection,
} from "firebase/firestore";

const db = getFirestore(app);

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const inventoryRef = collection(db, "Inventory");
      const snapshot = await getDocs(inventoryRef);
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

    fetchData();
  }, []);

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
