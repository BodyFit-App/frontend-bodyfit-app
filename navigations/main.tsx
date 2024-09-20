import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import theme from "../theme";
import { useAuth } from "../hooks/useAuth";
import { HomeScreen } from "../screens/HomeScreen";
import { ExerciseDetailsScreen } from "../screens/ExerciseDetailsScreen";

export type AppParamListBase = {
  Actualites: undefined;
  DashboardScreen: undefined;
  ExerciseDetailsScreen: { id: number };
  ExerciseListScreen: { filters?: any };
  ExerciseFormScreen: { id?: number };
  ExplorerScreen: undefined;
  GoalDetailsScreen: { id: number };
  GoalFormScreen: { id?: number };
  GoalListScreen: { filters?: any };
  HomeScreen: undefined;
  LandingScreen: undefined;
  LoginScreen: undefined;
  ProfileFormScreen: undefined;
  ProgramDetailsScreen: { id: number };
  ProgramListScreen: { filters?: any };
  ProgramFormScreen: { id?: number };
  RegisterScreen: undefined;
};

export const Stack = createStackNavigator<AppParamListBase>();

export const MainNavigation = () => {
  const { session } = useAuth();

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerStatusBarHeight: 40,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: theme.colors.text,
            fontSize: 20,
            paddingBottom: 20,
          },
          headerBackTitleVisible: false,
          headerLeftContainerStyle: { paddingBottom: 20 },
        }}
      >
        {session ? (
          <>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ExerciseDetailsScreen"
              component={ExerciseDetailsScreen}
            />
          </>
        ) : (
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
