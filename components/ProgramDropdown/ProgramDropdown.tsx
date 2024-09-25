import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Dropdown } from "react-native-paper-dropdown";
import DropdownInput from "../DropdownInput/DropdownInput";
import { fetchDropdownPrograms } from "../../api/programs";

/**
 * ProgramDropdown component renders a dropdown menu that allows users to select a program
 * from a list of available programs fetched from the server. The selected value is passed
 * back via the `onChange` callback.
 *
 * @component
 * @example
 * const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
 *
 * return (
 *   <ProgramDropdown
 *     value={selectedProgram}
 *     onChange={setSelectedProgram}
 *   />
 * );
 *
 * @param {Object} props - The props for the component.
 * @param {number | null} props.value - The currently selected program's ID, or null if none is selected.
 * @param {React.Dispatch<React.SetStateAction<number | null>>} props.onChange - Callback function triggered when the user selects a program.
 *
 * @returns {JSX.Element} The ProgramDropdown component.
 */

type Props = {
  value: number | null;
  onChange: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function ProgramDropdown({ value, onChange }: Props) {
  const { data } = useQuery({
    queryKey: ["dropdown-programs"],
    queryFn: fetchDropdownPrograms,
  });

  const options = data
    ? data.map((programs) => ({
        label: programs!.title,
        value: programs!.id.toString(),
      }))
    : [];

  return (
    <Dropdown
      CustomDropdownInput={DropdownInput}
      label="Programme"
      placeholder="Sélectionner un programme"
      disabled={!data}
      options={options}
      value={value ? value.toString() : undefined}
      onSelect={(string) => onChange(string ? Number(string) : null)}
      mode="outlined"
    />
  );
}
