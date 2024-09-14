import React, { useState } from "react";
import { View, Text } from "react-native";
import TextField from "../../components/TextField/TextField";
import CustomButton from "../../components/CustomButton/CustomButton";
import ExerciseDropdown from "../../components/ExerciseDropdown/ExerciseDropdown";
import theme from "../../theme";

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

      <CustomButton onPress={onBack}>Annuler</CustomButton>
    </View>
  );
};

export default SessionForm;
