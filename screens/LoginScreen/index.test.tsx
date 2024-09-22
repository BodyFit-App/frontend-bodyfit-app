import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { LoginScreen } from ".";
import { useAuth } from "../../hooks/useAuth";

jest.mock("../../hooks/useAuth");

describe("LoginScreen", () => {
  const mockNavigation = { replace: jest.fn() };
  const mockSignIn = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
    });
    jest.clearAllMocks();
  });

  it("renders the login screen elements correctly", () => {
    const { getByTestId } = render(<LoginScreen navigation={mockNavigation} />);

    expect(getByTestId("logo-image")).toBeTruthy();
    expect(getByTestId("welcome-title").props.children).toBe("Bienvenue!");
    expect(getByTestId("login-subtitle").props.children).toBe(
      "Connectez-vous à votre compte"
    );
  });

  it("shows validation error when email is invalid", async () => {
    const { getByTestId, getByText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    fireEvent.changeText(getByTestId("email-input"), "invalid-email");
    fireEvent.changeText(getByTestId("password-input"), "password123");
    fireEvent.press(getByTestId("submit-button"));

    await waitFor(() => {
      expect(getByTestId("email-error").props.children).toBe(
        "Adresse email invalide"
      );
    });
  });

  it("calls signIn when the form is valid", async () => {
    mockSignIn.mockResolvedValue({ error: null });

    const { getByTestId } = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");
    fireEvent.press(getByTestId("submit-button"));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });
  });

  it("navigates to the RegisterScreen when the link is pressed", () => {
    const { getByTestId } = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.press(getByTestId("register-link"));

    expect(mockNavigation.replace).toHaveBeenCalledWith("RegisterScreen");
  });
});
