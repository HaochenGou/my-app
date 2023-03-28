import React from "react";
import { StyleSheet, View } from "react-native";
import ViewOrderAndEdit from "../components/ViewOrderAndEdit";

const DeliveryPage = () => {
  return (
    <View style={styles.container}>
      <ViewOrderAndEdit direction="Delivered" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
});

export default DeliveryPage;
