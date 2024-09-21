import React from "react";
import fs from "fs";
import path from "path";
import { render, fireEvent } from "@testing-library/react-native";
import TrainingHeader from "./TrainingHeader";

const snapshotFile = path.join(
  __dirname,
  "__snapshots__",
  "TrainingHeader.test.tsx.snap"
);

describe("TrainingHeader Component", () => {
  const mockToggleFavorite = jest.fn();

  const defaultProps = {
    title: "Entraînement de test",
    imageUrl: "https://example.com/test-image.jpg",
    duration: "40",
    categories: ["Cardio", "Force"],
    isFavorite: false,
    onToggleFavorite: mockToggleFavorite,
  };

  afterEach(() => {
    if (fs.existsSync(snapshotFile)) {
      fs.unlinkSync(snapshotFile);
    }
  });

  it("renders training information correctly", () => {
    const { getByText, getByTestId } = render(
      <TrainingHeader {...defaultProps} />
    );

    expect(getByText("Entraînement de test")).toBeTruthy();
    expect(getByText("40 min")).toBeTruthy();
    expect(getByText("Cardio")).toBeTruthy();
    expect(getByText("Force")).toBeTruthy();

    const image = getByTestId("training-image");
    expect(image.props.source.uri).toBe("https://example.com/test-image.jpg");
  });

  it("calls onToggleFavorite when favorite button is pressed", () => {
    const { getByTestId } = render(
      <TrainingHeader {...defaultProps} isFavorite={true} />
    );

    const favoriteButton = getByTestId("favorite-button");
    fireEvent.press(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalled();
  });

  it("renders the correct icon when isFavorite is true or false", () => {
    const { toJSON, rerender } = render(
      <TrainingHeader {...defaultProps} isFavorite={true} />
    );

    const favoriteIconOutput = toJSON();
    expect(favoriteIconOutput).toMatchSnapshot();

    rerender(<TrainingHeader {...defaultProps} isFavorite={false} />);

    const updatedFavoriteIconOutput = toJSON();
    expect(updatedFavoriteIconOutput).toMatchSnapshot();
  });
});
