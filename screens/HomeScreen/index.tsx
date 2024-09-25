import React from "react";
import { BottomNavigation, FAB, Portal, Text } from "react-native-paper";
import ActualiteScreen from "../Actualites";
import theme from "../../theme";
import { ExplorerScreen } from "../ExplorerScreen";
import { StackScreenProps } from "@react-navigation/stack";
import { AppParamListBase } from "../../navigations/main";
import { FollowersScreen } from "../FollowersScreen";
import DashboardScreen from "../DashboardScreen";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

/**
 * HomeScreen Component
 *
 * This component represents the main screen of the application that contains bottom navigation for navigating
 * between different sections such as "Actualité" (Newsfeed), "Explorer" (Explore content), and "Profil" (User profile).
 * It uses `react-native-paper`'s `BottomNavigation` component to switch between different scenes based on the selected tab.
 *
 * @component
 * @example
 * return (
 *   <HomeScreen
 *     navigation={navigation}
 *     route={route}
 *   />
 * );
 *
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - The navigation object provided by React Navigation.
 * @param {Object} props.route - The route object that contains the current route's information.
 *
 * @returns {JSX.Element} A React component that renders the home screen with bottom navigation.
 *
 * @typedef {Object} Route - Represents a route configuration for the BottomNavigation component.
 * @property {string} key - A unique key for the route.
 * @property {string} title - The title displayed on the tab.
 * @property {string} focusedIcon - The icon displayed on the tab when it is focused.
 * @property {string} testID - A unique identifier for testing purposes.
 *
 * @typedef {Object} NavigationState - Represents the state of the BottomNavigation component.
 * @property {number} index - The index of the currently active tab.
 * @property {Route[]} routes - An array of route configurations for the BottomNavigation component.
 *
 * @param {StackScreenProps<AppParamListBase, 'HomeScreen'>} props - Props passed down from React Navigation, including `navigation` and `route`.
 *
 * @returns {JSX.Element} - Returns a JSX element representing the home screen of the app.
 */

export const HomeScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "HomeScreen">) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "actuality",
      title: "Actualité",
      focusedIcon: "newspaper",
      testID: "tab-actuality",
    },
    {
      key: "explorer",
      title: "Explorer",
      focusedIcon: "compass",
      testID: "tab-explorer",
    },
    {
      key: "dashboard",
      title: "Profil",
      focusedIcon: "account",
      testID: "tab-dashboard",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    actuality: () => <ActualiteScreen navigation={navigation} route={route} />,
    explorer: () => <ExplorerScreen navigation={navigation} route={route} />,
    dashboard: () => <DashboardScreen navigation={navigation} route={route} />,
  });

  return (
    <SafeAreaProvider>
      <BottomNavigation
        testID="bottom-navigation"
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
    </SafeAreaProvider>
  );
};
