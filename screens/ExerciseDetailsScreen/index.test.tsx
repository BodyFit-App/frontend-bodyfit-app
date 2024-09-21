import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { ExerciseDetailsScreen } from ".";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";

// Mock necessary hooks with casting
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn().mockReturnValue({
    invalidateQueries: jest.fn(),
  }),
}));

jest.mock("../../hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../lib/supabase", () => ({
  getPublicUrl: jest.fn(() => "mocked-image-url"),
}));

describe("ExerciseDetailsScreen", () => {
  it("renders exercise details with mocked data", async () => {
    // Mock the useAuth hook to return a session
    (useAuth as jest.Mock).mockReturnValue({
      session: {
        user: {
          user_metadata: {
            profile_id: "123",
          },
        },
      },
    });

    // Mock useQuery to return data
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        id: 1,
        title: "Mock Exercise",
        banner_image: "mock-image.jpg",
        estimated_time_seconds: 1800,
        categories: [{ name: "Cardio" }],
        favorite_exercises: [],
        description: "Mock exercise description",
        profiles: {
          firstname: "John",
          lastname: "Doe",
          pseudo: "johndoe",
          avatar_url: "avatar.jpg",
        },
      },
      isLoading: false,
      error: null,
    });

    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    } as Partial<UseMutationResult>);

    const { getByText } = render(
      <ExerciseDetailsScreen route={{ params: { id: 1 } }} />
    );

    await waitFor(() => {
      expect(getByText("Mock Exercise")).toBeTruthy();
      expect(getByText("Mock exercise description")).toBeTruthy();
      expect(getByText(/John Doe/)).toBeTruthy();
    });
  });

  it("displays loading indicator when data is loading", () => {
    // Mock the useQuery to return loading state
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    const { getByTestId } = render(
      <ExerciseDetailsScreen route={{ params: { id: 1 } }} />
    );

    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("displays error message when fetching fails", async () => {
    // Mock useQuery to return an error
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: { message: "Failed to fetch exercise data" },
    });

    const { getByText } = render(
      <ExerciseDetailsScreen route={{ params: { id: 1 } }} />
    );

    await waitFor(() => {
      expect(getByText("Failed to fetch exercise data")).toBeTruthy();
    });
  });

  it("renders exercise details correctly when data is loaded", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        id: 1,
        title: "Mock Exercise",
        banner_image: "mock-image.jpg",
        estimated_time_seconds: 30,
        categories: [{ name: "Cardio" }],
        favorite_exercises: [],
        description: "Mock exercise description",
        profiles: {
          firstname: "John",
          lastname: "Doe",
          pseudo: "johndoe",
          avatar_url: "avatar.jpg",
        },
      },
      isLoading: false,
      error: null,
    });

    const { getByText } = render(
      <ExerciseDetailsScreen route={{ params: { id: 1 } }} />
    );

    await waitFor(() => {
      expect(getByText("Mock Exercise")).toBeTruthy();
      expect(getByText("Mock exercise description")).toBeTruthy();
      expect(getByText("John Doe")).toBeTruthy();
      expect(getByText(/30 min/)).toBeTruthy();
    });
  });

  it("calls toggleFavorite when the favorite button is clicked", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        id: 1,
        title: "Mock Exercise",
        banner_image: "mock-image.jpg",
        estimated_time_seconds: 1800,
        categories: [{ name: "Cardio" }],
        favorite_exercises: [],
        description: "Mock exercise description",
        profiles: {
          firstname: "John",
          lastname: "Doe",
          pseudo: "johndoe",
          avatar_url: "avatar.jpg",
        },
      },
      isLoading: false,
      error: null,
    });

    const mockMutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });

    const { getByTestId } = render(
      <ExerciseDetailsScreen route={{ params: { id: 1 } }} />
    );

    // Simulate pressing the favorite button
    const favoriteButton = getByTestId("favorite-button");
    fireEvent.press(favoriteButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({ id: 1, isFav: false });
    });
  });
});
