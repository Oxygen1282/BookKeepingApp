import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function ModalScreen() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const addNumber = async () => {
    try {
      // Load existing transactions
      const stored = await AsyncStorage.getItem("@transactions");
      const transactions = stored ? JSON.parse(stored) : [];

      // Add a new number
      transactions.push(Number(value));

      // Save back to AsyncStorage
      await AsyncStorage.setItem("@transactions", JSON.stringify(transactions));

      // Go back to home
      router.back();
    } catch (e) {
      console.log("Error saving transaction", e);
    }
  };

  return (
    <View style={StyleSheet.container}>
      <TextInput
        placeholder="Enter a number"
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
        style={StyleSheet.input}
      />
    </View>
  );
}

// import { Link } from 'expo-router';
// import { StyleSheet } from 'react-native';

// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';

// export default function ModalScreen() {
//   return (
//     <ThemedView style={styles.container}>
//       <ThemedText type="title">This is a modal</ThemedText>
//       <Link href="/" dismissTo style={styles.link}>
//         <ThemedText type="link">Go to home screen</ThemedText>
//       </Link>
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   link: {
//     marginTop: 15,
//     paddingVertical: 15,
//   },
// });
