import React from "react";
import { render, screen } from "@testing-library/react-native";
import { MainNavigation } from "./main";
import { useAuth } from "../hooks/useAuth";
import { Provider as PaperProvider } from "react-native-paper";

jest.mock("../theme", () => ({
  colors: {
    background: "#0b0b12",
    text: "#ffffff",
    primary: "#2F80ED",
    border: "#42424D",
  },
}));

jest.mock("@react-navigation/native", () => ({
  NavigationContainer: ({ children }) => children,
}));

jest.mock("@react-navigation/stack", () => {
  return {
    createStackNavigator: jest.fn().mockReturnValue({
      Navigator: ({ children }) => children,
      Screen: ({ children }) => children,
    }),
  };
});

jest.mock("../screens/LandingScreen", () => {
  const { Text } = require("react-native");
  return () => <Text>Landing Screen</Text>;
});

jest.mock("../screens/HomeScreen", () => {
  const { Text } = require("react-native");
  return () => <Text>Home Screen</Text>;
});

jest.mock("../screens/ExerciseDetailsScreen", () => "ExerciseDetailsScreen");
jest.mock("../screens/ExerciseFormScreen", () => "ExerciseFormScreen");
jest.mock("../screens/GoalDetailsScreen", () => "GoalDetailsScreen");
jest.mock("../screens/GoalFormScreen", () => "GoalFormScreen");
jest.mock("../screens/GoalListScreen", () => "GoalListScreen");
jest.mock("../screens/ProgramDetailsScreen", () => "ProgramDetailsScreen");
jest.mock("../screens/ProgramFormScreen", () => "ProgramFormScreen");
jest.mock("../screens/ProfileFormScreen", () => "ProfileFormScreen");
jest.mock("../screens/RegisterScreen", () => "RegisterScreen");
jest.mock("../screens/ExerciseListScreen", () => "ExerciseListScreen");
jest.mock("../screens/ProgramListScreen", () => "ProgramListScreen");
jest.mock("../screens/ProfilDetailScreen", () => "ProfilDetailScreen");

jest.mock("../hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

describe("MainNavigation", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders authenticated navigation when session is true", () => {
    (useAuth as jest.Mock).mockReturnValue({
      session: { user: { id: "123" } },
    });

    render(
      <PaperProvider>
        <MainNavigation />
      </PaperProvider>
    );

    expect(screen.findByText("Home Screen")).toBeTruthy();
  });

  test("renders unauthenticated navigation when session is false", () => {
    (useAuth as jest.Mock).mockReturnValue({ session: null });

    render(
      <PaperProvider>
        <MainNavigation />
      </PaperProvider>
    );

    expect(screen.findByText("Landing Screen")).toBeTruthy();
  });
});
