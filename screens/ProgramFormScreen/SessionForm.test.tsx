import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SessionForm from "./SessionForm"; // Adjust the import path as needed

jest.mock("../../components/TextField/TextField", () => "TextField");
jest.mock("../../components/CustomButton/CustomButton", () => "CustomButton");
jest.mock(
  "../../components/ExerciseDropdown/ExerciseDropdown",
  () => "ExerciseDropdown"
);

describe("SessionForm Integration Test", () => {
  it("should handle form submission and validation", async () => {
    const mockOnChange = jest.fn();
    const mockOnBack = jest.fn();
    const initialProps = {
      value: [],
      onChange: mockOnChange,
      onBack: mockOnBack,
    };

    const { getByTestId, getByText } = render(
      <SessionForm {...initialProps} />
    );

    expect(getByTestId("title")).toBeTruthy();
    expect(getByTestId("description")).toBeTruthy();

    fireEvent.changeText(getByTestId("title"), "Running");
    fireEvent.changeText(getByTestId("description"), "Make sure to gear up");

    fireEvent.press(getByTestId("confirm"));

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith([
        {
          title: "Running",
          description: "Make sure to gear up",
          exerciseIds: [],
        },
      ]);
      expect(mockOnBack).toHaveBeenCalled();
    });

    fireEvent.changeText(getByTestId("title"), "");
    fireEvent.press(getByTestId("confirm"));

    expect(getByText("Ce champs est requis.")).toBeTruthy();

    fireEvent.press(getByTestId("cancel"));
    expect(mockOnBack).toHaveBeenCalled();
  });

  it("should handle edit mode correctly", async () => {
    const mockOnChange = jest.fn();
    const mockOnBack = jest.fn();
    const initialProps = {
      value: [
        {
          title: "Initial Title",
          description: "Initial Description",
          exerciseIds: [],
        },
      ],
      onChange: mockOnChange,
      onBack: mockOnBack,
      index: 0,
    };

    const { getByTestId, getByText } = render(
      <SessionForm {...initialProps} />
    );

    expect(getByTestId("title").props.value).toBe("Initial Title");
    expect(getByTestId("description").props.value).toBe("Initial Description");

    fireEvent.changeText(getByTestId("title"), "Updated Title");
    fireEvent.changeText(getByTestId("description"), "Updated Description");

    fireEvent.press(getByTestId("confirm"));

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith([
        {
          title: "Updated Title",
          description: "Updated Description",
          exerciseIds: [],
        },
      ]);
      expect(mockOnBack).toHaveBeenCalled();
    });
  });
});
