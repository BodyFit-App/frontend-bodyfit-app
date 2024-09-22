import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GoalDetailsScreen } from "./";
import { getPublicUrl } from "../../lib/supabase";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("../../api/goals", () => ({
  fetchGoalById: jest.fn(),
  updateStepStatus: jest.fn(),
}));

jest.mock("../../lib/supabase", () => ({
  getPublicUrl: jest.fn(),
}));

jest.mock("../../components/GoalHeader", () => {
  const { View, Text } = jest.requireActual("react-native");
  return (props) => (
    <View testID="goal-header">
      <Text>{props.title}</Text>
    </View>
  );
});

jest.mock("../../components/StepCard/StepCard", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return (props) => (
    <TouchableOpacity testID="step-card" onPress={props.onValidate}>
      <Text>{`Step ${props.stepNumber}`}</Text>
    </TouchableOpacity>
  );
});

describe("GoalDetailsScreen", () => {
  const mockNavigation = { navigate: jest.fn() };
  const mockRoute = { params: { id: 1 } };

  beforeEach(() => {
    useQueryClient.mockReturnValue({
      invalidateQueries: jest.fn(),
    });
  });

  it("renders loading indicator while fetching data", () => {
    useQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    const { getByTestId } = render(
      <GoalDetailsScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByTestId("activity-indicator")).toBeTruthy();
  });

  it("displays error message when there is an error fetching goal data", () => {
    useQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: "Error fetching goal data" },
    });

    const { getByText } = render(
      <GoalDetailsScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText("Error fetching goal data")).toBeTruthy();
  });

  it("renders goal details when data is fetched successfully", () => {
    useQuery.mockReturnValue({
      data: {
        id: 1,
        title: "Goal Title",
        description: "Goal Description",
        date_start: "2023-01-01",
        date_end: "2023-12-31",
        steps: [
          { id: 1, description: "Step 1", achieved: false },
          { id: 2, description: "Step 2", achieved: true },
        ],
        banner_image: "banner.png",
      },
      isLoading: false,
      error: null,
    });

    getPublicUrl.mockReturnValue("https://example.com/banner.png");

    const { getByText, getAllByTestId } = render(
      <GoalDetailsScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText("Goal Title")).toBeTruthy();
    expect(getByText("Goal Description")).toBeTruthy();

    const stepCards = getAllByTestId("step-card");
    expect(stepCards.length).toBe(2);
    expect(getByText("Step 1")).toBeTruthy();
    expect(getByText("Step 2")).toBeTruthy();
  });

  it("calls toggle step achievement when a step is toggled", async () => {
    const toggleMutationMock = jest.fn();
    useMutation.mockReturnValue({ mutate: toggleMutationMock });

    useQuery.mockReturnValue({
      data: {
        id: 1,
        title: "Goal Title",
        description: "Goal Description",
        steps: [
          { id: 1, description: "Step 1", achieved: false },
          { id: 2, description: "Step 2", achieved: true },
        ],
        banner_image: "banner.png",
      },
      isLoading: false,
      error: null,
    });

    getPublicUrl.mockReturnValue("https://example.com/banner.png");

    const { getAllByTestId } = render(
      <GoalDetailsScreen navigation={mockNavigation} route={mockRoute} />
    );

    fireEvent.press(getAllByTestId("step-card")[0]);

    await waitFor(() => {
      expect(toggleMutationMock).toHaveBeenCalledWith({
        id: 1,
        isAchieved: true,
      });
    });
  });
});
