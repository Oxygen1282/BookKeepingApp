import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Job } from "./jobs_entries_type";

export default function EditJob() {
  const router = useRouter();
  const { jobId } = useLocalSearchParams();

  const [job, setJob] = useState<Job | null>(null);

  // Run once when screen loads
  useEffect(() => {
    // Load Entries from storage
    const loadJob = async () => {
      const stored = await AsyncStorage.getItem("@jobs");
      const jobs: Job[] = stored ? JSON.parse(stored) : [];

      // Find the specific Job
      const foundJob = jobs.find((j) => j.id === jobId);
      setJob(foundJob || null);
    };

    loadJob();
  }, [jobId]);

  if (!job) {
    return (
      <View style={styles.container}>
        <Text>No Job Found</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>

      <FlatList
        data={job.entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Start: {item.startTime}</Text>
            <Text>End: {item.endTime}</Text>
            <Text>Rate: {item.hourlyRate}</Text>
            <Text>Duration: {item.duration} hours</Text>
            <Text>{item.comments}</Text>
          </View>
        )}
      />

      <Pressable onPress={() => router.back()} style={styles.button}>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
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
