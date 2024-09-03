import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfilScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Profil</Text>
  </View>
);

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
});

export default ProfilScreen;
