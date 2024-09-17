import React from "react";
import { BottomNavigation } from "react-native-paper";
import ActualiteScreen from "../../screens/Actualites";
import { ExercisesScreen } from "../../screens/exercises";
import ProfilScreen from "../../screens/Dashboard";
import theme from "../../theme";

export function BottomTabs() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "actualite", title: "Actualité", focusedIcon: "newspaper" },
    { key: "exercices", title: "Exercices", focusedIcon: "dumbbell" },
    { key: "", title: "Explorer", focusedIcon: "compass" },
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
      barStyle={{
        backgroundColor: theme.colors.backgroundNav,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        height: 90,
      }}
      activeColor="#2F80ED"
      inactiveColor="#2F80ED"
    />
  );
}
