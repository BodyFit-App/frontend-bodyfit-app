import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ExerciseFormScreen } from "."; // Adjust the path accordingly
import { useAuth } from "../../hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchExerciseById } from "../../api/exercises";

// Mock dependencies
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(() => ({
    invalidateQueries: jest.fn(),
  })),
}));

jest.mock("../../hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../buckets/images", () => ({
  uploadImage: jest.fn(),
}));

jest.mock("../../api/exercises", () => ({
  fetchExerciseById: jest.fn(),
  upsertExercise: jest.fn(),
  addExerciseCategories: jest.fn(),
  resetExerciseCategories: jest.fn(),
}));

jest.mock("../../lib/supabase", () => ({
  getPublicUrl: jest.fn(
    (folder, filename) => `mocked-url/${folder}/${filename}`
  ),
}));

jest.mock("../../components/TextField/TextField", () => {
  const { TextInput } = require("react-native"); // Import inside the mock scope
  return (props) => <TextInput testID="text-field" {...props} />;
});

jest.mock("../../components/ImagePicker/ImagePicker", () => {
  const { Text } = require("react-native"); // Import inside the mock scope
  return (props) => (
    <Text testID="image-picker" onPress={() => props.onChange("image.png")} />
  );
});

jest.mock("../../components/CategoryDropdown/CategoryDropdown", () => {
  const { Text } = require("react-native"); // Import inside the mock scope
  return (props) => (
    <Text testID="category-dropdown" onPress={() => props.onChange(["1"])}>
      Category 1
    </Text>
  );
});

jest.mock("react-native-paper", () => {
  const actualPaper = jest.requireActual("react-native-paper"); // Get the actual react-native-paper

  return {
    ...actualPaper, // Keep all other components from the actual library
    Switch: (props) => (
      <actualPaper.Switch
        testID="visibility-switch"
        value={props.value}
        onValueChange={props.onValueChange}
      />
    ),
  };
});

describe("ExerciseFormScreen", () => {
  const navigation = { goBack: jest.fn() };
  const route = { params: { id: 1 } };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      session: { user: { id: "test-user" } },
    });
  });

  it("renders form with default values for new exercise", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isSuccess: false,
    });

    const { getByPlaceholderText, getByText } = render(
      <ExerciseFormScreen route={{ params: {} }} navigation={navigation} />
    );

    // Check that all the form fields are rendered with default values
    expect(getByPlaceholderText("Ex: Course à pied")).toBeTruthy();
    expect(getByPlaceholderText("Ex: Pensez à bien vous équiper")).toBeTruthy();
    expect(getByPlaceholderText("Ex: Temps estimé en minutes")).toBeTruthy();
    expect(getByText("Créer")).toBeTruthy();
  });

  it("renders form with exercise data in edit mode", async () => {
    const mockExercise = {
      id: 1,
      title: "Test Exercise",
      description: "Test Description",
      estimated_time_minutes: 600,
      visible: true,
      categories: [{ id: 1 }],
      banner_image: "banner.jpg",
    };

    (useQuery as jest.Mock).mockReturnValue({
      data: mockExercise,
      isSuccess: true,
    });

    const { getByPlaceholderText, getByDisplayValue, getByText } = render(
      <ExerciseFormScreen route={route} navigation={navigation} />
    );

    await waitFor(() => {
      expect(getByDisplayValue("Test Exercise")).toBeTruthy();
      expect(getByDisplayValue("Test Description")).toBeTruthy();
      expect(getByDisplayValue("600")).toBeTruthy();
      expect(getByText("Modifier")).toBeTruthy();
    });
  });

  it("handles form submission for new exercise", async () => {
    const mockMutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({ mutate: mockMutate });
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isSuccess: false,
    });

    const { getByPlaceholderText, getByText } = render(
      <ExerciseFormScreen route={{ params: {} }} navigation={navigation} />
    );

    fireEvent.changeText(
      getByPlaceholderText("Ex: Course à pied"),
      "New Exercise"
    );
    fireEvent.changeText(
      getByPlaceholderText("Ex: Pensez à bien vous équiper"),
      "New Description"
    );
    fireEvent.changeText(
      getByPlaceholderText("Ex: Temps estimé en minutes"),
      "20"
    );

    fireEvent.press(getByText("Créer"));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });

  it("triggers update on form submission in edit mode", async () => {
    const mockExercise = {
      id: 1,
      title: "Test Exercise",
      description: "Test Description",
      estimated_time_minutes: 600,
      visible: true,
      categories: [{ id: 1 }],
      banner_image: "banner.jpg",
    };

    (useQuery as jest.Mock).mockReturnValue({
      data: mockExercise,
      isSuccess: true,
    });

    const mockMutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({ mutate: mockMutate });

    const { getByText } = render(
      <ExerciseFormScreen route={route} navigation={navigation} />
    );

    fireEvent.press(getByText("Modifier"));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });

  it("handles visibility toggle correctly", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isSuccess: false,
    });

    const { getByTestId } = render(
      <ExerciseFormScreen route={{ params: {} }} navigation={navigation} />
    );

    const switchElement = getByTestId("visibility-switch");

    // Initially, it should be false
    expect(switchElement.props.value).toBe(false);

    // Toggle the switch
    fireEvent(switchElement, "onValueChange", true);

    // Check if the switch is now true
    expect(switchElement.props.value).toBe(true);
  });
});
