import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { app } from '../firebase/firebase';
import { getFirestore, doc, setDoc, updateDoc, getDocs, collection } from 'firebase/firestore';

const List = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "Inventory"));
      const documents = querySnapshot.docs.map(doc => ({ ...doc.data(), id: Storage }));
      setData(documents);
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
      <Button title="Edit" onPress={() => handleEdit(item.id)} />
    </View>
  );

  const handleEdit = async (id) => {
    const db = getFirestore(app);
    const docRef = doc(db, "Storage", id);
    const newData = { title: "New Title" };
    await updateDoc(docRef, newData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
});

export default List;
