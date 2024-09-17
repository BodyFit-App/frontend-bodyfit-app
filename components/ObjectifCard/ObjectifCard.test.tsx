import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ObjectifCard from "./ObjectifCard";

describe("ObjectifCard", () => {
  const defaultProps = {
    title: "Perte de poids",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    description: "Objectif de perte de poids pour l'année 2024.",
    progress: 0.4,
    onPress: jest.fn(),
  };

  it("renders correctly with given props", () => {
    const { getByText } = render(<ObjectifCard {...defaultProps} />);

    expect(getByText("Perte de poids")).toBeTruthy();
    expect(getByText("40%")).toBeTruthy();
    expect(getByText("Du 01/01/2024 au 31/12/2024")).toBeTruthy();
    expect(getByText("Objectif de perte de poids pour l'année 2024.")).toBeTruthy();
  });

  it("truncates description if it exceeds 100 characters", () => {
    const longDescription = "a".repeat(101);
    const { getByText } = render(
      <ObjectifCard {...defaultProps} description={longDescription} />
    );

    expect(getByText(`${longDescription.substring(0, 100)}...`)).toBeTruthy();
  });

  it("calls onPress when the card is pressed", () => {
    const { getByTestId } = render(<ObjectifCard {...defaultProps} />);

    fireEvent.press(getByTestId("objectif-card"));
    expect(defaultProps.onPress).toHaveBeenCalled();
  });

  it("renders default values for optional props", () => {
    const { getByText } = render(
      <ObjectifCard title="Test" progress={0.5} />
    );

    const today = new Date().toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    expect(getByText(`Du ${today} au ${today}`)).toBeTruthy();
    expect(getByText("Sans description")).toBeTruthy();
  });
});