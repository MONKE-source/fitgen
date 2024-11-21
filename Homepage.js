import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Button, Image, StyleSheet  } from "react-native";
import homePageStyles from "./HomePageStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import homePageBg from './assets/homePageBg.jpeg'
import { Notifications } from 'expo';
import { Alert } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";




const easyExercises = [
  "Push-ups - 5 sets",
  "Jumping jacks - 10 sets",
  "Squats - 10 sets",
  "Lunges - 10 sets",
  "Plank - 30 seconds",
  "High knees - 10 sets",
  "Sit-ups - 20 sets",
  "Arm circles - 20 sets per arm",
  "Mountain climbers - 10 sets",
  "Toe touches - 5 sets",
  "Leg lifts - 20 sets",
  "Bicycle crunches - sets ",
  "Wall sit - 5 sets",
  "Calf raises - 10 sets",
  "Tricep dips - 5 sets",
  "Flutter kicks - 10 sets",
  "Russian twists - 5 sets",
  "Side leg lifts - 10 sets",
  "Supermans - 5",
  "Arm stretches - 10 ",
];

const hardExercises = [
  "Burpees - 5 ",
  "Bulgarian split squats - 5 ",
  "Pike push-ups - 5",
  "Tuck jumps -5 ",
  "Plyometric lunges - 5",
  "Diamond push-ups - 5",
  "Single-leg squats - 5",
  "Hanging leg raises - 5",
  "Plank to push-up - 5",
  "L-sit - 5",
];

const getRandomExercise = (exerciseArray) => {
  const randomIndex = Math.floor(Math.random() * exerciseArray.length);
  return exerciseArray[randomIndex];
};



const HomePage = () => {
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState("");
  const [completedItems, setCompletedItems] = useState([]);

  
  const loadItems = async () => {
    try {
      const savedItems = await AsyncStorage.getItem("checklistItems");
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
      
      const savedCompletedItems = await AsyncStorage.getItem("completedItems");
      if (savedCompletedItems) {
        setCompletedItems(JSON.parse(savedCompletedItems));
      }
    } catch (error) {
      console.error("Error loading checklist items from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadItems();

    const resetCheckboxState = async () => {
      const today = new Date().toLocaleDateString();
      const lastReset = await AsyncStorage.getItem("lastReset");

      if (lastReset !== today) {
        setItems(items.map((item) => ({ ...item, isChecked: false })));
        await AsyncStorage.setItem("lastReset", today);
      }
    };

    resetCheckboxState();

    // Generate and add random exercises when the component mounts
    const randomEasyExercise = getRandomExercise(easyExercises);
    const randomHardExercise = getRandomExercise(hardExercises);

    setItems([
      { label: randomEasyExercise, isChecked: false },
      { label: randomHardExercise, isChecked: false },
    ]);
  }, []);




  const resetCheckboxState = async () => {
    const today = new Date().toLocaleDateString();
    const lastReset = await AsyncStorage.getItem("lastReset");

    if (lastReset !== today) {
      setItems(items.map(item => ({ ...item, isChecked: false })));
      await AsyncStorage.setItem("lastReset", today);
    }
  };



  

  const toggleCheck = (index) => {
    const updatedItems = [...items];
    const itemToToggle = updatedItems[index];
    
    setTimeout(() => {
      deleteItem(index);
    }, 2000); 
  
    // Toggle the isChecked property of the item
    itemToToggle.isChecked = !itemToToggle.isChecked;
  
    if (itemToToggle.isChecked) {
      // Include the completion date when an item is marked as completed
      itemToToggle.completionDate = new Date().toLocaleDateString();
    } else {
      // Remove the completion date when an item is marked as not completed
      delete itemToToggle.completionDate;
    }
  
    // Update the list of items
    setItems(updatedItems);
  
    // Save the updated items to AsyncStorage
    saveItems(updatedItems);
  
    // Add or remove the item from completed items
    const updatedCompletedItems = [...completedItems];
  
    if (itemToToggle.isChecked) {
      // Add the item to completed items when checked
      updatedCompletedItems.push(itemToToggle);
    } else {
      // Remove the item from completed items when unchecked
      const indexOfItemToRemove = updatedCompletedItems.findIndex(
        (item) => item.label === itemToToggle.label
      );
  
      if (indexOfItemToRemove !== -1) {
        updatedCompletedItems.splice(indexOfItemToRemove, 1);
      }
    }
  
    // Update the list of completed items
    setCompletedItems(updatedCompletedItems);
  
    // Save the updated completed items to AsyncStorage
    saveCompletedItems(updatedCompletedItems);
  };
  

  // ... (your other code)

  // Save completed items to AsyncStorage
  const saveCompletedItems = async (completedItemsToSave) => {
    try {
      await AsyncStorage.setItem("completedItems", JSON.stringify(completedItemsToSave));
    } catch (error) {
      console.error("Error saving completed items to AsyncStorage:", error);
    }
  };


  const addNewItem = () => {
    if (newItemText) {
      const newItem = { label: newItemText, isChecked: false };
      setItems([...items, newItem]);
      setNewItemText("");
      saveItems([...items, newItem]);
    }
  };

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const addRandomExercise = () => {
    const randomExercise = getRandomExercise([...easyExercises, ...hardExercises]);
    const newItem = { label: randomExercise, isChecked: false };
    setItems([...items, newItem]);
    saveItems([...items, newItem]);
  };

  const saveItems = async (itemsToSave) => {
    try {
      await AsyncStorage.setItem("checklistItems", JSON.stringify(itemsToSave));
    } catch (error) {
      console.error("Error saving checklist items to AsyncStorage:", error);
    }
  };

  return (
    <View style={homePageStyles.container}>
      {/* Background Image */}
      <Image source={homePageBg} style={homePageStyles.backgroundImage} resizeMode="cover" />
      {/* Background Overlay */}
      <View style={homePageStyles.backgroundOverlay} />
  
      {/* Your Page Content */}
      <View style={homePageStyles.pageContent}>
        <View style={[homePageStyles.label, homePageStyles.textWrapper]}>
          <Text style={homePageStyles.text}>Checklist</Text>
        </View>
  
        <View style={homePageStyles.checklist}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleCheck(index)}
              onLongPress={() => deleteItem(index)} // Added long press to delete
              style={homePageStyles.checklistItem}
            >
              <View style={homePageStyles.checkbox}>
                {item.isChecked && <Text style={{ fontSize: 18 }}>✓</Text>}
              </View>
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
  
        {/* Input field and button for adding new items */}
        <View style={homePageStyles.addNewItemContainer}>
            <TextInput
              style={homePageStyles.addNewItemInput}
              placeholder="Add a new item"
              value={newItemText}
              onChangeText={(text) => setNewItemText(text)}
            />
            <Button title="Add" onPress={addNewItem} />
          </View>
  
        {/* Button to add a random exercise */}
        <Button title="Add Random Exercise" onPress={addRandomExercise} />
      </View>
    </View>
    
  );
  
}; 



export { HomePage, easyExercises, hardExercises, getRandomExercise  };