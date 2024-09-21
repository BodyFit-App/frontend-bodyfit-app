import React from "react";
import { render } from "@testing-library/react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { IconButton } from "react-native-paper";
import DropdownInput from "./DropdownInput";

// Mock the TextInput component
jest.mock("react-native-paper", () => {
  const actualPaper = jest.requireActual("react-native-paper");
  return {
    ...actualPaper,
    TextInput: jest.fn(
      ({ placeholder, label, value, editable, disabled, error, mode }) => (
        <input
          placeholder={placeholder}
          aria-label={label}
          value={value}
          disabled={disabled}
          style={{ borderColor: error ? "red" : "black" }}
        />
      )
    ),
    IconButton: jest.fn(({ icon }) => <button>{icon}</button>),
  };
});

// Mock theme
jest.mock("../../theme", () => ({
  colors: {
    primary: "#6200ee",
  },
}));

describe("DropdownInput", () => {
  const mockProps = {
    placeholder: "Select an option",
    label: "Dropdown",
    selectedLabel: "Option 1",
    rightIcon: <IconButton icon="chevron-down" />,
    mode: "outlined",
    disabled: false,
    error: false,
  };

  it("passes the correct props to TextInput", () => {
    render(
      <PaperProvider>
        <DropdownInput {...mockProps} />
      </PaperProvider>
    );

    const textInput = jest.mocked(require("react-native-paper").TextInput);

    expect(textInput).toHaveBeenCalledWith(
      expect.objectContaining({
        placeholder: mockProps.placeholder,
        value: mockProps.selectedLabel,
        editable: false,
        disabled: mockProps.disabled,
        error: mockProps.error,
        mode: mockProps.mode,
      }),
      {}
    );
  });
});
