import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/login";
import theme from "../../theme";
import { useAuth } from "../../hooks/useAuth";
import ExerciseFormScreen from "../../screens/ExerciseFormScreen";
import { BottomTabs } from "../BottomTabs";

const Stack = createStackNavigator();

function AppNav() {
  const { session } = useAuth();

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
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
          name="Home"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="ExerciseCreation"
          options={{ title: "Créer mon exercice" }}
          component={ExerciseFormScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNav;
