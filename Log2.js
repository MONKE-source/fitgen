import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Log2 = () => {
  const [completedExercises, setCompletedExercises] = useState([]);

  useEffect(() => {
    // Load completed exercises from local storage
    AsyncStorage.getItem('completedExercises').then((completedExercisesJson) => {
      const parsedExercises = JSON.parse(completedExercisesJson) || [];
      setCompletedExercises(parsedExercises);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>List of Completed Exercises:</Text>
      <FlatList
        data={completedExercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Log2;
