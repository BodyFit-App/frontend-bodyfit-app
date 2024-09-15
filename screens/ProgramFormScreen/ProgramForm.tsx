import React from "react";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import TextField from "../../components/TextField/TextField";
import { ProgramFormProps } from "./types";

const ProgramForm: React.FC<ProgramFormProps> = ({ control }) => {
  return (
    <View style={{ gap: 16 }}>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Titre"
            placeholder="Ex: Course à pied"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="title"
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Description"
            placeholder="Ex: Pensez à bien vous équiper"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline
            numberOfLines={10}
          />
        )}
        name="description"
      />
    </View>
  );
};

export default ProgramForm;
