import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProgramDetailsScreen } from "./";
import { getPublicUrl } from "../../lib/supabase";
import { useAuth } from "../../hooks/useAuth";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("../../api/programs", () => ({
  fetchProgramById: jest.fn(),
}));

jest.mock("../../api/toggles", () => ({
  handleToggleFavoriteProgram: jest.fn(),
}));

jest.mock("../../hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../lib/supabase", () => ({
  getPublicUrl: jest.fn(),
}));

jest.mock("../../components/TrainingHeader/TrainingHeader", () => {
  const { View, Text } = jest.requireActual("react-native");
  return (props) => (
    <View testID="training-header">
      <Text>{props.title}</Text>
    </View>
  );
});

jest.mock("../../components/CreatorCard", () => {
  const { View, Text } = jest.requireActual("react-native");
  return (props) => (
    <View testID="creator-card">
      <Text>{`${props.firstname} ${props.lastname}`}</Text>
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

describe("ProgramDetailsScreen", () => {
  const mockNavigation = { navigate: jest.fn() };
  const mockRoute = { params: { id: 1 } };

  beforeEach(() => {
    useAuth.mockReturnValue({
      session: { user: { user_metadata: { profile_id: 1 } } },
    });
    useQueryClient.mockReturnValue({
      invalidateQueries: jest.fn(),
    });
  });

  it("renders loading indicator when fetching data", () => {
    useQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    const { getByTestId } = render(
      <ProgramDetailsScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByTestId("activity-indicator")).toBeTruthy();
  });

  it("renders error message when there is an error fetching data", () => {
    useQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: "Error fetching program details" },
    });

    const { getByText } = render(
      <ProgramDetailsScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText("Error fetching program details")).toBeTruthy();
  });

  it("renders program details when data is fetched successfully", async () => {
    useQuery.mockReturnValue({
      data: {
        id: 1,
        title: "Program Title",
        description: "Program Description",
        favorite_programs: [],
        sessions: [
          {
            id: 1,
            title: "Session 1",
            description: "Session Description",
            exercises: [
              {
                id: 1,
                title: "Exercise 1",
                estimated_time_seconds: 600,
                categories: [{ name: "Category 1" }],
              },
            ],
          },
        ],
        profiles: {
          firstname: "John",
          lastname: "Doe",
          pseudo: "johndoe",
          avatar_url: "avatar.png",
        },
      },
      isLoading: false,
      error: null,
    });

    getPublicUrl.mockReturnValue("https://example.com/image.png");

    const { getByText, getByTestId } = render(
      <ProgramDetailsScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByTestId("training-header")).toBeTruthy();
    expect(getByText("Program Title")).toBeTruthy();
    expect(getByText("Program Description")).toBeTruthy();
    expect(getByTestId("creator-card")).toBeTruthy();
    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("Exercise 1")).toBeTruthy();
  });
});
