import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExerciseDetailsScreen } from "./";
import { useAuth } from "../../hooks/useAuth";
import { fetchExerciseById } from "../../api/exercises";
import { handleToggleFavoriteExercise } from "../../api/favorites";

// Mocking necessary hooks and functions
jest.mock("../../hooks/useAuth");
jest.mock("../../api/exercises");
jest.mock("../../api/favorites");
jest.mock("../../lib/supabase", () => ({
  getPublicUrl: jest.fn(
    (folder, filename) => `mocked-url/${folder}/${filename}`
  ),
}));

const queryClient = new QueryClient();

const mockExerciseData = {
  id: "1",
  title: "Sample Exercise",
  description: "This is a sample exercise.",
  estimated_time_seconds: 30,
  banner_image: "sample-image-url",
  categories: [{ name: "Strength" }],
  profiles: {
    firstname: "John",
    lastname: "Doe",
    pseudo: "johndoe",
    avatar_url: "profile-avatar-url",
  },
  favorite_exercises: [],
};

beforeEach(() => {
  (useAuth as jest.Mock).mockReturnValue({
    session: {
      user: {
        user_metadata: {
          profile_id: "123",
        },
      },
    },
  });
  fetchExerciseById.mockResolvedValue(mockExerciseData);
  handleToggleFavoriteExercise.mockResolvedValue({});
});

describe("ExerciseDetailsScreen", () => {
  it("displays loading indicator while fetching data", async () => {
    fetchExerciseById.mockReturnValue(new Promise(() => {})); // Keep it pending

    render(
      <QueryClientProvider client={queryClient}>
        <ExerciseDetailsScreen route={{ params: { id: "1" } }} />
      </QueryClientProvider>
    );

    expect(screen.findByRole("progressbar")).toBeTruthy();
  });

  it("renders exercise details correctly", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ExerciseDetailsScreen route={{ params: { id: "1" } }} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.findByText("Sample Exercise")).toBeTruthy();
      expect(screen.findByText("This is a sample exercise.")).toBeTruthy();
      expect(screen.findByText("30 min")).toBeTruthy();
      expect(screen.findByText("Strength")).toBeTruthy();
    });
  });

  it("handles error state", async () => {
    fetchExerciseById.mockRejectedValue(new Error("Fetch error"));

    render(
      <QueryClientProvider client={queryClient}>
        <ExerciseDetailsScreen route={{ params: { id: "1" } }} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.findByText("Fetch error")).toBeTruthy();
    });
  });

  it("displays an error message when there is an error", async () => {
    jest.mock("../../api/exercises", () => ({
      fetchExerciseById: jest
        .fn()
        .mockRejectedValue(new Error("Network Error")),
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <ExerciseDetailsScreen route={{ params: { id: "1" } }} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.findByText("Network Error")).toBeTruthy();
    });
  });
});
