import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function RemoveTransactionScreen() {
  const router = useRouter();

  // State to store trasactions
  const [transactions, setTransactions] = useState<number[]>([]);

  // Load transactions from storage
  const loadTransactions = async () => {
    const stored = await AsyncStorage.getItem("@transactions");
    const data = stored ? JSON.parse(stored) : [];
    setTransactions(data);
  };

  // Run once when modal opens
  useEffect(() => {
    loadTransactions();
  }, []);

  // Delete a transaction
  const deleteTransaction = async (indexToRemove: number) => {
    try {
      // Coppy current transactions
      const updated = [...transactions];

      // Remove the selectied item
      updated.splice(indexToRemove, 1);

      // Save updated list back to storage
      await AsyncStorage.setItem("@transactions", JSON.stringify(updated));

      // Updated UI immediately
      setTransactions(updated);
    } catch (e) {
      console.log("Error deleting transaction", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a transaction to delete</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => deleteTransaction(index)}
            style={({ pressed }) => [styles.item, pressed && { opacity: 0.5 }]}
          >
            <Text style={styles.itemText}>{item}</Text>
          </Pressable>
        )}
      />

      <Pressable onPress={() => router.back()} style={styles.closeButton}>
        <Text style={styles.closeText}>Done</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  item: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ccc",
    alignItems: "center",
  },
  closeText: {
    fontSize: 18,
  },
});
