import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const ProfilScreen = () => {
  return <View style={styles.container}></View>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161626",
  },
  text: {
    color: "#2F80ED",
    fontSize: 24,
  },
});

export default ProfilScreen;
