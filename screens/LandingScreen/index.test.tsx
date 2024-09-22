import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LandingScreen from ".";

describe("LandingScreen", () => {
  const mockNavigation = { push: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the logo and buttons", () => {
    const { getByTestId, getByText } = render(
      <LandingScreen navigation={mockNavigation} />
    );

    // Check if the logo is rendered
    expect(getByTestId("logo-image")).toBeTruthy();

    // Check if buttons are rendered
    expect(getByText("Connexion")).toBeTruthy();
    expect(getByText("Inscription")).toBeTruthy();
  });

  it("navigates to LoginScreen when 'Connexion' button is pressed", () => {
    const { getByTestId } = render(
      <LandingScreen navigation={mockNavigation} />
    );

    // Press the "Connexion" button
    fireEvent.press(getByTestId("login-button"));

    // Check if navigation to LoginScreen is called
    expect(mockNavigation.push).toHaveBeenCalledWith("LoginScreen");
  });

  it("navigates to RegisterScreen when 'Inscription' button is pressed", () => {
    const { getByTestId } = render(
      <LandingScreen navigation={mockNavigation} />
    );

    // Press the "Inscription" button
    fireEvent.press(getByTestId("register-button"));

    // Check if navigation to RegisterScreen is called
    expect(mockNavigation.push).toHaveBeenCalledWith("RegisterScreen");
  });
});
