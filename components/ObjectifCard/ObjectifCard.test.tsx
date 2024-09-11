import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ObjectifCard from "./ObjectifCard"; // Ajustez selon votre chemin d'importation

describe("ObjectifCard", () => {
  const mockProps = {
    title: "Perte de poids",
    startDate: "01/01/2024",
    endDate: "31/12/2024",
    description: "Objectif de perte de poids pour l'année 2024.",
    progress: 0.4,
    onPress: jest.fn(),
  };

  it("renders the basic information correctly", () => {
    const { getByText } = render(<ObjectifCard {...mockProps} />);

    expect(getByText("Perte de poids")).toBeTruthy();
    expect(getByText("Du 01/01/2024 au 31/12/2024")).toBeTruthy();
    expect(
      getByText("Objectif de perte de poids pour l'année 2024.")
    ).toBeTruthy();
    expect(getByText("40%")).toBeTruthy();
  });

  it("truncates description longer than 100 characters", () => {
    const longDescription =
      "Ceci est une description très longue pour vérifier que le texte est bien tronqué après 100 caractères. La suite ne doit pas être affichée.";
    const { getByText } = render(
      <ObjectifCard {...mockProps} description={longDescription} />
    );

    expect(
      getByText(
        "Ceci est une description très longue pour vérifier que le texte est bien tronqué après 100 caractère..."
      )
    ).toBeTruthy();
  });

  it("calls onPress when the card is pressed", () => {
    const { getByTestId } = render(<ObjectifCard {...mockProps} />);

    fireEvent.press(getByTestId("objectif-card"));

    expect(mockProps.onPress).toHaveBeenCalled();
  });

  it("renders the correct progress percentage", () => {
    const { getByText } = render(<ObjectifCard {...mockProps} />);

    expect(getByText("40%")).toBeTruthy();
  });
});
