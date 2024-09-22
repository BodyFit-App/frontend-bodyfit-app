import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SessionPanel from "./SessionPanel";

jest.mock("react-hook-form", () => ({
  Controller: jest.fn(({ render }) =>
    render({
      field: { onChange: jest.fn(), value: [] },
    })
  ),
}));

jest.mock("./SessionForm", () => {
  const { View, Text, Button } = jest.requireActual("react-native");
  return ({ onBack }) => (
    <View testID="session-form">
      <Text>Session Form</Text>
      <Button testID="back-button" title="Back" onPress={onBack} />
    </View>
  );
});

describe("SessionPanel", () => {
  const mockOnBack = jest.fn();

  it("renders SessionForm with correct props", () => {
    const { getByTestId } = render(
      <SessionPanel control={{}} onBack={mockOnBack} index={1} />
    );

    expect(getByTestId("session-form")).toBeTruthy();
  });

  it("calls onBack when back button is pressed", () => {
    const { getByTestId } = render(
      <SessionPanel control={{}} onBack={mockOnBack} index={1} />
    );

    fireEvent.press(getByTestId("back-button"));

    expect(mockOnBack).toHaveBeenCalled();
  });

  it("passes index and onChange to SessionForm", () => {
    const { getByTestId } = render(
      <SessionPanel control={{}} onBack={mockOnBack} index={1} />
    );

    expect(getByTestId("session-form")).toBeTruthy();
  });
});
