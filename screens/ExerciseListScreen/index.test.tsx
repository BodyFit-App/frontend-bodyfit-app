import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ExerciseListScene } from "./";
import { useAuth } from "../../hooks/useAuth";
import { useFilterOrder } from "../../hooks/useFilterOrder";

jest.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("../../api/exercises", () => ({
  fetchExercises: jest.fn(),
}));

jest.mock("../../api/toggles", () => ({
  handleToggleFavoriteExercise: jest.fn(),
}));

jest.mock("../../hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../hooks/useFilterOrder", () => ({
  useFilterOrder: jest.fn(),
}));

jest.mock("../../components/CustomSearchBar/CustomSearchBar", () => {
  const { TextInput } = jest.requireActual("react-native");
  return (props) => (
    <TextInput
      testID="search-bar"
      onChangeText={props.onChangeText}
      value={props.value}
    />
  );
});

jest.mock("../../components/FilterBar/FilterBar", () => {
  const { View, Text } = jest.requireActual("react-native");
  return (props) => (
    <View>
      {props.filters.map((filter) => (
        <Text key={filter} onPress={() => props.onFilterChange(filter)}>
          {filter}
        </Text>
      ))}
    </View>
  );
});

jest.mock("../../components/ItemCard", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return (props) => (
    <TouchableOpacity testID="item-card" onPress={props.onPressNav}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
});

describe("ExerciseListScene", () => {
  const mockNavigation = { navigate: jest.fn() };
  const mockRoute = { params: {} };

  beforeEach(() => {
    useAuth.mockReturnValue({
      session: { user: { user_metadata: { profile_id: 1 } } },
    });
    useFilterOrder.mockReturnValue({
      order: { field: "created_at", asc: false },
      handleFilterChange: jest.fn(),
      selectedFilter: "Plus récents",
      filterList: ["Plus récents", "Moins récents", "A-Z", "Z-A"],
    });
    useQueryClient.mockReturnValue({
      invalidateQueries: jest.fn(),
    });
  });

  it("renders the search bar, filter bar, and flatlist", () => {
    useInfiniteQuery.mockReturnValue({
      data: { pages: [{ count: 0, data: [] }] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    const { getByTestId, getByText } = render(
      <ExerciseListScene navigation={mockNavigation} route={mockRoute} />
    );

    // Check if the search bar, filter bar, and item list are rendered
    expect(getByTestId("search-bar")).toBeTruthy();
    expect(getByText("Plus récents")).toBeTruthy();
    expect(getByText("Moins récents")).toBeTruthy();
    expect(getByText("A-Z")).toBeTruthy();
    expect(getByText("Z-A")).toBeTruthy();
  });

  it("fetches and displays exercises", async () => {
    useInfiniteQuery.mockReturnValue({
      data: {
        pages: [
          {
            count: 2,
            data: [
              { id: 1, title: "Exercise 1", favorite_exercises: [] },
              { id: 2, title: "Exercise 2", favorite_exercises: [{ id: 1 }] },
            ],
            nextCursor: null,
          },
        ],
      },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    const { getByText } = render(
      <ExerciseListScene navigation={mockNavigation} route={mockRoute} />
    );

    // Check if the exercises are rendered
    await waitFor(() => {
      expect(getByText("Exercise 1")).toBeTruthy();
      expect(getByText("Exercise 2")).toBeTruthy();
    });
  });

  it("updates search query when typing in the search bar", async () => {
    useInfiniteQuery.mockReturnValue({
      data: { pages: [{ count: 0, data: [] }] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    const { getByTestId } = render(
      <ExerciseListScene navigation={mockNavigation} route={mockRoute} />
    );

    // Simulate typing in the search bar
    fireEvent.changeText(getByTestId("search-bar"), "New Search");

    await waitFor(() => {
      expect(getByTestId("search-bar").props.value).toBe("New Search");
    });
  });

  it("fetches next page when onEndReached is triggered", () => {
    const fetchNextPageMock = jest.fn();

    useInfiniteQuery.mockReturnValue({
      data: {
        pages: [
          {
            count: 1,
            data: [
              {
                id: 1,
                title: "Exercise 1",
                favorite_exercises: [],
              },
            ],
            nextCursor: "next-cursor",
          },
        ],
      },
      fetchNextPage: fetchNextPageMock,
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    const { getByTestId } = render(
      <ExerciseListScene navigation={mockNavigation} route={mockRoute} />
    );

    // Trigger onEndReached to simulate scrolling to the end of the list
    fireEvent(getByTestId("flat-list"), "onEndReached");

    // Check if fetchNextPage was called
    expect(fetchNextPageMock).toHaveBeenCalled();
  });

  it("navigates to the exercise detail screen when an item is pressed", async () => {
    useInfiniteQuery.mockReturnValue({
      data: {
        pages: [
          {
            count: 1,
            data: [{ id: 1, title: "Exercise 1", favorite_exercises: [] }],
            nextCursor: null,
          },
        ],
      },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    const { getByText } = render(
      <ExerciseListScene navigation={mockNavigation} route={mockRoute} />
    );

    fireEvent.press(getByText("Exercise 1"));

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith(
        "ExerciseDetailsScreen",
        { id: 1 }
      );
    });
  });
});
