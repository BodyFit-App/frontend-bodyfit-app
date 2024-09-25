import React, { useState } from "react";
import { View, Text } from "react-native";
import TextField from "../../components/TextField/TextField";
import CustomButton from "../../components/CustomButton/CustomButton";
import theme from "../../theme";
import { TablesInsert } from "../../types/database.types";

/**
 * StepForm Component
 *
 * This component allows users to input a new step for a goal. It includes fields for the step title
 * and description. The form validates the title field and appends the new step to the provided list on submission.
 *
 * @component
 * @example
 * const handleStepsChange = (steps) => {
 *   console.log(steps);
 * };
 * return (
 *   <StepForm
 *     value={[]} // The initial array of steps
 *     onChange={handleStepsChange}
 *   />
 * );
 *
 * @param {Object} props - The properties of the component.
 * @param {Partial<TablesInsert<"steps">>[]} props.value - The array of steps.
 * @param {function} props.onChange - Function to update the list of steps when a new step is added.
 *
 * @returns {JSX.Element} The rendered StepForm component.
 */

type StepFormProps = {
  value: Partial<TablesInsert<"steps">>[];
  onChange: (value: Partial<TablesInsert<"steps">>[]) => void;
};

const StepForm = ({ value, onChange }: StepFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  return (
    <View style={{ gap: 16 }}>
      <View>
        <TextField
          testID="title"
          mode="outlined"
          label="Titre*"
          placeholder="Ex: Course à pied"
          onChangeText={setTitle}
          value={title}
        />
        {error && (
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: 12,
            }}
          >
            Ce champs est requis.
          </Text>
        )}
      </View>

      <TextField
        testID="description"
        mode="outlined"
        label="Description"
        placeholder="Ex: Pensez à bien vous équiper"
        onChangeText={setDescription}
        value={description || ""}
        multiline
        numberOfLines={10}
      />

      <CustomButton
        testID="confirm"
        onPress={() => {
          if (title === "" || title === undefined) {
            setError(true);
            return;
          }

          setError(false);
          onChange([...value, { title, description }]);
          setTitle("");
          setDescription("");
        }}
      >
        Ajouter
      </CustomButton>
    </View>
  );
};

export default StepForm;
