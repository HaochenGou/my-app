import { StyleSheet, View, Pressable, Text, Dimensions } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Button({ label, theme, direction }) {
  const navigation = useNavigation();
  
  const handlePress = () => {
    navigation.navigate(direction);
  };

  if (theme === "input") {
    return (
      <View
        style={[styles.buttonContainer, { borderWidth: 0, borderRadius: 18 }]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={handlePress}
        >
          <Entypo name="add-to-list" size={24} style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  } else if (theme === "inventory") {
    return (
      <View
        style={[styles.buttonContainer, { borderWidth: 0, borderRadius: 18 }]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={handlePress}
        >
          <MaterialIcons name="inventory" size={24} style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  } else if (theme === "view") {
    return (
      <View
        style={[styles.buttonContainer, { borderWidth: 0, borderRadius: 18 }]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={handlePress}
        >
          <Ionicons
            name="file-tray-full-outline"
            size={24}
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => alert("You pressed a button.")}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: windowWidth * 0.9, // Set the width to 90% to fit the screen better
    height: 68,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    elevation: 2, // Add elevation for a subtle shadow effect
    borderColor: "transparent", // Hide the black border
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#25292e", // Change the text color to match the other buttons
    fontSize: 16,
  },
});
