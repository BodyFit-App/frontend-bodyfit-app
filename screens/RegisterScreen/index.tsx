import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import TextField from "../../components/TextField/TextField";
import CustomButton from "../../components/CustomButton/CustomButton";
import theme from "../../theme";
import { useAuth } from "../../hooks/useAuth";
import { StackScreenProps } from "@react-navigation/stack";
import { AppParamListBase } from "../../navigations/main";

export const RegisterScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "RegisterScreen">) => {
  const { signUp } = useAuth();
  const [checked, setChecked] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    if (!checked) {
    }

    const { error } = await signUp(data.email, data.password);

    if (error) {
      console.log("Erreur de connexion", error.message);
      return;
    }
    navigation.push("ProfileFormScreen");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../../assets/logo-app.png")} style={styles.img} />

      <Text style={styles.title}>Créer votre compte</Text>

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
            testID="email-input"
            style={styles.textinput}
            label="Adresse email"
            placeholder="Email"
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
          minLength: {
            value: 6,
            message: "Le mot de passe doit contenir au moins 6 caractères",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            testID="password-input"
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

      <Controller
        control={control}
        rules={{
          required: "Confirmation du mot de passe requise",
          validate: (value) =>
            value === getValues("password") ||
            "Les mots de passe ne correspondent pas",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            testID="password-confirm-input"
            style={styles.textinput}
            label="Confirmer mot de passe"
            placeholder="Confirmation mot de passe"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            error={!!errors.confirmPassword}
            mode="outlined"
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
      )}

      <View style={styles.checkboxContainer}>
        <Checkbox.Item
          testID="checkbox"
          status={checked ? "checked" : "unchecked"}
          onPress={() => setChecked(!checked)}
          label="J’ai lu et accepté les"
          color={theme.colors.primary}
          labelStyle={styles.textcondition}
          mode="android"
          position="leading"
        />

        <Text
          style={[
            styles.texttermes,
            { color: theme.colors.primary, textDecorationLine: "underline" },
          ]}
          onPress={() => {
            navigation.navigate("RgpdScreen");
          }}
        >
          termes et conditions
        </Text>
      </View>

      <CustomButton style={styles.button} onPress={handleSubmit(onSubmit)}>
        Créer un compte
      </CustomButton>

      <Text style={styles.textregister}>
        Vous avez déjà un compte ?{" "}
        <Text
          style={{
            textDecorationLine: "underline",
            color: theme.colors.primary,
            fontWeight: "600",
          }}
          onPress={() => navigation.replace("LoginScreen")}
        >
          Connectez-vous
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 25,
    fontSize: 32,
    fontWeight: "700",
  },
  textcondition: {
    textAlign: "right",
    color: "#79797F",
    fontStyle: "italic",
    fontWeight: "600",
    fontSize: 12,
  },
  texttermes: {
    marginLeft: -12,
    fontStyle: "italic",
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
    width: "80%",
    height: 200,
    marginBottom: 25,
  },
  textinput: {
    marginBottom: 25,
    width: "80%",
    alignSelf: "center",
  },
  button: {
    marginBottom: 25,
    width: "80%",
    alignSelf: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    flexWrap: "wrap",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
});
