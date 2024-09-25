import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MultiSelectDropdown } from "react-native-paper-dropdown";
import { fetchCategories } from "../../api/categories";
import DropdownInput from "../DropdownInput/DropdownInput";

/**
 * CategoryDropdown component renders a multi-select dropdown for categories.
 *
 * @param {Object} props - The component props.
 * @param {Array<string>} props.value - The selected category values.
 * @param {Function} props.onChange - Callback function when the selection changes.
 * @returns {JSX.Element} The rendered component.
 */

export default function CategoryDropdown({ value, onChange }: any) {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  /**
   * Formatted options for the dropdown.
   * @type {Array<{ label: string, value: string }>}
   */

  const options = data
    ? data.map(({ id, name }) => ({ label: name, value: id.toString() }))
    : [];

  return (
    <MultiSelectDropdown
      CustomMultiSelectDropdownInput={DropdownInput}
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
