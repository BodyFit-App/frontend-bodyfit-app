import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MultiSelectDropdown } from "react-native-paper-dropdown";
import { fetchDropdownExercises } from "../../api/favorites";
import theme from "../../theme";
import { Icon, TextInput } from "react-native-paper";
import DropdownInput from "../DropdownInput/DropdownInput";

export default function ExerciseDropdown({ value, onChange }: any) {
  const { data } = useQuery({
    queryKey: ["dropdown-exercises"],
    queryFn: fetchDropdownExercises,
  });

  const options = data
    ? data.map(({ exercises }) => ({
        label: exercises!.title,
        value: exercises!.id.toString(),
      }))
    : [];

  return (
    <MultiSelectDropdown
      CustomMultiSelectDropdownInput={DropdownInput}
      label="Exercices"
      placeholder="Sélectionner vos catégories"
      disabled={!data}
      options={options}
      value={value}
      onSelect={onChange}
      mode="outlined"
    />
  );
}
