import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileDetailsScreen } from "./";
import { getPublicUrl } from "../../lib/supabase";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("../../api/profiles", () => ({
  fetchProfileById: jest.fn(),
}));

jest.mock("../../api/toggles", () => ({
  handleToggleFollow: jest.fn(),
}));

jest.mock("../../lib/supabase", () => ({
  getPublicUrl: jest.fn(),
}));

jest.mock("../../components/OtherProfileHeader/OtherProfileHeader", () => {
  const { View, Text, Button } = jest.requireActual("react-native");
  return (props) => (
    <View testID="profile-header">
      <Text>{`${props.firstname} ${props.lastname}`}</Text>
      <Button title="Follow" onPress={props.onFollowToggle} />
    </View>
  );
});

jest.mock("../../components/ObjectifCard/ObjectifCard", () => {
  const { View, Text } = jest.requireActual("react-native");
  return (props) => (
    <View testID="goal-card">
      <Text>{props.title}</Text>
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

describe("ProfileDetailsScreen", () => {
  const mockNavigation = { navigate: jest.fn(), push: jest.fn() };
  const mockRoute = { params: { id: 1 } };

  beforeEach(() => {
    useQueryClient.mockReturnValue({
      invalidateQueries: jest.fn(),
    });
  });

  it("renders profile details when data is fetched successfully", () => {
    useQuery.mockReturnValue({
      data: {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        pseudo: "johndoe",
        avatar_url: "avatar.png",
        followedBy: [{ id: 1 }],
        goals: [
          {
            id: 1,
            title: "Goal 1",
            description: "Description 1",
            achieved: false,
          },
        ],
        exercises: [
          {
            id: 1,
            title: "Exercise 1",
            estimated_time_seconds: 600,
            categories: [{ name: "Category 1" }],
          },
        ],
        programs: [{ id: 1, title: "Program 1", description: "Description 1" }],
      },
      isLoading: false,
      error: null,
    });

    getPublicUrl.mockReturnValue("https://example.com/image.png");

    const { getByText, getAllByTestId, getAllByText } = render(
      <ProfileDetailsScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText("John Doe")).toBeTruthy();

    const itemCards = getAllByTestId("item-card");
    expect(itemCards.length).toBe(2);

    expect(getByText("Goal 1")).toBeTruthy();
    expect(getByText("Exercise 1")).toBeTruthy();
    expect(getByText("Program 1")).toBeTruthy();

    const toutAfficherButtons = getAllByText("Tout afficher");
    expect(toutAfficherButtons.length).toBe(3);
  });

  it('navigates to goals screen when "Tout afficher" is pressed for goals', () => {
    useQuery.mockReturnValue({
      data: {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        pseudo: "johndoe",
        followedBy: [{ id: 1 }],
        goals: [
          {
            id: 1,
            title: "Goal 1",
            description: "Description 1",
            achieved: false,
          },
        ],
        exercises: [],
        programs: [],
      },
      isLoading: false,
      error: null,
    });

    const { getAllByText } = render(
      <ProfileDetailsScreen navigation={mockNavigation} route={mockRoute} />
    );

    fireEvent.press(getAllByText("Tout afficher")[0]);

    expect(mockNavigation.navigate).toHaveBeenCalledWith("GoalsScreen");
  });

  it('navigates to exercises screen when "Tout afficher" is pressed for exercises', () => {
    useQuery.mockReturnValue({
      data: {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        pseudo: "johndoe",
        followedBy: [{ id: 1 }],
        goals: [],
        exercises: [
          {
            id: 1,
            title: "Exercise 1",
            estimated_time_seconds: 600,
            categories: [{ name: "Category 1" }],
          },
        ],
        programs: [],
      },
      isLoading: false,
      error: null,
    });

    const { getAllByText } = render(
      <ProfileDetailsScreen navigation={mockNavigation} route={mockRoute} />
    );

    fireEvent.press(getAllByText("Tout afficher")[1]);

    expect(mockNavigation.push).toHaveBeenCalledWith("ExerciseListScreen", {});
  });

  it('navigates to programs screen when "Tout afficher" is pressed for programs', () => {
    useQuery.mockReturnValue({
      data: {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        pseudo: "johndoe",
        followedBy: [{ id: 1 }],
        goals: [],
        exercises: [],
        programs: [{ id: 1, title: "Program 1" }],
      },
      isLoading: false,
      error: null,
    });

    const { getAllByText } = render(
      <ProfileDetailsScreen navigation={mockNavigation} route={mockRoute} />
    );

    fireEvent.press(getAllByText("Tout afficher")[2]);

    expect(mockNavigation.navigate).toHaveBeenCalledWith("ProgramsScreen");
  });

  it("renders loading indicator while fetching data", () => {
    useQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    const { getByTestId } = render(
      <ProfileDetailsScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByTestId("activity-indicator")).toBeTruthy();
  });

  it("displays error message when there is an error fetching profile data", () => {
    useQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: "Error fetching profile data" },
    });

    const { getByText } = render(
      <ProfileDetailsScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText("Error fetching profile data")).toBeTruthy();
  });

  it("calls toggle follow mutation when follow button is pressed", async () => {
    const toggleFollowMock = jest.fn();
    useMutation.mockReturnValue({ mutate: toggleFollowMock });

    useQuery.mockReturnValue({
      data: {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        pseudo: "johndoe",
        followedBy: [{ id: 1 }],
        goals: [],
        exercises: [],
        programs: [],
      },
      isLoading: false,
      error: null,
    });

    getPublicUrl.mockReturnValue("https://example.com/image.png");

    const { getByText } = render(
      <ProfileDetailsScreen navigation={mockNavigation} route={mockRoute} />
    );

    fireEvent.press(getByText("Follow"));

    await waitFor(() => {
      expect(toggleFollowMock).toHaveBeenCalledWith({
        id: 1,
        isFollowed: true,
      });
    });
  });
});
