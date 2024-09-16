import React from "react";
import { TextInput } from "react-native-paper";
import theme from "../../theme";

interface DropdownInputProps {
  placeholder?: string;
  label?: string;
  selectedLabel?: string;
  rightIcon?: JSX.Element;
  mode?: "outlined" | "flat" | undefined;
  disabled?: boolean;
  error?: boolean;
}

export default function DropdownInput({
  placeholder = "Sélectionnez une option",
  label = "Label",
  selectedLabel = "",
  rightIcon,
  mode = "outlined",
  disabled = false,
  error = false,
}: DropdownInputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      label={label}
      value={selectedLabel}
      right={rightIcon}
      mode={mode} 
      editable={false} 
      disabled={disabled}
      error={error}
      outlineColor={theme.colors.primary}
      testID="dropdown-input"
    />
  );
}
