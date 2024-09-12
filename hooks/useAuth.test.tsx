import { render, fireEvent, waitFor } from "@testing-library/react-native";
import React from "react";
import { useAuth } from "./useAuth";
import { client } from "../lib/supabase";
import { Button, Text } from "react-native";

jest.mock("../lib/supabase", () => ({
  client: {
    auth: {
      getSession: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
    },
  },
}));

describe("useAuth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should sign in successfully", async () => {
    const mockSession = { user: { id: "user123" } };
    (client.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: { session: mockSession },
      error: null,
    });
    (client.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: mockSession },
    });

    const TestComponent = () => {
      const { session, signIn, loading } = useAuth();

      const handleSignIn = async () => {
        await signIn("test@example.com", "password123");
      };

      return (
        <>
          <Button title="Sign In" onPress={handleSignIn} />
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <Text>{session ? "Signed In" : "Not Signed In"}</Text>
          )}
        </>
      );
    };

    const { getByText, findByText } = render(<TestComponent />);

    expect(getByText(/Loading.../)).toBeTruthy();

    fireEvent.press(getByText(/Sign In/));

    expect(await findByText(/Signed In/)).toBeTruthy();
  });

  it("should handle sign-in error", async () => {
    (client.auth.signInWithPassword as jest.Mock).mockRejectedValue(
      new Error("Sign in error")
    );

    const TestComponent = () => {
      const { signIn, loading } = useAuth();

      const handleSignIn = async () => {
        try {
          await signIn("test@example.com", "password123");
        } catch {
          // Handle error
        }
      };

      return (
        <>
          <Button title="Sign In" onPress={handleSignIn} />
          {loading ? <Text>Loading...</Text> : <Text>Error occurred</Text>}
        </>
      );
    };

    const { getByText, findByText } = render(<TestComponent />);

    fireEvent.press(getByText(/Sign In/));

    expect(await findByText(/Error occurred/)).toBeTruthy();
  });

  it("should sign out successfully", async () => {
    const mockSession = { user: { id: "user123" } };
    (client.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: mockSession },
    });
    (client.auth.signOut as jest.Mock).mockResolvedValue({
      data: null,
      error: null,
    });

    const TestComponent = () => {
      const { session, signOut, loading } = useAuth();

      const handleSignOut = async () => {
        await signOut();
      };

      return (
        <>
          <Button title="Sign Out" onPress={handleSignOut} />
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <Text>{session ? "Signed In" : "Signed Out"}</Text>
          )}
        </>
      );
    };

    const { getByText, findByText } = render(<TestComponent />);

    expect(await findByText(/Signed In/)).toBeTruthy();

    fireEvent.press(getByText(/Sign Out/));

    expect(await findByText(/Signed Out/)).toBeTruthy();
  });

  it("should handle sign-out error", async () => {
    (client.auth.signOut as jest.Mock).mockRejectedValue(
      new Error("Sign out error")
    );

    const TestComponent = () => {
      const { signOut, loading } = useAuth();

      const handleSignOut = async () => {
        try {
          await signOut();
        } catch {
          // Handle error
        }
      };

      return (
        <>
          <Button title="Sign Out" onPress={handleSignOut} />
          {loading ? <Text>Loading...</Text> : <Text>Error occurred</Text>}
        </>
      );
    };

    const { getByText, findByText } = render(<TestComponent />);

    fireEvent.press(getByText(/Sign Out/));

    expect(await findByText(/Error occurred/)).toBeTruthy();
  });
});
