import React from "react";
import { render } from "@testing-library/react-native";
import { Provider as PaperProvider } from "react-native-paper";
import TextField from "./TextField"; // Adjust the path to your TextField component
import theme from "../../theme"; // Adjust the path to your theme

describe("TextField Component", () => {
  it("applies placeholder and other props", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <PaperProvider theme={theme}>
        <TextField placeholder="Enter text" testID="textInput" />
      </PaperProvider>
    );

    expect(getByPlaceholderText("Enter text")).toBeTruthy();
    expect(getByTestId("textInput")).toBeTruthy();
  });

  it("passes other props correctly", () => {
    const mockOnChangeText = jest.fn();
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <TextField
          placeholder="Test"
          onChangeText={mockOnChangeText}
          value="Sample text"
          testID="textInput"
        />
      </PaperProvider>
    );

    const input = getByTestId("textInput");

    expect(input.props.value).toBe("Sample text");

    input.props.onChangeText("New text");
    expect(mockOnChangeText).toHaveBeenCalledWith("New text");
  });
});
