import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

/**  Ce composant est un bouton personnalisable basé sur `React Native Paper` qui prend en charge trois types de styles différents :
 * - `default`: Bouton par défaut avec un fond sombre et du texte bleu.
 * - `highlighted`: Bouton en surbrillance avec un fond bleu et du texte sombre.
 * - `disabled`: Bouton désactivé avec un fond gris et du texte gris clair.
 *
 * @param {string} title - Le texte qui apparaîtra sur le bouton.
 * @param {() => void} onPress - Fonction à exécuter lorsque le bouton est pressé.
 * @param {'default' | 'highlighted' | 'disabled'} [buttonType='default'] - Type du bouton, qui détermine son style. Par défaut, il est 'default'.
 * @param {boolean} [disabled=false] - Si vrai, désactive le bouton. Notez que le type 'disabled' est automatiquement appliqué si ce paramètre est vrai.
 * @param {object} [style={}] - Style personnalisé supplémentaire pour le bouton.
 **/

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  buttonType?: "default" | "highlighted" | "disabled";
  disabled?: boolean;
  style?: object;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  buttonType = "default",
  disabled = false,
  style = {},
}) => {
  const getButtonStyle = () => {
    switch (buttonType) {
      case "highlighted":
        return styles.highlightedButton;
      case "disabled":
        return styles.disabledButton;
      default:
        return styles.defaultButton;
    }
  };

  const getLabelStyle = () => {
    switch (buttonType) {
      case "highlighted":
        return styles.highlightedLabel;
      case "disabled":
        return styles.disabledLabel;
      default:
        return styles.defaultLabel;
    }
  };
  

  return (
    <Button
      mode="contained"
      onPress={onPress}
      disabled={disabled || buttonType === "disabled"}
      contentStyle={[style]}
      style={[styles.button, getButtonStyle()]}
      labelStyle={getLabelStyle()}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  defaultButton: {
    backgroundColor: "#161626",
    borderColor: "#42424D",
  },
  defaultLabel: {
    color: "#2F80ED",
  },
  highlightedButton: {
    backgroundColor: "#2F80ED",
    borderColor: "#42424D",
  },
  highlightedLabel: {
    color: "#161626",
  },
  disabledButton: {
    backgroundColor: "#3D3B3B",
    borderColor: "#42424D",
  },
  disabledLabel: {
    color: "#585858",
  },
});

export default CustomButton;
