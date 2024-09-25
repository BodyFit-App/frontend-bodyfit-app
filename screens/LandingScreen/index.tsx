import { View, StyleSheet } from "react-native";
import React from "react";
import { Image } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { StackScreenProps } from "@react-navigation/stack";
import { AppParamListBase } from "../../navigations/main";

/**
 * LandingScreen Component
 *
 * This component represents the landing screen of the application. It is the initial screen users see, offering options to log in or sign up.
 * It uses the `CustomButton` component to navigate the user to either the login screen or the registration screen.
 *
 * @component
 * @example
 * return (
 *   <LandingScreen
 *     navigation={navigation}
 *     route={route}
 *   />
 * );
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.navigation - The navigation object provided by React Navigation.
 * @param {Object} props.route - The route object provided by React Navigation.
 *
 * @returns {JSX.Element} A React component that renders the landing screen with options for login and registration.
 *
 * @param {StackScreenProps<AppParamListBase, 'LandingScreen'>} props - Props passed down from React Navigation, including `navigation` and `route`.
 *
 * @returns {JSX.Element} - Returns a JSX element representing the landing screen of the app.
 */


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
      <View style={{ width: "100%" }}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0B0B12",
  },
  img: {
    width: "100%",
    height: 200,
    objectFit: "contain",
    marginTop: 150,
  },
  button: {
    marginBottom: 15,
    width: "100%",
  },
});
