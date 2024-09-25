import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { TabView, SceneMap } from "react-native-tab-view";
import { StackScreenProps } from "@react-navigation/stack";
import { AppParamListBase } from "../../navigations/main";
import theme from "../../theme";
import { ExerciseListScene, ExerciseListScreen } from "../ExerciseListScreen";
import { ProgramListScreen } from "../ProgramListScreen";
import { FollowersScreen } from "../FollowersScreen";

/**
 * Custom render function for the tab bar in the `ExplorerScreen`.
 * This function defines how the tab buttons are styled and allows switching between tabs.
 *
 * @param {any} props - The props provided by the TabView for rendering the tabs.
 * @returns {JSX.Element} The rendered tab bar with buttons for each route.
 */

const renderTabBar = (props: any) => (
  <View style={styles.tabBar}>
    {props.navigationState.routes.map((route: any, i: number) => (
      <Button
        key={i}
        mode={"text"}
        onPress={() => props.jumpTo(route.key)}
        style={{
          ...styles.tabButton,
          ...(props.navigationState.index === i
            ? {
                backgroundColor: theme.colors.primary,
              }
            : {}),
        }}
        textColor={
          props.navigationState.index === i ? "white" : theme.colors.primary
        }
      >
        {route.title}
      </Button>
    ))}
  </View>
);

/**
 * ExplorerScreen Component
 *
 * This screen is responsible for navigating between different sections like Exercises, Programs, and Followers.
 * It uses a tab view with multiple routes, each rendering a different list of items.
 * The component handles navigation between these tabs and passing necessary props to the respective screens.
 *
 * @component
 * @example
 * return <ExplorerScreen navigation={navigation} route={route} />;
 *
 * @param {StackScreenProps<AppParamListBase, "HomeScreen">} props - Navigation and route props provided by the Stack Navigator.
 * @returns {JSX.Element} The rendered ExplorerScreen component.
 */

export const ExplorerScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "HomeScreen">) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "exercises", title: "Exercices" },
    { key: "programs", title: "Programmes" },
    {
      key: "followers",
      title: "Utilisateurs",
      focusedIcon: "account-multiple",
      testID: "tab-followers",
    },
  ]);

  /**
   * Scene map for rendering different routes (tabs) in the `TabView`.
   * Each key in the map corresponds to a route, and the value is a function returning the component for that route.
   */
  
  const renderScene = SceneMap({
    exercises: () => (
      <ExerciseListScene navigation={navigation} route={route} />
    ),
    programs: () => <ProgramListScreen navigation={navigation} route={route} />,
    followers: () => <FollowersScreen navigation={navigation} route={route} />,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    elevation: 4,
    padding: 16,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
