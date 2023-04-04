import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView, Image} from "react-native";
import InputPage from "./pages/Input";
import Inventory from "./pages/Inventory";
import ViewPage from "./pages/View";
import PaidPage from "./pages/Paid";
import DeliveryPage from "./pages/Delivery";
import logo from "./assets/logo.png";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Button from "./components/Button";

function HomeScreen() {
  return (
    <View style={styles.container}>
       <View style={styles.headerContainer}>
        <Image source={logo} style={{ width: 300, height: 100 }} resizeMode="contain" />
      </View>
      <ScrollView contentContainerStyle={styles.footerContainer}>
        <Button theme="input" label="Add New Order" direction="Input Order" />
        <Button
          theme="inventory"
          label="View/Edit Inventory"
          direction="Inventory"
        />
        <Button
          theme="view"
          label="View/Edit Unpaid Order"
          direction="View Order"
        />
        <Button
          theme="paid"
          label="View/Edit Paid Order"
          direction="Paid Order"
        />
        <Button theme="delivered" label="History" direction="Delivered Order" />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Hawke Prohibition Distilleries"
          component={HomeScreen}
        />
        <Stack.Screen name="Input Order" component={InputPage} />
        <Stack.Screen name="Inventory" component={Inventory} />
        <Stack.Screen name="View Order" component={ViewPage} />
        <Stack.Screen name="Paid Order" component={PaidPage} />
        <Stack.Screen name="Delivered Order" component={DeliveryPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",// Distribute the header and footer evenly
  },
  headerContainer: {
    marginTop: 5, // Adjust this value to change the distance from the top
    alignItems: "center",
  },
  footerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
