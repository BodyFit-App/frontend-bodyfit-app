import React from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import theme from "../../theme";

/**
 * TextField Component
 *
 * This component renders a styled text input field using `react-native-paper`'s `TextInput`.
 * It supports all the props from the `TextInput` component and allows for custom styles
 * while applying default theming for colors and placeholder text.
 *
 * @component
 * @example
 * // Example usage of the TextField component
 * return (
 *   <TextField
 *     label="Username"
 *     value={username}
 *     onChangeText={setUsername}
 *   />
 * );
 *
 * @param {TextInputProps} props - The props for the `TextInput` component from `react-native-paper`.
 * @param {React.ReactNode} [children] - Optional children (not used in this component).
 * @param {Object} [style={}] - Optional custom styles to apply to the text input.
 *
 * @returns {JSX.Element} A styled text input field.
 */

export default function TextField({
  children,
  style = {},
  ...props
}: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={theme.colors.textPlaceholder}
      outlineColor={theme.colors.primary}
      testID="textInput"
      style={{
        width: "100%",
        backgroundColor: theme.colors.backgroundButton,
        ...(style as object),
      }}
      {...props}
    />
  );
}
