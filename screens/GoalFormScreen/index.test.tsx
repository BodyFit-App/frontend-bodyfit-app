import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GoalFormScreen from "./";
import { fetchGoalById, upsertGoal } from "../../api/goals";

jest.mock("../../api/goals", () => ({
  fetchGoalById: jest.fn(),
  upsertGoal: jest.fn(),
}));

jest.mock("../../buckets/images", () => ({
  uploadImage: jest.fn(),
}));

jest.mock("../../hooks/useAuth", () => ({
  useAuth: jest
    .fn()
    .mockImplementation(() => ({ session: { user: { id: "fake-id" } } })),
}));

const queryClient = new QueryClient();

const mockNavigation = {
  goBack: jest.fn(),
};

const mockRoute = {
  params: {
    goalId: 7,
  },
};

jest.useFakeTimers();

describe("GoalFormScreen", () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
    cleanup();
  });

  it("renders correctly", () => {
    const { toJSON } = render(
      <QueryClientProvider client={queryClient}>
        <GoalFormScreen
          navigation={mockNavigation as any}
          route={mockRoute as any}
        />
      </QueryClientProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  xit("submits form data", async () => {
    const mockOnSubmit = jest.fn();

    const { getByLabelText, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <GoalFormScreen
          navigation={mockNavigation as any}
          route={mockRoute as any}
        />
      </QueryClientProvider>
    );

    fireEvent.changeText(getByLabelText("Titre"), "New Goal Title");
    fireEvent.changeText(getByLabelText("Description"), "Goal Description");

    (upsertGoal as jest.Mock).mockResolvedValueOnce({ id: 1 });

    fireEvent.press(getByText("Créer"));

    await waitFor(() => {
      expect(upsertGoal).toHaveBeenCalledWith({
        title: "New Goal Title",
        banner_image: "",
        date_start: "",
        date_end: "",
        description: "Goal Description",
        visible: false,
        steps: [],
      });
    });
  });

  xit("fetches goal data on load", async () => {
    (fetchGoalById as jest.Mock).mockResolvedValueOnce({
      title: "Test Goal",
      banner_image: "test-image.jpg",
      date_start: "2024-01-01",
      date_end: "2024-12-31",
      description: "Test Description",
      visible: true,
      steps: [],
    });

    const { findByLabelText } = render(
      <QueryClientProvider client={queryClient}>
        <GoalFormScreen
          navigation={mockNavigation as any}
          route={mockRoute as any}
        />
      </QueryClientProvider>
    );

    // expect(await findByLabelText("Titre")).toHaveTextContent("Test Goal");
    // expect(await findByLabelText("Description")).toHaveTextContent(
    //   "Test Description"
    // );
  });
});
