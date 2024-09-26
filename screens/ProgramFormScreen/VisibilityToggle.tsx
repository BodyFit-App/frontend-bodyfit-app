import React from "react";
import { View, Text } from "react-native";
import { Controller } from "react-hook-form";
import { Switch } from "react-native-paper";
import { VisibilityToggleProps } from "./types";
import theme from "../../theme";

/**
 * VisibilityToggle Component
 *
 * This component renders a toggle switch to control the visibility of a program. It uses `react-hook-form`
 * to manage the form state. The toggle switch indicates whether the program is shared publicly or not.
 *
 * @component
 * @example
 * return (
 *   <VisibilityToggle control={control} />
 * )
 *
 * @param {VisibilityToggleProps} props - The props object for the component.
 * @param {Control<FormData>} props.control - The control object from `react-hook-form` to manage form state.
 *
 * @returns {JSX.Element} - A form-controlled switch component for toggling visibility.
 */

const VisibilityToggle: React.FC<VisibilityToggleProps> = ({ control }) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: theme.colors.secondary, fontSize: 16 }}>
            Je souhaite partager ce programme
          </Text>
          <Switch
            testID="visibility-toggle"
            style={{ marginLeft: 16 }}
            onValueChange={onChange}
            value={value}
          />
        </View>
      )}
      name="visible"
    />
  );
};

export default VisibilityToggle;
