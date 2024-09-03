import React from "react";
import LoginScreen from "./login";
import { NativeRouter, Route, Routes } from "react-router-native";
import { HomeScreen } from "./home";
import { ExerciseScreen } from "./exercise";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExercisesScreen } from "./exercises";
import { MD3DarkTheme, Provider as PaperProvider } from "react-native-paper";

const theme = {
  ...MD3DarkTheme,
};

const queryClient = new QueryClient();

const Screens = () => {
  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NativeRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/exercises" element={<ExercisesScreen />} />
            <Route path="/exercise/:id" element={<ExerciseScreen />} />
          </Routes>
        </NativeRouter>
      </QueryClientProvider>
    </PaperProvider>
  );
};

export default Screens;
