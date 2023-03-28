import React from "react";
import { StyleSheet, View } from "react-native";
import ViewOrderAndEdit from "../components/ViewOrderAndEdit";

const ViewPage = () => {
  return (
    <View style={styles.container}>
      <ViewOrderAndEdit direction="Unpaid" />
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

export default ViewPage;
