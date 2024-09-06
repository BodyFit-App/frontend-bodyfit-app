import React from "react";
import LoginScreen from "./login";
import { NativeRouter, Route, Routes } from "react-router-native";
import { HomeScreen } from "./home";
import { ExerciseScreen } from "./exercise";
import { ExercisesScreen } from "./exercises";

const Screens = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/exercises" element={<ExercisesScreen />} />
        <Route path="/exercise/:id" element={<ExerciseScreen />} />
      </Routes>
    </NativeRouter>
  );
};

export default Screens;
