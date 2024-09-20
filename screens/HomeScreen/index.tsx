import React from "react";
import { BottomNavigation } from "react-native-paper";
import ActualiteScreen from "../Actualites";
import theme from "../../theme";
import { ExplorerScreen } from "../ExplorerScreen";
import { StackScreenProps } from "@react-navigation/stack";
import { AppParamListBase } from "../../navigations/main";
import { DashboardScreen } from "../DashboardScreen";

export const HomeScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "HomeScreen">) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "actuality", title: "Actualité", focusedIcon: "newspaper" },
    { key: "explorer", title: "Explorer", focusedIcon: "compass" },
    { key: "dashboard", title: "Profil", focusedIcon: "account" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    actuality: ActualiteScreen,
    // explorer: () => <ExplorerScreen navigation={navigation} route={route} />,
    // dashboard: () => <DashboardScreen navigation={navigation} route={route} />,
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
