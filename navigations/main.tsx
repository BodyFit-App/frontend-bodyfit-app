import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import theme from "../theme";
import { useAuth } from "../hooks/useAuth";
import { LoginScreen } from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { ExerciseDetailsScreen } from "../screens/ExerciseDetailsScreen";
import { ExerciseFormScreen } from "../screens/ExerciseFormScreen";
import { GoalDetailsScreen } from "../screens/GoalDetailsScreen";
import { GoalFormScreen } from "../screens/GoalFormScreen";
import { GoalListScreen } from "../screens/GoalListScreen";
import { ProgramDetailsScreen } from "../screens/ProgramDetailsScreen";
import { ProgramFormScreen } from "../screens/ProgramFormScreen";
import { ProfileFormScreen } from "../screens/ProfileFormScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import LandingScreen from "../screens/LandingScreen";
import { ExerciseListScreen } from "../screens/ExerciseListScreen";
import { ProgramListScreen } from "../screens/ProgramListScreen";
import { ProfileDetailsScreen } from "../screens/ProfileDetailScreen";
import { FollowersScreen } from "../screens/FollowersScreen";
import RgpdScreen from "../screens/RgpdScreen";

/**
 * The main navigation component that handles the navigation structure of the app. It contains routes for authenticated
 * and unauthenticated users. If the user is authenticated, they will be shown various screens like Home, Exercises, Goals,
 * Programs, etc. Otherwise, they will be directed to the login, register, or landing screens.
 *
 * @component
 * @example
 * return <MainNavigation />;
 *
 * @typedef {Object} AppParamListBase - The navigation parameter types for the app.
 * @property {Object} Actualites - Parameters for the "Actualites" screen.
 * @property {Object} DashboardScreen - Parameters for the "DashboardScreen".
 * @property {Object} ExerciseDetailsScreen - Parameters for the "ExerciseDetailsScreen".
 * @property {Object} ExerciseFormScreen - Parameters for the "ExerciseFormScreen".
 * @property {Object} ExerciseListScreen - Parameters for the "ExerciseListScreen".
 * @property {Object} GoalDetailsScreen - Parameters for the "GoalDetailsScreen".
 * @property {Object} GoalFormScreen - Parameters for the "GoalFormScreen".
 * @property {Object} GoalListScreen - Parameters for the "GoalListScreen".
 * @property {Object} HomeScreen - Parameters for the "HomeScreen".
 * @property {Object} LandingScreen - Parameters for the "LandingScreen".
 * @property {Object} LoginScreen - Parameters for the "LoginScreen".
 * @property {Object} ProfileFormScreen - Parameters for the "ProfileFormScreen".
 * @property {Object} ProfileDetailsScreen - Parameters for the "ProfileDetailsScreen".
 * @property {Object} ProgramDetailsScreen - Parameters for the "ProgramDetailsScreen".
 * @property {Object} ProgramFormScreen - Parameters for the "ProgramFormScreen".
 * @property {Object} ProgramListScreen - Parameters for the "ProgramListScreen".
 * @property {Object} RegisterScreen - Parameters for the "RegisterScreen".
 * @property {Object} RgpdScreen - Parameters for the "RgpdScreen".
 *
 * @returns {JSX.Element} - The main navigation component that renders navigation stacks.
 */

export type AppParamListBase = {
  Actualites: { id?: number; user_id?: number; type?: string };
  DashboardScreen: undefined;
  ExerciseDetailsScreen: { id: number };
  ExerciseFormScreen: { id?: number };
  ExerciseListScreen: { filters?: any };
  GoalDetailsScreen: { id: number };
  GoalFormScreen: { id?: number };
  GoalListScreen: { filters?: any };
  HomeScreen: undefined;
  LandingScreen: undefined;
  LoginScreen: undefined;
  ProfileFormScreen: undefined;
  ProfileDetailsScreen: { id: number };
  ProgramDetailsScreen: { id: number };
  ProgramListScreen: { filters?: any };
  ProgramFormScreen: { id?: number };
  RegisterScreen: undefined;
  RgpdScreen: undefined;
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
              options={{ title: "Détails de l'exercice" }}
            />
            <Stack.Screen
              name="ExerciseListScreen"
              component={ExerciseListScreen}
              options={{ title: "Liste des exercices" }}
            />
            <Stack.Screen
              name="ExerciseFormScreen"
              component={ExerciseFormScreen}
              options={{ title: "Créer un exercice" }}
            />

            <Stack.Screen
              name="GoalDetailsScreen"
              component={GoalDetailsScreen}
              options={{ title: "Détails de l'objectif" }}
            />
            <Stack.Screen
              name="GoalFormScreen"
              component={GoalFormScreen}
              options={{ title: "Créer un objectif" }}
            />
            <Stack.Screen
              name="GoalListScreen"
              component={GoalListScreen}
              options={{ title: "Liste des objectifs" }}
            />
            <Stack.Screen
              name="ProgramDetailsScreen"
              component={ProgramDetailsScreen}
              options={{ title: "Détails du programme" }}
            />
            <Stack.Screen
              name="ProgramFormScreen"
              component={ProgramFormScreen}
              options={{ title: "Créer un programme" }}
            />
            <Stack.Screen
              name="ProfileFormScreen"
              component={ProfileFormScreen}
              options={{ title: "Modifier le profil" }}
            />
            <Stack.Screen
              name="ProfileDetailsScreen"
              component={ProfileDetailsScreen}
              options={{ title: "Profil" }}
            />
            <Stack.Screen
              name="ProgramListScreen"
              component={ProgramListScreen}
              options={{ title: "Liste des programmes" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="LandingScreen"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RgpdScreen"
              component={RgpdScreen}
              options={{ title: "Politique de confidentialité" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
