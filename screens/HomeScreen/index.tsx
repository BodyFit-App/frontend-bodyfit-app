import React from "react";
import { BottomNavigation } from "react-native-paper";
import ActualiteScreen from "../Actualites";
import theme from "../../theme";
import { DashboardScreen } from "../DashboardScreen";
import { ExplorerScreen } from "../ExplorerScreen";

export const HomeScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "actualite", title: "Actualité", focusedIcon: "newspaper" },
    { key: "explorer", title: "Explorer", focusedIcon: "compass" },
    { key: "dashboard", title: "Profil", focusedIcon: "account" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    actuality: ActualiteScreen,
    explorer: ExplorerScreen,
    dashboard: DashboardScreen,
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
      style={{ paddingTop: 32 }}
    />
  );
};
