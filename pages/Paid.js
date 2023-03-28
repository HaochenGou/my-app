import React from "react";
import { StyleSheet, View } from "react-native";
import ViewOrderAndEdit from "../components/ViewOrderAndEdit";

const PaidPage = () => {
  return (
    <View style={styles.container}>
      <ViewOrderAndEdit direction="Paid" />
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

export default PaidPage;
