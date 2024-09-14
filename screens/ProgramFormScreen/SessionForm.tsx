import React, { useState } from "react";
import { View } from "react-native";
import TextField from "../../components/TextField/TextField";
import CustomButton from "../../components/CustomButton/CustomButton";
import ExerciseDropdown from "../../components/ExerciseDropdown/ExerciseDropdown";

type SessionFormProps = {
  value: Array<{
    title: string;
    description: string;
    exerciseIds: number[];
  }>;
  onChange: (
    value: Array<{
      title: string;
      description: string;
      exerciseIds: number[];
    }>
  ) => void;
  onBack: () => void;
  index?: number;
};

const SessionForm = ({ value, onChange, onBack, index }: SessionFormProps) => {
  console.log(index);
  const isEditMode = index !== undefined && value[index];

  const [title, setTitle] = useState(isEditMode ? value[index].title : "");
  const [description, setDescription] = useState(
    isEditMode ? value[index].description : ""
  );
  const [exerciseIds, setExerciseIds] = useState<number[]>(
    isEditMode ? value[index].exerciseIds : []
  );

  return (
    <View style={{ gap: 16 }}>
      <TextField
        mode="outlined"
        label="Titre"
        placeholder="Ex: Course à pied"
        onChangeText={setTitle}
        value={title}
      />

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
