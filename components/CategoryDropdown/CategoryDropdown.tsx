import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MultiSelectDropdown } from "react-native-paper-dropdown";
import { fetchCategories } from "../../api/categories";

export default function CategoryDropdown({ value, onChange }: any) {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const options = data
    ? data.map(({ id, name }) => ({ label: name, value: id.toString() }))
    : [];

  return (
    <MultiSelectDropdown
      label="Catégories"
      placeholder="Sélectionner vos catégories"
      disabled={!data}
      options={options}
      value={value}
      onSelect={onChange}
      mode="outlined"
    />
  );
}
