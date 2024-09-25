import React from "react";
import { StyleSheet } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { DatePickerInputProps } from "react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared";
import theme from "../../theme";

/**
 * `CustomDatePicker` component that wraps the `DatePickerInput` from `react-native-paper-dates`,
 * applying custom styles and theme configurations while allowing default props to be passed through.
 *
 * @param {DatePickerInputProps} props - The props for the `DatePickerInput` component from `react-native-paper-dates`.
 * @param {React.ReactNode} [children] - Optional content passed as children (not used here).
 * @param {string} [testID="date-picker"] - Optional test ID for testing purposes, default is "date-picker".
 * @param {Object} [style={}] - Optional custom style to be applied to the date picker input.
 * @returns {JSX.Element} The customized date picker input.
 */

export default function CustomDatePicker({
  children,
  testID = "date-picker",
  style = {},
  ...props
}: DatePickerInputProps) {
  return (
    <DatePickerInput
      testID="date-picker"
      mode="outlined"
      style={styles.datePickerInput}
      iconColor="#2F80ED"
      outlineColor={theme.colors.primary}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  datePickerInput: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: theme.colors.backgroundButton,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
  },
});
