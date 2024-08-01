import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => console.log("Pressed")}>
        Press me
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

export default LoginScreen;
