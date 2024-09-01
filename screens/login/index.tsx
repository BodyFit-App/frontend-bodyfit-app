import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { client } from "../../lib/supabase";
import { useNavigate } from "react-router-native";

const LoginScreen = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return;
    }

    setEmail("");
    setPassword("");
    navigate("/home");
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          label="Mot de passe"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <Button mode="contained" onPress={handleSubmit}>
          Press me
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "transparent",
  },
});

export default LoginScreen;
