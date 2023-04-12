import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import Field from "../components/Field";
import { app } from "../firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { CommonActions } from "@react-navigation/native";
const auth = getAuth(app);
const db = getFirestore(app);
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const OrderInput = ({ navigation, route }) => {
  const [orderAddress, setOrderAddress] = useState("");
  const [orderName, setOrderName] = useState("");
  const [orderLicense, setOrderLicense] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [note, setNote] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  // Add alcohol quantities as state
  const [birdieJuiceQuantity, setBirdieJuiceQuantity] = useState(0);
  const [babyXVodkaQuantity, setBabyXVodkaQuantity] = useState(0);
  const [LadySophiaQuantity, setLadySophiaQuantity] = useState(0);
  const [orangeFloatQuantity, setOrangeFloatQuantity] = useState(0);
  const [SugarLipsVodkaQuantity, setSugarLipsVodkaQuantity] = useState(0);
  const [SirPerwinkleGinQuantity, setSirPerwinkleGinQuantity] = useState(0);
  const [ScoundrelRumbumQuantity, setScoundrelRumbumQuantity] = useState(0);
  const [
    ThickDirtySignatureCreamQuantity,
    setThickDirtySignatureCreamQuantity,
  ] = useState(0);
  const [ThickDirtyRootBeerQuantity, setThickDirtyRootBeerQuantity] =
    useState(0);
  const [ThickDirtySaltedCaramelQuantity, setThickDirtySaltedCaramelQuantity] =
    useState(0);
  const [WilliamLondonDryQuantity, setWilliamLondonDryQuantity] = useState(0);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // Add other alcohols here
  const orderId = route.params?.orderId;

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

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (orderId) {
      fetchDocument(orderId);
    }
  }, [orderId]);

  const sendPushNotification = async (expoPushToken) => {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "New Order!",
      body: "New order has been placed!",
      data: { someData: "goes here" },
    };
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }
  };

  const fetchDocument = async (orderId) => {
    try {
      const docRef = doc(db, "Orders", orderId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setOrderAddress(data.orderAddress);
        setOrderName(data.orderName);
        setOrderLicense(data.orderLicense);
        setOrderNumber(data.orderNumber);
        setOrderDate(data.orderDate);
        setNote(data.note);
        setIsPaid(data.isPaid);
        setIsDelivered(data.isDelivered);
        // Add alcohol quantities as state
        setBirdieJuiceQuantity(data.birdieJuiceQuantity);
        setBabyXVodkaQuantity(data.babyXVodkaQuantity);
        setLadySophiaQuantity(data.LadySophiaQuantity);
        setOrangeFloat(data.orangeFloatQuantity);
        setSugarLipsVodkaQuantity(data.SugarLipsVodkaQuantity);
        setSirPerwinkleGinQuantity(data.SirPerwinkleGinQuantity);
        setScoundrelRumbumQuantity(data.ScoundrelRumbumQuantity);
        setThickDirtySignatureCreamQuantity(
          data.ThickDirtySignatureCreamQuantity
        );
        setThickDirtyRootBeerQuantity(data.ThickDirtyRootBeerQuantity);
        setThickDirtySaltedCaramelQuantity(
          data.ThickDirtySaltedCaramelQuantity
        );
        setWilliamLondonDryQuantity(data.WilliamLondonDryQuantity);
        // Add other alcohols here
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const saveOrder = async () => {
    try {
      if (
        (!orderAddress &&
          !orderName &&
          !orderLicense &&
          !orderNumber &&
          !orderDate) ||
        (orderAddress && orderName && orderLicense && !orderNumber && orderDate)
      ) {
        // Show alert if all required fields are empty
        alert("Please fill all required fields");
        return;
      }

      const ordersRef = collection(db, "Orders");
      if (orderId) {
        const docRef = doc(db, "Orders", orderId);
        await updateDoc(docRef, {
          orderAddress: orderAddress,
          orderName: orderName,
          orderLicense: orderLicense,
          orderNumber: orderNumber,
          orderDate: orderDate,
          note: note,
          isPaid: isPaid,
          isDelivered: isDelivered,
          // Add alcohol quantities as state
        });
        const alcoholOrders = [
          { label: "Birdie Juice", quantity: birdieJuiceQuantity },
          { label: "Baby-X-Vodka", quantity: babyXVodkaQuantity },
          { label: "Lady Sophia", quantity: LadySophiaQuantity },
          { label: "Orange Float", quantity: orangeFloatQuantity },
          { label: "SugarLips Vodka", quantity: SugarLipsVodkaQuantity },
          { label: "Sir Perwinkle Gin", quantity: SirPerwinkleGinQuantity },
          { label: "Scoundrel Rumbum", quantity: ScoundrelRumbumQuantity },
          {
            label: "Thick & Dirty Signature Cream",
            quantity: ThickDirtySignatureCreamQuantity,
          },
          {
            label: "Thick & Dirty Root Beer",
            quantity: ThickDirtyRootBeerQuantity,
          },
          {
            label: "Thick & Dirty Salted Caramel",
            quantity: ThickDirtySaltedCaramelQuantity,
          },
          { label: "William London Dry", quantity: WilliamLondonDryQuantity },
          // Add other alcohols here
        ];
        for (const alcoholOrder of alcoholOrders) {
          const alcoholRef = doc(docRef, "alcohol", alcoholOrder.label);
          await updateDoc(alcoholRef, {
            label: alcoholOrder.label,
            quantity: alcoholOrder.quantity,
          });
        }
      } else {
        const docRef = await addDoc(ordersRef, {
          orderAddress: orderAddress,
          orderName: orderName,
          orderLicense: orderLicense,
          orderNumber: orderNumber,
          orderDate: orderDate,
          note: note,
          isPaid: isPaid,
          isDelivered: isDelivered,
        });
        const alcoholOrders = [
          { label: "Birdie Juice", quantity: birdieJuiceQuantity },
          { label: "Baby-X-Vodka", quantity: babyXVodkaQuantity },
          { label: "Lady Sophia", quantity: LadySophiaQuantity },
          { label: "Orange Float", quantity: orangeFloatQuantity },
          { label: "SugarLips Vodka", quantity: SugarLipsVodkaQuantity },
          { label: "Sir Perwinkle Gin", quantity: SirPerwinkleGinQuantity },
          { label: "Scoundrel Rumbum", quantity: ScoundrelRumbumQuantity },
          {
            label: "Thick & Dirty Signature Cream",
            quantity: ThickDirtySignatureCreamQuantity,
          },
          {
            label: "Thick & Dirty Root Beer",
            quantity: ThickDirtyRootBeerQuantity,
          },
          {
            label: "Thick & Dirty Salted Caramel",
            quantity: ThickDirtySaltedCaramelQuantity,
          },
          { label: "William London Dry", quantity: WilliamLondonDryQuantity },
          // Add other alcohols here
        ];

        for (const alcoholOrder of alcoholOrders) {
          const alcoholRef = doc(docRef, "alcohol", alcoholOrder.label);
          await setDoc(alcoholRef, {
            label: alcoholOrder.label,
            quantity: alcoholOrder.quantity,
          });
        }

        // Show success alert
        alert("Order saved successfully!");
        sendPushNotification(expoPushToken);

        // Return to the home page
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: "Hawke Prohibition Distilleries" },
              { name: "Input Order" },
            ],
          })
        );
      }
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const resetOrder = () => {
    setOrderAddress("");
    setOrderName("");
    setOrderLicense("");
    setOrderNumber("");
    setOrderDate("");
    setNote("");
    setIsPaid(false);
    setIsDelivered(false);
    setBirdieJuiceQuantity(0);
    setBabyXVodkaQuantity(0);
    setOrangeFloatQuantity(0);
    setLadySophiaQuantity(0);
    setSugarLipsVodkaQuantity(0);
    setSirPerwinkleGinQuantity(0);
    setScoundrelRumbumQuantity(0);
    setThickDirtySignatureCreamQuantity(0);
    setThickDirtyRootBeerQuantity(0);
    setThickDirtySaltedCaramelQuantity(0);
    setWilliamLondonDryQuantity(0);
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: "Hawke Prohibition Distilleries" },
          { name: "Input Order" },
        ],
      })
    );
  };
  signIn("haochen@hawkepro.com", "hawkeprohibition");

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView>
        <View style={styles.container}>
          <Field label="Order Address" onChangeText={setOrderAddress} />
          <Field label="Order Name" onChangeText={setOrderName} />
          <Field label="License Number" onChangeText={setOrderLicense} />
          <Field label="Invoice Number*" onChangeText={setOrderNumber} />
          <Field label="Order Date" onChangeText={setOrderDate} />
          <Field
            label="Birdie Juice"
            onChangeText={(text) => setBirdieJuiceQuantity(parseInt(text) || 0)}
            isNumberInput
          />
          <Field
            label="Baby-X-Vodka"
            onChangeText={(text) => setBabyXVodkaQuantity(parseInt(text) || 0)}
            isNumberInput
          />
          <Field
            label="Lady Sophia"
            onChangeText={(text) => setLadySophiaQuantity(parseInt(text) || 0)}
            isNumberInput
          />
          <Field
            label="SugarLips Vodka"
            onChangeText={(text) =>
              setSugarLipsVodkaQuantity(parseInt(text) || 0)
            }
            isNumberInput
          />
          <Field
            label="Sir Perwinkle Gin"
            onChangeText={(text) =>
              setSirPerwinkleGinQuantity(parseInt(text) || 0)
            }
            isNumberInput
          />
          <Field
            label="Scoundrel Rumbum"
            onChangeText={(text) =>
              setScoundrelRumbumQuantity(parseInt(text) || 0)
            }
            isNumberInput
          />
          <Field
            label="Thick & Dirty Orange Float"
            onChangeText={(text) => setOrangeFloatQuantity(parseInt(text) || 0)}
            isNumberInput
          />
          <Field
            label="Thick & Dirty Signature Cream"
            onChangeText={(text) =>
              setThickDirtySignatureCreamQuantity(parseInt(text) || 0)
            }
            isNumberInput
          />
          <Field
            label="Thick & Dirty Root Beer"
            onChangeText={(text) =>
              setThickDirtyRootBeerQuantity(parseInt(text) || 0)
            }
            isNumberInput
          />
          <Field
            label="Thick & Dirty Salted Caramel"
            onChangeText={(text) =>
              setThickDirtySaltedCaramelQuantity(parseInt(text) || 0)
            }
            isNumberInput
          />
          <Field
            label="William London Dry"
            onChangeText={(text) =>
              setWilliamLondonDryQuantity(parseInt(text) || 0)
            }
            isNumberInput
          />
          <Field label="Note" onChangeText={setNote} />
          {/* Add other alcohol fields here */}
          <View style={styles.rowContainer}>
            <View style={styles.checkBoxContainer}>
              <TouchableOpacity
                onPress={() => setIsPaid(!isPaid)}
                style={[styles.checkBox, isPaid && styles.checkedBox]}
              >
                {isPaid && <Text style={styles.checkBoxText}>✓</Text>}
              </TouchableOpacity>
              <Text style={styles.checkBoxLabel}>Is Paid</Text>
            </View>
            <View style={styles.checkBoxContainer}>
              <TouchableOpacity
                onPress={() => setIsDelivered(!isDelivered)}
                style={[styles.checkBox, isDelivered && styles.checkedBox]}
              >
                {isDelivered && <Text style={styles.checkBoxText}>✓</Text>}
              </TouchableOpacity>
              <Text style={styles.checkBoxLabel}>Is Delivered</Text>
            </View>
          </View>
          {/* Add other alcohol fields here /}
          {/ Add more alcohol fields as needed */}
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.button} onPress={saveOrder}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            {!orderId && (
              <TouchableOpacity style={styles.button} onPress={resetOrder}>
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
});

export default OrderInput;
