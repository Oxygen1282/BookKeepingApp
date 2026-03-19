import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<number[]>([]);

  const loadTransactions = async () => {
    const stored = await AsyncStorage.getItem("@transactions");
    const data = stored ? JSON.parse(stored) : [];
    setTransactions(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadTransactions();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Welcome to Ryans Bookkeeping App</Text>
      <Text style={styles.subtitle}>Your homepage</Text>

      <Button
        title="Add Transaction"
        onPress={() => router.push("/add_transaction")}
      />
      <Button
        title="Remove Transaction"
        onPress={() => router.push("/remove_transaction")}
      />
      <Text style={styles.title}>Transactions:</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item} </Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // takes full screen
    justifyContent: "center", // vertical centering
    alignItems: "center", // horizontal centering
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  item: {
    fontSize: 18,
    padding: 5,
  },
});
