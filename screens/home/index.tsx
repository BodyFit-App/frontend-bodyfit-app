import React from "react";
import { View , StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
  },
});

export const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <View>

      <Button style={styles.button} onPress={() => navigate("/login")}>LoginScreen</Button>
      <Button onPress={() => navigate("/exercises")}>ExercisesScreen</Button>
    </View>
  );
};
