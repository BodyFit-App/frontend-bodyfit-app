import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { GoalListScreen } from ".";
import { useInfiniteQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: jest.fn(),
}));

jest.mock("../../api/goals", () => ({
  fetchGoals: jest.fn(),
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

jest.mock("../../components/ObjectifCard/ObjectifCard", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return (props) => (
    <TouchableOpacity onPress={props.onPress}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
});

describe("GoalListScreen", () => {
  const mockNavigation = { push: jest.fn() };
  const mockRoute = {};

  it("renders the search bar and filter bar", () => {
    useInfiniteQuery.mockReturnValue({
      data: { pages: [] },
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    const { getByTestId, getByText } = render(
      <GoalListScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByTestId("search-bar")).toBeTruthy();

    expect(getByText("Plus récents")).toBeTruthy();
    expect(getByText("Moins récents")).toBeTruthy();
    expect(getByText("A-Z")).toBeTruthy();
    expect(getByText("Z-A")).toBeTruthy();
  });

  it("fetches and displays goals correctly", async () => {
    useInfiniteQuery.mockReturnValue({
      data: {
        pages: [
          {
            data: [
              { id: 1, title: "Goal 1", description: "Description 1" },
              { id: 2, title: "Goal 2", description: "Description 2" },
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
      <GoalListScreen navigation={mockNavigation} route={mockRoute} />
    );

    await waitFor(() => {
      expect(getByText("Goal 1")).toBeTruthy();
      expect(getByText("Goal 2")).toBeTruthy();
    });
  });

  it("navigates to the goal detail screen when a goal is pressed", async () => {
    useInfiniteQuery.mockReturnValue({
      data: {
        pages: [
          {
            data: [{ id: 1, title: "Goal 1", description: "Description 1" }],
            nextCursor: null,
          },
        ],
      },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    const { getByText } = render(
      <GoalListScreen navigation={mockNavigation} route={mockRoute} />
    );

    fireEvent.press(getByText("Goal 1"));

    await waitFor(() => {
      expect(mockNavigation.push).toHaveBeenCalledWith("GoalDetailsScreen", {
        id: 1,
      });
    });
  });

  it("updates search query when typing in the search bar", async () => {
    useInfiniteQuery.mockReturnValue({
      data: { pages: [] },
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    const { getByTestId } = render(
      <GoalListScreen navigation={mockNavigation} route={mockRoute} />
    );

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
            data: [{ id: 1, title: "Goal 1", description: "Description 1" }],
            nextCursor: "next-cursor",
          },
        ],
      },
      fetchNextPage: fetchNextPageMock,
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    const { getByTestId } = render(
      <GoalListScreen navigation={mockNavigation} route={mockRoute} />
    );

    fireEvent(getByTestId("flat-list"), "onEndReached");

    expect(fetchNextPageMock).toHaveBeenCalled();
  });
});
