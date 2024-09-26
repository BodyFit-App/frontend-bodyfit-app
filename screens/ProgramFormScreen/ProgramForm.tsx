import React from "react";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import TextField from "../../components/TextField/TextField";
import { ProgramFormProps } from "./types";

/**
 * ProgramForm Component
 *
 * A form for creating or editing a program, including input fields for the title and description.
 * This component is designed to work with React Hook Form's `Controller` to manage form state and validation.
 *
 * @component
 * @example
 * return (
 *   <ProgramForm control={control} />
 * );
 *
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.control - The control object provided by `react-hook-form` to manage form state.
 *
 * @returns {JSX.Element} The ProgramForm component.
 */

const ProgramForm = ({ control }: ProgramFormProps) => {
  return (
    <View style={{ gap: 16 }}>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            testID="title"
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
            testID="description"
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
