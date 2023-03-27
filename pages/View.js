import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { app } from '../firebase/firebase';
import {
    getAuth,
    signInWithEmailAndPassword,
  } from "firebase/auth";
import Field from '../components/Field';


const auth = getAuth(app);
const db = getFirestore(app);

const ViewPage = () => {
  const [unpaidOrders, setUnpaidOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  useEffect(() => {
    fetchUnpaidOrders();
  }, []);

  signIn("haochen@hawkepro.com", "hawkeprohibition");

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleSaveOrder = async () => {
    try {
      const orderRef = doc(db, 'Orders', selectedOrder.id);
      await updateDoc(orderRef, {
        orderAddress: selectedOrder.orderAddress,
        orderName: selectedOrder.orderName,
        orderLicense: selectedOrder.orderLicense,
        // Add other order fields here
      });
      setSelectedOrder(null);
      fetchUnpaidOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={unpaidOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity
            style={styles.orderContainer}
            onPress={() => handleEditOrder(item)}
            >
            <Text style={styles.orderText}>{item.orderName}</Text>
            </TouchableOpacity>
    )}
/>


      <Modal visible={!!selectedOrder} animationType="slide">
        <View style={styles.modalContent}>
          {selectedOrder && (
            <>
              <Field
                label="Order Address"
                value={selectedOrder.orderAddress}
                onChangeText={(text) =>
                  setSelectedOrder({ ...selectedOrder, orderAddress: text })
                }
              />
              <Field
                label="Order Name"
                value={selectedOrder.orderName}
                onChangeText={(text) =>
                  setSelectedOrder({ ...selectedOrder, orderName: text })
                }
              />
              <Field
                label="Order License"
                value={selectedOrder.orderLicense}
                onChangeText={(text) =>
                  setSelectedOrder({ ...selectedOrder, orderLicense: text })
                }
              />
              {/* Add other order fields here */}
              <View style={styles.rowContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSaveOrder}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setSelectedOrder(null)}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                </View>
            </>
            )}
        </View>
        </Modal>
    </View>
    );

};

    const styles = StyleSheet.create({
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
        container: {
          flex: 1,
          padding: 20,
        },
        modalContent: {
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
    });
    
    export default ViewPage;
    


