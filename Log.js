import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CompletedExercisesPage = () => {
  const [completedExercises, setCompletedExercises] = useState([]);

  const loadCompletedExercises = async () => {
    try {
      const savedCompletedExercises = await AsyncStorage.getItem('completedItems');
      if (savedCompletedExercises) {
        const parsedCompletedExercises = JSON.parse(savedCompletedExercises);

        // Sort the completed exercises by completionDate, from latest to earliest
        parsedCompletedExercises.sort((a, b) => {
          // Handle items without a completionDate by placing them at the bottom
          if (!a.completionDate && b.completionDate) return 1;
          if (a.completionDate && !b.completionDate) return -1;
          if (!a.completionDate && !b.completionDate) return 0;
          // Sort by completionDate in descending order
          return new Date(b.completionDate) - new Date(a.completionDate);
        });

        setCompletedExercises(parsedCompletedExercises);
      }
    } catch (error) {
      console.error('Error loading completed exercises from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadCompletedExercises();
  }, []);

  const deleteItem = async (index) => {
    try {
      const updatedItems = [...completedExercises];
      updatedItems.splice(index, 1);
      setCompletedExercises(updatedItems);

      // Save the updated list of completed exercises to AsyncStorage
      await AsyncStorage.setItem('completedItems', JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const confirmDelete = (index) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteItem(index) },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed Exercises</Text>
      <FlatList
        data={completedExercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onLongPress={() => confirmDelete(index)}
          >
            <View style={styles.completedExerciseItem}>
              <Text style={styles.exerciseName}>{item.label}</Text>
              {item.completionDate && (
                <Text style={styles.completionDate}>{item.completionDate}</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  completedExerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 18,
  },
  completionDate: {
    fontSize: 16,
    color: 'gray',
  },
});

export default CompletedExercisesPage;