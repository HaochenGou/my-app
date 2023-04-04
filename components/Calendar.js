// CalendarComponent.js
import React, { useState, useEffect } from "react";
import { Agenda } from "react-native-calendars";
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

const CalendarComponent = () => {
  const [items, setItems] = useState({});

  const loadItems = async (day) => {
    const querySnapshot = await db.collection("agenda").get();
    const data = {};
    querySnapshot.forEach((doc) => {
      const item = doc.data();
      data[item.date] = data[item.date] || [];
      data[item.date].push(item);
    });
    setItems(data);
  };

  const saveItem = async (item) => {
    await db.collection("agenda").add(item);
    loadItems();
  };

  const updateItem = async (item) => {
    const docRef = await db.collection("agenda").doc(item.id);
    await docRef.update(item);
    loadItems();
  };

  const deleteItem = async (item) => {
    const docRef = await db.collection("agenda").doc(item.id);
    await docRef.delete();
    loadItems();
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <Agenda
      items={items}
      loadItemsForMonth={loadItems}
      onDayPress={(day) => loadItems(day)}
      renderItem={(item) => <AgendaItem item={item} />}
      renderEmptyDate={() => <EmptyDate />}
      rowHasChanged={(r1, r2) => r1.id !== r2.id}
    />
  );
};

export default CalendarComponent;
