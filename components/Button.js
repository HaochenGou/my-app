import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Button({ label, theme }) {
  if (theme === "input") {
    return (
      <View
      style={[
        styles.buttonContainer,
        { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
      ]}>
      <Pressable
        style={[styles.button, { backgroundColor: '#fff' }]}
        onPress={() => alert('You pressed a button.')}>
        <Entypo name="add-to-list" size={24} color="black" style={styles.buttonIcon} />
        <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
      </Pressable>
    </View>
    );
  }
  else if (theme === "paid") {
    return (
      <View
      style={[
        styles.buttonContainer,
        { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
      ]}>
      <Pressable
        style={[styles.button, { backgroundColor: '#fff' }]}
        onPress={() => alert('You pressed a button.')}>
        <MaterialIcons name="payments" size={24} color="black" style={styles.buttonIcon} />
        <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
      </Pressable>
    </View>
    );
  }

  else if (theme === "view") {
    return (
      <View
      style={[
        styles.buttonContainer,
        { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
      ]}>
      <Pressable
        style={[styles.button, { backgroundColor: '#fff' }]}
        onPress={() => alert('You pressed a button.')}>
       <Ionicons name="file-tray-full-outline" size={24} color="black" style={styles.buttonIcon} />
        <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
      </Pressable>
    </View>
    );
  }
   else if (theme === "delivered") {
    return (
      <View
      style={[
        styles.buttonContainer,
        { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
      ]}>
      <Pressable
        style={[styles.button, { backgroundColor: '#fff' }]}
        onPress={() => alert('You pressed a button.')}>
       <MaterialCommunityIcons name="truck-delivery" size={24} color="black" style={styles.buttonIcon} />
        <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
      </Pressable>
    </View>
    );
  }


  return (
    <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
          <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
      </View>    
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
