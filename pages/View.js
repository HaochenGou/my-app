import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase/firebase';
import {
    getAuth,
    signInWithEmailAndPassword,
  } from "firebase/auth";

const auth = getAuth(app);
const db = getFirestore(app);

const ViewPage = () => {
  const [unpaidOrders, setUnpaidOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [alcoholItems, setAlcoholItems] = useState([]);

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed in:", user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const fetchUnpaidOrders = async () => {
    try {
        const q = query(collection(db, 'Orders'), where('isPaid', '==', false));
        const querySnapshot = await getDocs(q);
        const orders = [];
        querySnapshot.forEach((doc) => {
        orders.push({ ...doc.data(), id: doc.id });
      });
      setUnpaidOrders(orders);
    } catch (error) {
      console.error('Error fetching unpaid orders:', error);
    }
  };

  const fetchAlcoholItems = async (orderId) => {
    try {
      const alcoholRef = collection(db, 'Orders', orderId, 'alcohol');
      const querySnapshot = await getDocs(alcoholRef);
      const items = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().quantity > 0) {
          items.push({ ...doc.data(), id: doc.id });
        }
      });
      setAlcoholItems(items);
    } catch (error) {
      console.error('Error fetching alcohol items:', error);
    }
  };

  useEffect(() => {
    fetchUnpaidOrders();
  }, []);

  signIn("haochen@hawkepro.com", "hawkeprohibition");

  const handleShowOrderDetails = async (order) => {
    setSelectedOrder(order);
    await fetchAlcoholItems(order.id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={unpaidOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderContainer}
            onPress={() => handleShowOrderDetails(item)}
          >
            <Text style={styles.orderText}>{item.orderName} {item.orderDate}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!selectedOrder} animationType="slide">
        <View style={styles.modalContent}>
          {selectedOrder && (
            <>
              <Text style={styles.label}>Order Address:</Text>
              <Text style={styles.value}>{selectedOrder.orderAddress}</Text>
              <Text style={styles.label}>Order Name:</Text>
              <Text style={styles.value}>{selectedOrder.orderName}</Text>
              <Text style={styles.label}>Order Number:</Text>
              <Text style={styles.value}>{selectedOrder.orderNumber}</Text>
              <Text style={styles.label}>Order Date:</Text>
              <Text style={styles.value}>{selectedOrder.orderDate}</Text>
              <Text style={styles.label}>Order License:</Text>
              <Text style={styles.value}>{selectedOrder.orderLicense}</Text>
              <Text style={styles.label}>Alcohol Order:</Text>
              <View>
                {alcoholItems.map((item) => (
                  <Text key={item.id} style={styles.alcoholItem}>
                  {item.label}: {item.quantity}
                  </Text>
                  ))}
                  </View>
                  <TouchableOpacity
                  style={styles.button}
                  onPress={() => setSelectedOrder(null)}
                  >
                  <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                  </>
                  )}
                  </View>
                  </Modal>
                  </View>
                  );
                  };
                  
                  const styles = StyleSheet.create({
                  container: {
                  flex: 1,
                  padding: 20,
                  },
                  orderContainer: {
                  backgroundColor: '#f5f5f5',
                  padding: 15,
                  borderRadius: 5,
                  marginBottom: 10,
                  borderColor: '#ddd',
                  borderWidth: 1,
                  },
                  orderText: {
                  fontSize: 18,
                  },
                  modalContent: {
                  flex: 1,
                  padding: 20,
                  },
                  label: {
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginTop: 10,
                  },
                  value: {
                  fontSize: 16,
                  marginBottom: 5,
                  },
                  alcoholItem: {
                  fontSize: 16,
                  marginBottom: 5,
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
                  
                  export default ViewPage;
