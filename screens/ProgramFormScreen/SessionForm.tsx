import React, { useState } from "react";
import { View, Text } from "react-native";
import TextField from "../../components/TextField/TextField";
import CustomButton from "../../components/CustomButton/CustomButton";
import ExerciseDropdown from "../../components/ExerciseDropdown/ExerciseDropdown";
import theme from "../../theme";

/**
 * SessionForm Component
 *
 * A form component used to add or edit a session. It allows users to input session details like title, description, and associated exercises.
 * The form validates that the title is required and updates the session information in the parent state.
 *
 * @component
 * @example
 * // Example usage
 * return (
 *   <SessionForm
 *     value={sessions}
 *     onChange={handleSessionsChange}
 *     onBack={handleBack}
 *     index={selectedSessionIndex}
 *   />
 * );
 *
 * @param {Object} props - The props for the SessionForm component.
 * @param {Array<Object>} props.value - Array of session objects. Each session contains title, description, and associated exercise IDs.
 * @param {Function} props.onChange - Callback function triggered when the form is submitted to update the sessions.
 * @param {Function} props.onBack - Callback function to handle when the user wants to cancel or go back.
 * @param {number} [props.index] - The index of the session being edited. If undefined, the form is in create mode.
 *
 * @returns {JSX.Element} The SessionForm component.
 */

type SessionFormProps = {
  value: Array<{
    id?: number;
    title: string;
    description: string;
    exerciseIds: number[];
  }>;
  onChange: (
    value: Array<{
      id?: number;
      title: string;
      description: string;
      exerciseIds: number[];
    }>
  ) => void;
  onBack: () => void;
  index?: number;
};

const SessionForm = ({ value, onChange, onBack, index }: SessionFormProps) => {
  const isEditMode = index !== undefined && value[index];

  const [title, setTitle] = useState(isEditMode ? value[index].title : "");
  const [description, setDescription] = useState(
    isEditMode ? value[index].description : ""
  );
  const [error, setError] = useState(false);

  const [exerciseIds, setExerciseIds] = useState<number[]>(
    isEditMode ? value[index].exerciseIds : []
  );

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
        value={description}
        multiline
        numberOfLines={10}
      />

      <ExerciseDropdown value={exerciseIds} onChange={setExerciseIds} />

      <CustomButton
        testID="confirm"
        onPress={() => {
          if (title === "" || title === undefined) {
            setError(true);
            return;
          }
          setError(false);
          const newValue = isEditMode
            ? value.map((item, idx) =>
                idx === index
                  ? { ...item, title, description, exerciseIds }
                  : item
              )
            : [...value, { title, description, exerciseIds }];
          onChange(newValue);
          onBack();
        }}
      >
        {isEditMode ? "Modifier" : "Ajouter"}
      </CustomButton>

      <CustomButton testID="cancel" onPress={onBack}>
        Annuler
      </CustomButton>
    </View>
  );
};

export default SessionForm;
