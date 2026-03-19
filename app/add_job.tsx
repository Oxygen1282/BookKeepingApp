import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { Job } from "./jobs_entries_type";

export default function AddJob() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const addJob = async () => {
    try {
      // Load existing transactions
      const stored = await AsyncStorage.getItem("@jobs");
      const jobs: Job[] = stored ? JSON.parse(stored) : [];

      const newJob: Job = {
        id: Date.now().toString(),
        title,
        entries: [],
      };

      jobs.push(newJob);

      // Save added job
      await AsyncStorage.setItem("@jobs", JSON.stringify(jobs));

      // Go back to home
      router.back();
    } catch (e) {
      console.log("Error saving transaction", e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Job Title"
        value={title}
        onChangeText={setTitle}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add Job" onPress={addJob} />
      <Button title="Cancel" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: 250,
    marginBottom: 20,
  },
});
