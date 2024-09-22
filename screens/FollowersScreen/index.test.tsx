import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { FollowersScreen } from "./index";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";

jest.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("../../hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../components/FollowerCard/FollowerCard", () => {
  const { View, Text, Button } = jest.requireActual("react-native");
  return ({ username, onFollowToggle, onPressPseudo }) => (
    <View testID="follower-card">
      <Text>{username}</Text>
      <Button title="Toggle Follow" onPress={onFollowToggle} />
      <Button title="Press Pseudo" onPress={onPressPseudo} />
    </View>
  );
});

jest.mock("../../components/CustomSearchBar/CustomSearchBar", () => {
  const { TextInput } = jest.requireActual("react-native");
  return ({ value, onChangeText, placeholder }) => (
    <TextInput
      testID="custom-search-bar"
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
});

jest.mock("../../components/FilterBar/FilterBar", () => {
  const { View, Button } = jest.requireActual("react-native");
  return ({ filters, onFilterChange }) => (
    <View testID="filter-bar">
      {filters.map((filter, index) => (
        <Button
          key={index}
          title={filter}
          onPress={() => onFilterChange(filter)}
        />
      ))}
    </View>
  );
});

describe("FollowersScreen", () => {
  const mockNavigation = { push: jest.fn() };
  const mockRoute = {};

  const mockProfilesData = {
    pages: [
      {
        data: [
          {
            id: 1,
            pseudo: "user1",
            firstname: "First1",
            lastname: "Last1",
            followedBy: [],
          },
          {
            id: 2,
            pseudo: "user2",
            firstname: "First2",
            lastname: "Last2",
            followedBy: [{}],
          },
        ],
        nextCursor: null,
      },
    ],
  };

  beforeEach(() => {
    useAuth.mockReturnValue({
      session: {
        user: {
          user_metadata: { profile_id: 1 },
        },
      },
    });

    useInfiniteQuery.mockReturnValue({
      data: mockProfilesData,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    useMutation.mockReturnValue({
      mutate: jest.fn(),
    });

    useQueryClient.mockReturnValue({
      invalidateQueries: jest.fn(),
    });
  });

  it("renders the FollowersScreen with data and interacts with FollowerCard", async () => {
    const { getByText, getByTestId, getAllByText } = render(
      <FollowersScreen navigation={mockNavigation} route={mockRoute} />
    );

    // Verify that the CustomSearchBar is rendered
    expect(getByTestId("custom-search-bar")).toBeTruthy();

    // Verify that the FilterBar is rendered
    expect(getByTestId("filter-bar")).toBeTruthy();

    // Verify that FollowerCard is rendered with mock data
    expect(getByText("user1")).toBeTruthy();
    expect(getByText("user2")).toBeTruthy();

    // Simulate pressing the 'Press Pseudo' button on the first card (user1)
    const pressPseudoButtons = getAllByText("Press Pseudo");
    fireEvent.press(pressPseudoButtons[0]);
    await waitFor(() => {
      expect(mockNavigation.push).toHaveBeenCalledWith("ProfileDetailsScreen", {
        id: 1,
      });
    });

    // Simulate pressing the 'Toggle Follow' button on the first card (user1)
    const toggleFollowButtons = getAllByText("Toggle Follow");
    fireEvent.press(toggleFollowButtons[0]);
    expect(useMutation().mutate).toHaveBeenCalled();
  });

  it("allows changing the filter", async () => {
    const { getByText } = render(
      <FollowersScreen navigation={mockNavigation} route={mockRoute} />
    );

    // Simulate pressing a filter option
    fireEvent.press(getByText("A-Z"));
    await waitFor(() => {
      expect(useInfiniteQuery).toHaveBeenCalled();
    });
  });
});
