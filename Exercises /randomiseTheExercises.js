import { useState, useEffect } from "react";
import { easyExercises, hardExercises } from "./exercises"; // Adjust the import path

const randomiseChecklist = () => {
  const [selectedExercises, setSelectedExercises] = useState({
    easy: null,
    hard: null,
  });

  const getRandomExercise = (exerciseArray) => {
    const randomIndex = Math.floor(Math.random() * exerciseArray.length);
    return exerciseArray[randomIndex];
  };

  const selectExercises = () => {
    const randomEasyExercise = getRandomExercise(easyExercises);
    const randomHardExercise = getRandomExercise(hardExercises);
    setSelectedExercises({
      easy: randomEasyExercise,
      hard: randomHardExercise,
    });
  };

  useEffect(() => {
    selectExercises();
  }, []);

  return selectedExercises;
};

