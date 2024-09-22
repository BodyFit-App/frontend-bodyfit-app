import { View, StyleSheet } from "react-native";
import React from "react";
import { Image } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { StackScreenProps } from "@react-navigation/stack";
import { AppParamListBase } from "../../navigations/main";

export default function LandingScreen({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "LandingScreen">) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo-app.png")}
        style={styles.img}
        testID="logo-image"
      />
      <CustomButton
        style={styles.button}
        children="Connexion"
        onPress={() => navigation.push("LoginScreen")}
        testID="login-button"
      />
      <CustomButton
        style={styles.button}
        children="Inscription"
        onPress={() => navigation.push("RegisterScreen")}
        testID="register-button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B0B12",
  },
  img: {
    width: "90%",
    height: 200,
    marginTop: 150,
    marginBottom: 180,
  },
  button: {
    marginBottom: 15,
    width: "80%",
  },
});
