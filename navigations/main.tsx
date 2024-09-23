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
            <Stack.Screen
              name="ExerciseListScreen"
              component={ExerciseListScreen}
            />
            <Stack.Screen
              name="ExerciseFormScreen"
              component={ExerciseFormScreen}
            />

            <Stack.Screen
              name="GoalDetailsScreen"
              component={GoalDetailsScreen}
            />
            <Stack.Screen name="GoalFormScreen" component={GoalFormScreen} />
            <Stack.Screen name="GoalListScreen" component={GoalListScreen} />
            <Stack.Screen
              name="ProgramDetailsScreen"
              component={ProgramDetailsScreen}
            />
            <Stack.Screen
              name="ProgramFormScreen"
              component={ProgramFormScreen}
            />
            <Stack.Screen
              name="ProfileFormScreen"
              component={ProfileFormScreen}
            />
            <Stack.Screen
              name="ProfileDetailsScreen"
              component={ProfileDetailsScreen}
            />
            <Stack.Screen
              name="ProgramListScreen"
              component={ProgramListScreen}
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
