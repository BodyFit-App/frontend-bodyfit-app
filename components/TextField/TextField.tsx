import React from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import theme from "../../theme";

export default function TextField({
    children,

    style = {},
    ...props
  }: TextInputProps) {

  return (
    <TextInput
      placeholderTextColor= {theme.colors.textPlaceholder}
      outlineColor={theme.colors.primary}
      style={{
        width: "100%",
        backgroundColor: theme.colors.backgroundButton,
        ...(style as object),
      }}
      {...props}
    />
   
  );
}