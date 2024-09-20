import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import TextField from "../../components/TextField/TextField";
import CustomButton from "../../components/CustomButton/CustomButton";
import theme from "../../theme";
import { StackScreenProps } from "@react-navigation/stack";
import { AppParamListBase } from "../../navigations/main";

export const LoginScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "LoginScreen">) => {
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    const { error } = await signIn(email, password);
    if (error) {
      console.log("Erreur de connexion", error.message);
    }

    navigation.reset({
      index: 0,
      routes: [{ name: "Home" as never }],
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require("../../assets/logo-app.png")}
          style={styles.img}
        />

        <View>
          <Text style={styles.title}>Bienvenue!</Text>
          <Text style={styles.subtitle}>Connectez-vous à votre compte</Text>

          <Controller
            control={control}
            rules={{
              required: "Adresse email requise",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Adresse email invalide",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                style={styles.textinput}
                label="Adresse email"
                placeholder="Adresse email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!errors.email}
                mode="outlined"
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: "Mot de passe requis",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                style={styles.textinput}
                label="Mot de passe"
                placeholder="Mot de passe"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                error={!!errors.password}
                mode="outlined"
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}

          <Text
            onPress={() => navigation.navigate("" as never)}
            style={styles.textmdp}
          >
            Mot de passe oublié ?
          </Text>

          <CustomButton style={styles.button} onPress={handleSubmit(onSubmit)}>
            Connectez-vous
          </CustomButton>

          <Text style={styles.textregister}>
            Vous n'avez pas de compte ?{" "}
            <Text
              style={{
                textDecorationLine: "underline",
                color: theme.colors.primary,
                fontWeight: "600",
              }}
              onPress={() => navigation.navigate("Register" as never)}
            >
              Inscrivez-vous
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  title: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 48,
    fontWeight: "700",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 55,
    fontSize: 16,
    fontWeight: "500",
    color: "#79797F",
  },
  textmdp: {
    textAlign: "right",
    marginBottom: 50,
    marginRight: 40,
    color: "#79797F",
    fontStyle: "italic",
    fontWeight: "600",
    fontSize: 16,
  },
  textregister: {
    textAlign: "center",
    marginBottom: 50,
    fontWeight: "600",
    color: "#79797F",
    fontStyle: "italic",
    fontSize: 16,
  },
  img: {
    width: "70%",
    height: 200,
    marginHorizontal: "auto",
    marginBottom: 50,
  },
  textinput: {
    marginBottom: 25,
    width: "80%",
    marginHorizontal: "auto",
  },
  button: {
    marginBottom: 15,
    width: "80%",
    marginHorizontal: "auto",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
});
