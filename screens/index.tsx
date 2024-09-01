import React from "react";
import LoginScreen from "./login";
import { NativeRouter, Route, Routes } from "react-router-native";
import { HomeScreen } from "./home";

const Screens = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </NativeRouter>
  );
};

export default Screens;
