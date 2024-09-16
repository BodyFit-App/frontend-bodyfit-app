import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import StepForm from "./StepForm";

jest.useFakeTimers();

describe("StepForm", () => {
  const mockOnChange = jest.fn();

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("renders the StepForm correctly", () => {
    const { getByTestId } = render(
      <StepForm value={[]} onChange={mockOnChange} />
    );

    expect(getByTestId("title")).toBeTruthy();
    expect(getByTestId("description")).toBeTruthy();
    expect(getByTestId("confirm")).toBeTruthy();
  });

  it("shows error when title is empty", () => {
    const { getByTestId, getByText } = render(
      <StepForm value={[]} onChange={mockOnChange} />
    );

    fireEvent.press(getByTestId("confirm"));

    expect(getByText("Ce champs est requis.")).toBeTruthy();
  });

  it("calls onChange when title is filled and button is pressed", () => {
    const { getByTestId } = render(
      <StepForm value={[]} onChange={mockOnChange} />
    );

    fireEvent.changeText(getByTestId("title"), "New Step Title");
    fireEvent.press(getByTestId("confirm"));

    expect(mockOnChange).toHaveBeenCalledWith([
      { title: "New Step Title", description: "" },
    ]);
  });

  it("clears the input fields after submission", () => {
    const { getByTestId } = render(
      <StepForm value={[]} onChange={mockOnChange} />
    );

    fireEvent.changeText(getByTestId("title"), "New Step Title");
    fireEvent.press(getByTestId("confirm"));

    expect(getByTestId("title").props.value).toBe("");
    expect(getByTestId("description").props.value).toBe("");
  });
});
