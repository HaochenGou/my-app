import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
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
import AlcoholTotalQuantitiesContext from "../components/AlcoholTotalQuantitiesContext";

const db = getFirestore(app);

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState('');
  const alcoholTotalQuantities = useContext(AlcoholTotalQuantitiesContext);

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
      const alcoholEntry = Object.entries(alcoholTotalQuantities).find(
        ([label, quantity]) => label === data.name
      );
      const alcoholQuantity = alcoholEntry ? alcoholEntry[1] : 0;
      const updatedQuantity = data.quantity - alcoholQuantity;
      inventoryItems.push({
        id: doc.id,
        name: data.name,
        quantity: updatedQuantity,
      });
    });
    setInventoryData(inventoryItems);
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      const itemRef = doc(db, "Inventory", id);
      await updateDoc(itemRef, { quantity: Number(newQuantity) });
      fetchData();
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
  }, [user, alcoholTotalQuantities]);

  const openModal = (item) => {
    setCurrentItem(item);
    setEditedQuantity(String(item.quantity));
    setModalVisible(true);
  };

  const handleSave = () => {
    updateQuantity(currentItem.id, editedQuantity);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => openModal(item)}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>Quantity: {item.quantity}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
         <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.centeredView}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Edit Quantity</Text>
            <TextInput
              style={styles.modalQuantityInput}
              keyboardType="numeric"
              value={editedQuantity}
              onChangeText={setEditedQuantity}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <Button title="Save" onPress={handleSave} />
              <Button title="Cancel" onPress={handleCancel} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalQuantityInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 24,
    width: "100%",
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%",
  },
});

export default Inventory;

