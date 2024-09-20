import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { TabView, SceneMap } from "react-native-tab-view";
import theme from "../../theme";

const FirstRoute = () => (
  <View style={styles.container}>
    <Text style={{ color: "white" }}>Screen One</Text>
  </View>
);

const SecondRoute = () => (
  <View style={styles.container}>
    <Text style={{ color: "white" }}>Screen Two</Text>
  </View>
);

const ThirdRoute = () => (
  <View style={styles.container}>
    <Text style={{ color: "white" }}>Screen Three</Text>
  </View>
);

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

export const ExplorerScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "exercices", title: "Exercices" },
    { key: "programs", title: "Programmes" },
    { key: "profiles", title: "Utilisateurs" },
  ]);

  const renderScene = SceneMap({
    exercices: FirstRoute,
    programs: SecondRoute,
    profiles: ThirdRoute,
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
