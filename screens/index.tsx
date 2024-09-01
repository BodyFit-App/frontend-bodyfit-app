import React from "react";
import LoginScreen from "./login";
import { NativeRouter, Route, Routes } from "react-router-native";
import { HomeScreen } from "./home";
import { ExercisesScreen } from "./exercises";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Screens = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/exercises" element={<ExercisesScreen />} />
        </Routes>
      </NativeRouter>
    </QueryClientProvider>
  );
};

export default Screens;
