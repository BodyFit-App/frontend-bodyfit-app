import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/login";
import theme from "../../theme";
import { useAuth } from "../../hooks/useAuth";
import ExerciseFormScreen from "../../screens/ExerciseFormScreen";
import { BottomTabs } from "../BottomTabs/BottomTabs";
import HomeScreen from "../../screens/home";
import ProgramFormScreen from "../../screens/ProgramFormScreen";
import RegisterScreen from "../../screens/register";
import GoalFormScreen from "../../screens/GoalFormScreen";
import DashboardScreen from "../../screens/Dashboard";
import { ExerciseScreen } from "../../screens/exercise";
import { ProgramScreen } from "../../screens/program";

const Stack = createStackNavigator<any>();

function AppNav() {
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
         name='Mon Programme'
          component={ProgramScreen}
          options={{ headerShown: true }}
        />
         <Stack.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{ headerShown: true }}
      />
          <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: true }}
      />
      
      
         <Stack.Screen
          name="BottomTabs"
          component={BottomTabs as any}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="GoalFormScreen"
          options={{ title: "Créer mon exercice" }}
          component={GoalFormScreen as any}
        />

        <Stack.Screen
          name="ProgramFormScreen"
          options={{ title: "Créer mon exercice" }}
          component={ProgramFormScreen}
        />

        <Stack.Screen
          name="ExerciseCreation"
          options={{ title: "Créer mon exercice" }}
          component={ExerciseFormScreen}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNav;
