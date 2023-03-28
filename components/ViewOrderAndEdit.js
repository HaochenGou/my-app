import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../firebase/firebase";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);
const db = getFirestore(app);


const ViewOrderAndEdit = ({ direction }) => {
  const [unpaidOrders, setUnpaidOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [alcoholItems, setAlcoholItems] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const navigation = useNavigation();


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

  const fetchUnpaidOrders = async () => {
    try {
      let q;
      if (direction == "Unpaid") {
        q = query(
          collection(db, "Orders"),
          where("isPaid", "==", false),
          where("isDelivered", "==", false)
        );
      } else if (direction == "Paid") {
        q = query(
          collection(db, "Orders"),
          where("isPaid", "==", true),
          where("isDelivered", "==", false)
        );
      } else if (direction == "Delivered") {
        q = query(
          collection(db, "Orders"),
          where("isPaid", "==", true),
          where("isDelivered", "==", true)
        );
      }
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ ...doc.data(), id: doc.id });
      });
      setUnpaidOrders(orders);
    } catch (error) {
      console.error("Error fetching unpaid orders:", error);
    }
  };
  const updatePaidStatus = (value) => {
    setSelectedOrder({ ...selectedOrder, isPaid: value });
  };

  const updateDeliveredStatus = (value) => {
    setSelectedOrder({ ...selectedOrder, isDelivered: value });
  };

  const saveOrder = async () => {
    try {
      const orderRef = doc(db, "Orders", selectedOrder.id);
      await updateDoc(orderRef, {
        isPaid: selectedOrder.isPaid,
        isDelivered: selectedOrder.isDelivered,
      });
      alert("Order updated successfully!");
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const showDialog = () => {
    setDialogVisible(true);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleConfirm = async () => {
    try {
      // Delete the order from the database
      const orderRef = doc(db, "Orders", selectedOrder.id);
      await deleteDoc(orderRef);

      // Close the dialog
      setDialogVisible(false);

      // Close the modal
      setSelectedOrder(null);

      // Refresh the orders list
      fetchUnpaidOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleEditOrder = (orderId) => {
    navigation.navigate("Input Order", { orderId });
  };

  const fetchAlcoholItems = async (orderId) => {
    try {
      const alcoholRef = collection(db, "Orders", orderId, "alcohol");
      const querySnapshot = await getDocs(alcoholRef);
      const items = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().quantity > 0) {
          items.push({ ...doc.data(), id: doc.id });
        }
      });
      setAlcoholItems(items);
    } catch (error) {
      console.error("Error fetching alcohol items:", error);
    }
  };

  useEffect(() => {
    fetchUnpaidOrders();
  }, [selectedOrder]);

  signIn("haochen@hawkepro.com", "hawkeprohibition");

  const handleShowOrderDetails = async (order) => {
    setSelectedOrder(order);
    await fetchAlcoholItems(order.id);
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <FlatList
          data={unpaidOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.orderContainer}
              onPress={() => handleShowOrderDetails(item)}
            >
              <Text style={styles.orderText}>
                {item.orderName} {item.orderDate}
              </Text>
            </TouchableOpacity>
          )}
        />

        <Modal visible={!!selectedOrder} animationType="slide">
          <SafeAreaView style={styles.modalSafeArea}>
            <ScrollView>
              <View style={styles.modalContent}>
                {selectedOrder && (
                  <>
                    <Text style={styles.label}>Order Address:</Text>
                    <Text style={styles.value}>
                      {selectedOrder.orderAddress}
                    </Text>
                    <Text style={styles.label}>Order Name:</Text>
                    <Text style={styles.value}>{selectedOrder.orderName}</Text>
                    <Text style={styles.label}>Order Number:</Text>
                    <Text style={styles.value}>
                      {selectedOrder.orderNumber}
                    </Text>
                    <Text style={styles.label}>Order Date:</Text>
                    <Text style={styles.value}>{selectedOrder.orderDate}</Text>
                    <Text style={styles.label}>Order License:</Text>
                    <Text style={styles.value}>
                      {selectedOrder.orderLicense}
                    </Text>
                    <Text style={styles.label}>Alcohol Order:</Text>
                    <View>
                      {alcoholItems.map((item) => (
                        <Text key={item.id} style={styles.alcoholItem}>
                          {item.label}: {item.quantity}
                        </Text>
                      ))}
                    </View>
                    <Modal
                      visible={dialogVisible}
                      onRequestClose={handleCancel}
                      animationType="slide"
                    >
                      <SafeAreaView style={styles.modalContent}>
                        <Text style={styles.dialogTitle}>Are you sure?</Text>
                        <Text style={styles.dialogText}>
                          Do you want to delete this order?
                        </Text>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={handleConfirm}
                        >
                          <Text style={styles.deleteButtonText}>YES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={handleCancel}
                        >
                          <Text style={styles.deleteButtonText}>NO</Text>
                        </TouchableOpacity>
                      </SafeAreaView>
                    </Modal>
                    <View style={styles.rowContainer}>
                      <View style={styles.checkBoxContainer}>
                        <TouchableOpacity
                          onPress={() =>
                            updatePaidStatus(!selectedOrder.isPaid)
                          }
                          style={[
                            styles.checkBox,
                            selectedOrder.isPaid && styles.checkedBox,
                          ]}
                        >
                          {selectedOrder.isPaid && (
                            <Text style={styles.checkBoxText}>✓</Text>
                          )}
                        </TouchableOpacity>
                        <Text style={styles.checkBoxLabel}>Is Paid</Text>
                      </View>
                      <View style={styles.checkBoxContainer}>
                        <TouchableOpacity
                          onPress={() =>
                            updateDeliveredStatus(!selectedOrder.isDelivered)
                          }
                          style={[
                            styles.checkBox,
                            selectedOrder.isDelivered && styles.checkedBox,
                          ]}
                        >
                          {selectedOrder.isDelivered && (
                            <Text style={styles.checkBoxText}>✓</Text>
                          )}
                        </TouchableOpacity>
                        <Text style={styles.checkBoxLabel}>Is Delivered</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={showDialog}
                    >
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEditOrder(item.id)}
                    >
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={saveOrder}>
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => setSelectedOrder(null)}
                    >
                      <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  modalSafeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  orderContainer: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  dialogTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  dialogText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  orderText: {
    fontSize: 18,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: "black",
  },
  checkBoxText: {
    color: "white",
  },
  checkBoxLabel: {
    fontSize: 16,
  },
  label: {
    fontWeight: "bold",
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
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ViewOrderAndEdit;
