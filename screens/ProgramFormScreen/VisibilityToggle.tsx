import React from "react";
import { View, Text } from "react-native";
import { Controller } from "react-hook-form";
import { Switch } from "react-native-paper";
import { VisibilityToggleProps } from "./types";
import theme from "../../theme";

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
