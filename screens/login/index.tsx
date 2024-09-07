import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { client } from "../../lib/supabase";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error);
      return;
    }

    setEmail("");
    setPassword("");
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" as never }],
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          label="email"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          mode="outlined"
        />

        <TextInput
          label="Mot de passe"
          mode="outlined"
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
    backgroundColor: "transparent",
  },
});

export default LoginScreen;
