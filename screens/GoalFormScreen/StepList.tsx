import React, { SetStateAction } from "react";
import { View, Text } from "react-native";
import { IconButton, TouchableRipple } from "react-native-paper";
import theme from "../../theme";
import { TablesInsert } from "../../types/database.types";

export type StepListProps = {
  steps: Partial<TablesInsert<"steps">>[];
  onChange: (value: Partial<TablesInsert<"steps">>[]) => void;
};

const StepList = ({ steps, onChange }: StepListProps) => {
  const onDelete = (i: number) => {
    onChange(
      steps.filter((_: any, indexToDelete: number) => indexToDelete !== i)
    );
  };

  return (
    <View style={{ gap: 16 }}>
      {steps.map(({ title }, i) => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: theme.colors.backgroundButton,
          }}
          key={i}
        >
          <TouchableRipple
            testID={`add-session-${i}`}
            style={{ flex: 1, padding: 16 }}
            onPress={() => {}}
          >
            <Text style={{ color: theme.colors.text }}>{title}</Text>
          </TouchableRipple>
          <IconButton
            testID={`delete-session-${i}`}
            onPress={() => onDelete(i)}
            icon="delete"
          />
        </View>
      ))}
    </View>
  );
};

export default StepList;
