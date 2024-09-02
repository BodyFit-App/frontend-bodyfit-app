import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

/**
 * Props pour le composant CustomTextField.
 *
 * @typedef {Object} CustomTextFieldProps
 * @property {string} label - Le label du champ de texte.
 * @property {string} value - La valeur actuelle du champ de texte.
 * @property {function(string): void} onChangeText - Fonction appelée lorsque le texte change.
 * @property {Object} [style] - Styles personnalisés pour le champ de texte.
 * @property {boolean} [secureTextEntry=false] - Si `true`, masque le texte saisi (utile pour les champs de mot de passe).
 **/

interface CustomTextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: object;
  secureTextEntry?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  value,
  onChangeText,
  style,
  secureTextEntry = false,
}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      mode="outlined"
      textColor="#ffffff"
      style={[styles.input, style]}
      theme={{
        colors: { text: "#2F80ED", placeholder: "#2F80ED", primary: "#2F80ED" },
      }}
      underlineColor="#2F80ED"
      outlineColor="#2F80ED"
      testID="custom-text-field"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#161626",
    color: "#2F80ED",
  },
});

export default CustomTextField;
