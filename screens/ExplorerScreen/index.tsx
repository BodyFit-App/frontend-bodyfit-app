import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { TabView, SceneMap } from "react-native-tab-view";
import { StackScreenProps } from "@react-navigation/stack";
import { AppParamListBase } from "../../navigations/main";
import theme from "../../theme";
import { ExerciseListScene, ExerciseListScreen } from "../ExerciseListScreen";
import { ProgramListScreen } from "../ProgramListScreen";

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

export const ExplorerScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "HomeScreen">) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "exercises", title: "Exercices" },
    { key: "programs", title: "Programmes" },
    // { key: "profiles", title: "Utilisateurs" },
  ]);

  const renderScene = SceneMap({
    exercises: () => (
      <ExerciseListScene navigation={navigation} route={route} />
    ),
    programs: () => <ProgramListScreen navigation={navigation} route={route} />,
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
