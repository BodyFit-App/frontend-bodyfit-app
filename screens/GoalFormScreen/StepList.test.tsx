import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import StepList from "./StepList";

describe("StepList", () => {
  const mockOnChange = jest.fn();
  const stepsMock = [
    { title: "Step 1" },
    { title: "Step 2" },
    { title: "Step 3" },
  ];

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders steps correctly", () => {
    const { getByText } = render(
      <StepList steps={stepsMock} onChange={mockOnChange} />
    );

    expect(getByText("Step 1")).toBeTruthy();
    expect(getByText("Step 2")).toBeTruthy();
    expect(getByText("Step 3")).toBeTruthy();
  });

  it("deletes a step when delete button is pressed", () => {
    const { getByTestId } = render(
      <StepList steps={stepsMock} onChange={mockOnChange} />
    );

    fireEvent.press(getByTestId("delete-session-0"));

    expect(mockOnChange).toHaveBeenCalledWith([
      { title: "Step 2" },
      { title: "Step 3" },
    ]);
  });

  it("renders the correct number of delete buttons", () => {
    const { getByTestId } = render(
      <StepList steps={stepsMock} onChange={mockOnChange} />
    );

    const deleteButtons = [
      getByTestId("delete-session-0"),
      getByTestId("delete-session-1"),
      getByTestId("delete-session-2"),
    ];

    expect(deleteButtons.length).toBe(3);
  });

  it("calls onChange when a step is deleted", () => {
    const { getByTestId } = render(
      <StepList steps={stepsMock} onChange={mockOnChange} />
    );

    fireEvent.press(getByTestId("delete-session-1"));

    expect(mockOnChange).toHaveBeenCalledWith([
      { title: "Step 1" },
      { title: "Step 3" },
    ]);
  });
});
