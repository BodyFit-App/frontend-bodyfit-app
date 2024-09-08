import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";

const ActualiteScreen = () => {
  const { signOut } = useAuth();
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
      <Button style={styles.button} onPress={() => signOut()}>
        sign out
      </Button>
    </View>
  );
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
  button: {
    marginBottom: 10,
  },
});

export default ActualiteScreen;
