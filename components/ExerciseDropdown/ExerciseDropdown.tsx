import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MultiSelectDropdown } from "react-native-paper-dropdown";
import { fetchDropdownExercises } from "../../api/exercises";
import DropdownInput from "../DropdownInput/DropdownInput";

type Props = {
  value: number[];
  onChange: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function ExerciseDropdown({ value, onChange }: Props) {
  const { data } = useQuery({
    queryKey: ["dropdown-exercises"],
    queryFn: fetchDropdownExercises,
  });

  const options = data
    ? data.map((exercises) => ({
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
      value={value.map((numbers) => numbers.toString())}
      onSelect={(strings) => onChange(strings.map((s) => Number(s)))}
      mode="outlined"
    />
  );
}
