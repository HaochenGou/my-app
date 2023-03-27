import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Field from '../components/Field';
import { app } from "../firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { CommonActions } from '@react-navigation/native';

const auth = getAuth(app);
const db = getFirestore(app);

const EditOrderPage = ({ navigation, route }) => {
  const { order } = route.params;

  // Add other states as in InputPage component
  // ...

  // Function to fetch the order data
  const fetchOrderData = async () => {
    const orderRef = doc(db, 'Orders', order.id);
    const orderSnap = await getDoc(orderRef);

    if (orderSnap.exists()) {
      const orderData = orderSnap.data();
        // Set the states with the fetched order data
  setOrderAddress(orderData.orderAddress || '');
  setOrderName(orderData.orderName || '');
  setOrderLicense(orderData.orderLicense || '');
  setOrderNumber(orderData.orderNumber || '');
  setOrderDate(orderData.orderDate || '');
  setIsPaid(orderData.isPaid || false);
  setIsDelivered(orderData.isDelivered || false);

  // Fetch alcohol order data and set the states
  const alcoholOrders = await Promise.all(
    order.alcohol.map(async (alcohol) => {
      const alcoholRef = doc(orderRef, 'alcohol', alcohol.label);
      const alcoholSnap = await getDoc(alcoholRef);

      if (alcoholSnap.exists()) {
        const alcoholData = alcoholSnap.data();
        return {
          label: alcoholData.label,
          quantity: alcoholData.quantity,
        };
      } else {
        return {
          label: alcohol.label,
          quantity: 0,
        };
      }
    })
  );

  // Set alcohol order states based on fetched data
  for (const alcoholOrder of alcoholOrders) {
    switch (alcoholOrder.label) {
      case 'Birdie Juice':
        setBirdieJuiceQuantity(alcoholOrder.quantity);
        break;
      case 'Baby-X-Vodka':
        setBabyXVodkaQuantity(alcoholOrder.quantity);
        break;
      // Add other alcohol orders here
      case 'Lady Sophia':
        setLadySophiaQuantity(alcoholOrder.quantity);
        break;
      case 'SugarLips Vodka':
        setSugarLipsVodkaQuantity(alcoholOrder.quantity);
        break;
      case 'Sir Perwinkle Gin':
        setSirPerwinkleGinQuantity(alcoholOrder.quantity);
        break;
      case 'Scoundrel Rumbum':
        setScoundrelRumbumQuantity(alcoholOrder.quantity);
        break;
      case 'Thick & Dirty Signature Cream':
        setThickDirtySignatureCreamQuantity(alcoholOrder.quantity);
        break;
      case 'Thick & Dirty Root Beer':
        setThickDirtyRootBeerQuantity(alcoholOrder.quantity);
        break;
      case 'Thick & Dirty Salted Caramel':
        setThickDirtySaltedCaramelQuantity(alcoholOrder.quantity);
        break;
      case 'William London Dry':
        setWilliamLondonDryQuantity(alcoholOrder.quantity);
        break;
      // Add other alcohol orders as needed
      // ...
    }
  }
}};

useEffect(() => {
fetchOrderData();
}, []);

const updateOrder = async () => {
try {
const orderRef = doc(db, 'Orders', order.id);
await updateDoc(orderRef, {
    orderAddress: orderAddress,
    orderName: orderName,
    orderLicense: orderLicense,
    orderNumber: orderNumber,
    orderDate: orderDate,
    isPaid: isPaid,
    isDelivered: isDelivered,
    alcohol: [
        {
            label: 'Birdie Juice',
            quantity: birdieJuiceQuantity,
        },
        {
            label: 'Baby-X-Vodka',
            quantity: babyXVodkaQuantity,
        },
        // Add other alcohol orders here
        {
            label: 'Lady Sophia',
            quantity: ladySophiaQuantity,
        },
        {
            label: 'SugarLips Vodka',
            quantity: sugarLipsVodkaQuantity,
        },
        {
            label: 'Sir Perwinkle Gin',
            quantity: sirPerwinkleGinQuantity,
        },
        {
            label: 'Scoundrel Rumbum',
            quantity: scoundrelRumbumQuantity,
        },
        {
            label: 'Thick & Dirty Signature Cream',
            quantity: thickDirtySignatureCreamQuantity,
        },
        {
            label: 'Thick & Dirty Root Beer',
            quantity: thickDirtyRootBeerQuantity,
        },
        {
            label: 'Thick & Dirty Salted Caramel',
            quantity: thickDirtySaltedCaramelQuantity,
        },
        {
            label: 'William London Dry',
            quantity: williamLondonDryQuantity,
        },


      // ...
   

