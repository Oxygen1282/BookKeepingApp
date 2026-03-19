import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Job } from "../jobs_entries_type";

export default function HomeScreen() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);

  const loadJobs = async () => {
    const stored = await AsyncStorage.getItem("@jobs");
    const data: Job[] = stored ? JSON.parse(stored) : [];
    setJobs(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadJobs();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Welcome to Ryans Bookkeeping App</Text>

      <Pressable style={styles.button} onPress={() => router.push("./add_job")}>
        <Text style={styles.buttonText}>Add Job</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push("./remove_job")}
      >
        <Text style={styles.buttonText}>Remove Job</Text>
      </Pressable>

      <Text style={styles.title}>Jobs:</Text>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() => router.push(`/edit_job_data?jobId=${item.id}`)}
          >
            <Text>{item.title}</Text>
            <Text>{item.entries.length} entries</Text>
          </Pressable>
        )}
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
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  item: {
    padding: 15,
    borderWidth: 1,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    padding: 10,
    backgroundColor: "blue",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
  },
});
