import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { RegisterScreen } from "./";
import { useAuth } from "../../hooks/useAuth";

jest.mock("../../hooks/useAuth");

describe("RegisterScreen", () => {
  const mockNavigation = { push: jest.fn(), replace: jest.fn() };
  const mockSignUp = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      signUp: mockSignUp,
    });
    jest.clearAllMocks();
  });

  it("renders all elements correctly", () => {
    const { getByText, getByTestId } = render(
      <RegisterScreen navigation={mockNavigation} />
    );

    expect(getByTestId("email-input")).toBeTruthy();
    expect(getByTestId("password-input")).toBeTruthy();
    expect(getByTestId("password-confirm-input")).toBeTruthy();
    expect(getByTestId("checkbox")).toBeTruthy();
    expect(getByText("Créer un compte")).toBeTruthy();
    expect(getByText("Connectez-vous")).toBeTruthy();
  });

  it("shows validation error when email is missing", async () => {
    const { getByText, getByTestId } = render(
      <RegisterScreen navigation={mockNavigation} />
    );

    fireEvent.changeText(getByTestId("password-input"), "password123");
    fireEvent.changeText(getByTestId("password-confirm-input"), "password123");
    fireEvent.press(getByText("Créer un compte"));

    await waitFor(() => {
      expect(getByText("Adresse email requise")).toBeTruthy();
    });
  });

  it("shows validation error when passwords don't match", async () => {
    const { getByText, getByTestId } = render(
      <RegisterScreen navigation={mockNavigation} />
    );

    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");
    fireEvent.changeText(
      getByTestId("password-confirm-input"),
      "differentPassword"
    );
    fireEvent.press(getByText("Créer un compte"));

    await waitFor(() => {
      expect(getByText("Les mots de passe ne correspondent pas")).toBeTruthy();
    });
  });

  it("handles checkbox toggle", () => {
    const { getByTestId, getByRole } = render(
      <RegisterScreen navigation={mockNavigation} />
    );

    const checkbox = getByTestId("checkbox");

    expect(getByRole("checkbox", { checked: false })).toBeTruthy();

    fireEvent.press(checkbox);

    expect(getByRole("checkbox", { checked: true })).toBeTruthy();
  });

  it("calls signUp when form is valid", async () => {
    mockSignUp.mockResolvedValue({ error: null });

    const { getByText, getByTestId } = render(
      <RegisterScreen navigation={mockNavigation} />
    );

    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");
    fireEvent.changeText(getByTestId("password-confirm-input"), "password123");

    fireEvent.press(getByTestId("checkbox"));

    fireEvent.press(getByText("Créer un compte"));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });
  });

  it("does not call signUp if terms are not accepted", async () => {
    mockSignUp.mockResolvedValue({ error: null });

    const { getByText, getByTestId } = render(
      <RegisterScreen navigation={mockNavigation} />
    );

    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");
    fireEvent.changeText(getByTestId("password-confirm-input"), "password123");

    fireEvent.press(getByText("Créer un compte"));

    await waitFor(() => {
      expect(mockSignUp).not.toHaveBeenCalled();
    });
  });

  it("navigates to LoginScreen when 'Connectez-vous' is pressed", () => {
    const { getByText } = render(
      <RegisterScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByText("Connectez-vous"));

    expect(mockNavigation.replace).toHaveBeenCalledWith("LoginScreen");
  });
});
