import React, { SetStateAction } from "react";
import { View, Text } from "react-native";
import { IconButton, TouchableRipple } from "react-native-paper";
import theme from "../../theme";
import { TablesInsert } from "../../types/database.types";

/**
 * StepList Component
 *
 * This component renders a list of steps and allows users to delete a step from the list. Each step
 * displays its title and includes a delete button.
 *
 * @component
 * @example
 * const handleStepsChange = (steps) => {
 *   console.log(steps);
 * };
 * return (
 *   <StepList
 *     steps={[{ title: "Step 1" }, { title: "Step 2" }]}
 *     onChange={handleStepsChange}
 *   />
 * );
 *
 * @param {Object} props - The properties of the component.
 * @param {Partial<TablesInsert<"steps">>[]} props.steps - The array of steps to be displayed.
 * @param {function} props.onChange - Function to update the list of steps when a step is deleted.
 *
 * @returns {JSX.Element} The rendered StepList component.
 */

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
