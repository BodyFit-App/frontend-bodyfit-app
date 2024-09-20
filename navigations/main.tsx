import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import theme from "../theme";
import { useAuth } from "../hooks/useAuth";

export type ParamListBase = {
  Actualites: undefined;
  DashboardScreen: undefined;
  ExerciseDetailsScreen: { id: string };
  ExerciseFormScreen: undefined;
  ExerciseListScreen: { filters?: any };
  ExplorerScreen: undefined;
  GoalDetailsScreen: { id: string };
  GoalFormScreen: undefined;
  GoalListScreen: { filters?: any };
  HomeScreen: undefined;
  LandingScreen: undefined;
  LoginScreen: undefined;
  ProfileFormScreen: undefined;
  ProgramDetailsScreen: { id: string };
  ProgramFormScreen: undefined;
  ProgramListScreen: { filters?: any };
  RegisterScreen: undefined;
};

const Stack = createStackNavigator<ParamListBase>();

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
        {/* TODO: Uncomment later to protect routes 
         {session ? (
          <Stack.Screen
            name="Home"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )} */}
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
