import React from "react";
import { TextInput } from "react-native-paper";
import { DropdownInputProps } from "react-native-paper-dropdown";
import theme from "../../theme";

/**
 * DropdownInput is a helper component used to format the input display for dropdown components.
 * It should not be used directly as a standalone input component.
 * This component is designed to work as part of a custom dropdown selection UI and is used
 * by other components to present the selected value in a consistent input format.
 *
 * @param {string} placeholder - The placeholder text displayed when no value is selected.
 * @param {string} label - The label for the input field.
 * @param {string} selectedLabel - The label of the currently selected option.
 * @param {JSX.Element} rightIcon - The icon displayed on the right side of the input.
 * @param {string} mode - The mode of the text input (e.g., outlined, flat).
 * @param {boolean} disabled - Whether the input is disabled.
 * @param {boolean} error - Whether the input is in an error state.
 *
 * @returns {JSX.Element} The formatted TextInput component for dropdown usage.
 */

export default function DropdownInput({
  placeholder,
  label,
  selectedLabel,
  rightIcon,
  mode,
  disabled,
  error,
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
    />
  );
}
