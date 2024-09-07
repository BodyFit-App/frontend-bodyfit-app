import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        // onPress={() => navigation.navigate("Login")}
      >
        LoginScreen
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginBottom: 10,
  },
});
