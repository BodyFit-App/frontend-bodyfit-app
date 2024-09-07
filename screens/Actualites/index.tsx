import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const ActualiteScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Actualité</Text>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate("Login" as never)}
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
    backgroundColor: "#161626", // Fond sombre
  },
  text: {
    color: "#2F80ED", // Couleur bleue
    fontSize: 24,
  },
  button: {
    marginBottom: 10,
  },
});

export default ActualiteScreen;
