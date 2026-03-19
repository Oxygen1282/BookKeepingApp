import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Job } from "./jobs_entries_type";

export default function RemoveJobs() {
  const router = useRouter();

  // State to store jobs
  const [jobs, setJobs] = useState<Job[]>([]);

  // Load jobs from storage
  const loadJobs = async () => {
    const stored = await AsyncStorage.getItem("@jobs");
    const data: Job[] = stored ? JSON.parse(stored) : [];
    setJobs(data);
  };

  // Run once when screen loads
  useEffect(() => {
    loadJobs();
  }, []);

  // Delete a Job
  const deleteJob = async (id: string) => {
    try {
      // Coppy current jobs
      const updated = jobs.filter((t) => t.id !== id);

      // Save updated list back to storage
      await AsyncStorage.setItem("@jobs", JSON.stringify(updated));

      // Update UI
      setJobs(updated);
    } catch (e) {
      console.log("Error deleting transaction", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a transaction to delete</Text>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => deleteJob(item.id)}
            style={({ pressed }) => [styles.item, pressed && { opacity: 0.5 }]}
          >
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text>{item.entries.length} entries</Text>
          </Pressable>
        )}
      />
      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Back</Text>
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
    borderWidth: 1,
    marginBottom: 10,
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "blue",
  },
  buttonText: {
    color: "white",
  },
});
