import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Job } from "./jobs_entries_type";

export default function EditJob() {
  const router = useRouter();
  const { jobId } = useLocalSearchParams();

  const [job, setJob] = useState<Job | null>(null);

  // Load Entries from storage
  const loadJob = async () => {
    const stored = await AsyncStorage.getItem("@jobs");
    const jobs: Job[] = stored ? JSON.parse(stored) : [];

    // Find the specific Job
    const foundJob = jobs.find((j) => j.id === jobId);

    setJob(foundJob || null);
  };

  // Run once when screen loads
  useEffect(() => {
    loadJob();
  }, []);

  if (!job) {
    return (
      <View style={styles.container}>
        <Text>No Job Found</Text>
      </View>
    );
  }
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
