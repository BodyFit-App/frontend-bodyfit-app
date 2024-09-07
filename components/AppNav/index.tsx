import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ActualiteScreen from "../../screens/Actualites/index";
import { ExercisesScreen } from "../../screens/exercises/index";
import ProfilScreen from "../../screens/Profil/index";
import LoginScreen from "../../screens/login";
import theme from "../../theme";

const Stack = createStackNavigator();

function BottomTabs() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "actualite", title: "Actualité", focusedIcon: "newspaper" },
    { key: "exercices", title: "Exercices", focusedIcon: "dumbbell" },
    { key: "profil", title: "Profil", focusedIcon: "account" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    actualite: ActualiteScreen,
    exercices: ExercisesScreen,
    profil: ProfilScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

function AppNav() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNav;
