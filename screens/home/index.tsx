import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useNavigate } from "react-router-native";

export const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <View>
      <Button onPress={() => navigate("/")}>LoginScreen</Button>
    </View>
  );
};
