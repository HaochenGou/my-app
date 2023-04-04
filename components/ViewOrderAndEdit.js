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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);
const db = getFirestore(app);
const initialAlcoholTotalQuantities = {
  "Birdie Juice": 0,
  "Baby-X-Vodka": 0,
  "Orange Float": 0,
  "Lady Sophia": 0,
  "SugarLips Vodka": 0,
  "Sir Perwinkle Gin": 0,
  "Scoundrel Rumbum": 0,
  "Thick & Dirty Signature Cream": 0,
  "Thick & Dirty Root Beer": 0,
  "Thick & Dirty Salted Caramel": 0,
  "William London Dry": 0,
};

const ViewOrderAndEdit = ({ direction }) => {
  const [unpaidOrders, setUnpaidOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [alcoholItems, setAlcoholItems] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [alcoholTotalQuantities, setAlcoholTotalQuantities] = useState(
    initialAlcoholTotalQuantities
  );

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
      for (const doc of querySnapshot.docs) {
        const alcoholSnapshot = await getDocs(collection(doc.ref, "alcohol"));
        const alcoholItems = alcoholSnapshot.docs.map((alcoholDoc) => ({
          ...alcoholDoc.data(),
          id: alcoholDoc.id,
        }));
        orders.push({ ...doc.data(), id: doc.id, alcoholItems });
      }
      setUnpaidOrders(orders);
      sumAlcoholQuantities(orders);
    } catch (error) {
      console.error("Error fetching unpaid orders:", error);
    }
  };

  const sumAlcoholQuantities = (unpaidOrders) => {
    const alcoholLabels = [
      "Birdie Juice",
      "Baby-X-Vodka",
      "Lady Sophia",
      "Orange Float",
      "SugarLips Vodka",
      "Sir Perwinkle Gin",
      "Scoundrel Rumbum",
      "Thick & Dirty Signature Cream",
      "Thick & Dirty Root Beer",
      "Thick & Dirty Salted Caramel",
      "William London Dry",
    ];
    const totalQuantities = alcoholLabels.reduce((acc, label) => {
      acc[label] = 0;
      return acc;
    }, {});

    unpaidOrders.forEach((order) => {
      order.alcoholItems.forEach((item) => {
        if (totalQuantities[item.label] !== undefined) {
          totalQuantities[item.label] += item.quantity;
        }
      });
    });
    setAlcoholTotalQuantities(totalQuantities);
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
  }, []);

  signIn("haochen@hawkepro.com", "hawkeprohibition");

  const handleShowOrderDetails = async (order) => {
    setSelectedOrder(order);
    await fetchAlcoholItems(order.id);
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        {direction == "Unpaid" && (
          <Text style={styles.headerText}>Total Unpaid Alcohol Quantities</Text>
        )}
        {direction == "Paid" && (
          <Text style={styles.headerText}>
            Total Not Delivered Alcohol Quantities
          </Text>
        )}
        {direction == "Delivered" && (
          <Text style={styles.headerText}>
            Total Delivered Alcohol Quantities
          </Text>
        )}
        {Object.entries(alcoholTotalQuantities).map(([label, quantity]) => (
          <View style={styles.alcoholQuantityContainer} key={label}>
            <Text style={styles.alcoholLabel}>{label}:</Text>
            <Text style={styles.alcoholQuantity}>{quantity}</Text>
          </View>
        ))}
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
                    <Text style={styles.label}>Invoice Number:</Text>
                    <Text style={styles.value}>
                      {selectedOrder.orderNumber}
                    </Text>
                    <Text style={styles.label}>Order Date:</Text>
                    <Text style={styles.value}>{selectedOrder.orderDate}</Text>
                    <Text style={styles.label}>License Number:</Text>
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
    padding: 10,
  },
  orderContainer: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
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
    padding: 10,
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
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  alcoholQuantityContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  alcoholLabel: {
    fontWeight: "bold",
  },
  alcoholQuantity: {
    marginLeft: 5,
  },
});

export default ViewOrderAndEdit;
