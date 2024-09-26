import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MultiSelectDropdown } from "react-native-paper-dropdown";
import { fetchDropdownExercises } from "../../api/exercises";
import DropdownInput from "../DropdownInput/DropdownInput";

/**
 * `ExerciseDropdown` component renders a multi-select dropdown for exercises.
 * It fetches exercise data and allows users to select multiple exercises by title.
 *
 * @param {Props} props - The props for the `ExerciseDropdown` component.
 * @param {number[]} props.value - The selected exercise IDs as an array of numbers.
 * @param {Function} props.onChange - Callback function when the selection changes, receiving an array of exercise IDs.
 * @returns {JSX.Element} The multi-select dropdown for selecting exercises.
 */

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
      testID="dropdown"
      placeholder="Sélectionner vos exercices"
      disabled={!data}
      options={options}
      value={value.map((numbers) => numbers.toString())}
      onSelect={(strings) => onChange(strings.map((s) => Number(s)))}
      mode="outlined"
    />
  );
}
