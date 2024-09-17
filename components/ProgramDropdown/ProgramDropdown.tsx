import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Dropdown } from "react-native-paper-dropdown";
import DropdownInput from "../DropdownInput/DropdownInput";
import { fetchDropdownPrograms } from "../../api/programs";

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
