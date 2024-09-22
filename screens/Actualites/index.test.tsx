import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ActualiteScreen from "./";
import { useAuth } from "../../hooks/useAuth";
import { useInfiniteQuery } from "@tanstack/react-query";

// Mock dependencies
jest.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: jest.fn(),
}));

jest.mock("../../hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../components/ActuCard/ActuCard", () => {
  const { View, Text, Button } = jest.requireActual("react-native");
  return ({
    username,
    actionDescription,
    onActivityPress,
    onUsernamePress,
  }) => (
    <View testID={`actu-card-${username}`}>
      <Text>{username}</Text>
      <Text>{actionDescription}</Text>
      <Button title="Press Activity" onPress={onActivityPress} />
      <Button title="Press Username" onPress={onUsernamePress} />
    </View>
  );
});

describe("ActualiteScreen", () => {
  const mockNavigation = { push: jest.fn() };

  beforeEach(() => {
    useAuth.mockReturnValue({
      session: { user: { user_metadata: { profile_id: 1 } } },
    });

    useInfiniteQuery.mockReturnValue({
      data: {
        pages: [
          {
            data: [
              {
                id: 1,
                pseudo: "user1",
                type: "goals",
                title: "Title 1",
                profile_id: 1,
              },
            ],
          },
        ],
      },
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      status: "success",
    });
  });

  it("renders the ActualiteScreen with data and interacts with activity cards", async () => {
    const { getByText, getAllByTestId } = render(
      <ActualiteScreen navigation={mockNavigation} />
    );

    // Check if activity card is rendered
    expect(getByText("user1")).toBeTruthy();
    expect(getByText("a atteint son objectif:")).toBeTruthy();

    // Simulate pressing on the activity card
    fireEvent.press(getByText("Press Activity"));
    await waitFor(() => {
      expect(mockNavigation.push).toHaveBeenCalledWith("GoalDetailsScreen", {
        id: 1,
      });
    });

    // Simulate pressing on the username
    fireEvent.press(getByText("Press Username"));
    await waitFor(() => {
      expect(mockNavigation.push).toHaveBeenCalledWith("ProfilDetailScreen", {
        id: 1,
      });
    });
  });

  it("renders no data text when there is no activity", async () => {
    useInfiniteQuery.mockReturnValueOnce({
      data: { pages: [{ data: [] }] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      status: "success",
    });

    const { getByText } = render(
      <ActualiteScreen navigation={mockNavigation} />
    );

    // Verify no data message is shown
    expect(getByText("Aucune activité à afficher pour le moment")).toBeTruthy();
  });

  it("navigates to ExerciseDetailsScreen when activity type is exercises", async () => {
    useInfiniteQuery.mockReturnValueOnce({
      data: {
        pages: [
          {
            data: [
              {
                id: 2,
                pseudo: "user2",
                type: "exercises",
                title: "Exercise 1",
              },
            ],
          },
        ],
      },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      status: "success",
    });

    const { getByText } = render(
      <ActualiteScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByText("Press Activity"));
    await waitFor(() => {
      expect(mockNavigation.push).toHaveBeenCalledWith(
        "ExerciseDetailsScreen",
        {
          id: 2,
        }
      );
    });
  });

  it("navigates to ProgramDetailsScreen when activity type is programs", async () => {
    useInfiniteQuery.mockReturnValueOnce({
      data: {
        pages: [
          {
            data: [
              {
                id: 3,
                pseudo: "user3",
                type: "programs",
                title: "Program 1",
              },
            ],
          },
        ],
      },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      status: "success",
    });

    const { getByText } = render(
      <ActualiteScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByText("Press Activity"));
    await waitFor(() => {
      expect(mockNavigation.push).toHaveBeenCalledWith("ProgramDetailsScreen", {
        id: 3,
      });
    });
  });

  it("shows warning for unknown type", async () => {
    console.warn = jest.fn();

    useInfiniteQuery.mockReturnValueOnce({
      data: {
        pages: [
          {
            data: [
              {
                id: 4,
                pseudo: "user4",
                type: "unknown",
                title: "Unknown",
              },
            ],
          },
        ],
      },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      status: "success",
    });

    const { getByText } = render(
      <ActualiteScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByText("Press Activity"));
    await waitFor(() => {
      expect(console.warn).toHaveBeenCalledWith("Unknown type", "unknown");
    });
  });
});
