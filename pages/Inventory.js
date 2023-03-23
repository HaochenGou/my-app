import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { app } from '../firebase/firebase';
import { getFirestore, doc, setDoc, updateDoc, getDocs, collection } from 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const inventoryRef = firestore().collection('inventory');
      const snapshot = await inventoryRef.get();
      let inventoryItems = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        inventoryItems.push({
          id: doc.id,
          alcoholName: data.alcoholName,
          alcoholType: data.alcoholType,
          alcoholQuantity: data.alcoholQuantity,
        });
      });
      setInventoryData(inventoryItems);
    };

    fetchData();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.alcoholName}</Text>
      <Text>Type: {item.alcoholType}</Text>
      <Text>Quantity: {item.alcoholQuantity}</Text>
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
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Inventory;

 