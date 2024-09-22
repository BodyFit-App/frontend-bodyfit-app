import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { GoalFormScreen } from "./";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("../../components/TextField/TextField", () => {
  const { TextInput } = jest.requireActual("react-native");
  return (props) => (
    <TextInput
      testID={props.testID}
      value={props.value}
      onChangeText={props.onChangeText}
      onBlur={props.onBlur}
    />
  );
});

jest.mock("../../components/ImagePicker/ImagePicker", () => {
  const { Button, View } = jest.requireActual("react-native");
  return (props) => (
    <View testID="image-picker">
      <Button title="Pick Image" onPress={() => props.onChange("image-url")} />
    </View>
  );
});

jest.mock("../../components/CustomDatePicker/CustomDatePicker", () => {
  const { Button, View } = jest.requireActual("react-native");
  return (props) => (
    <View testID="date-picker">
      <Button title={props.label} onPress={() => props.onChange(new Date())} />
    </View>
  );
});

jest.mock("../../components/StepForm", () => {
  const { View } = jest.requireActual("react-native");
  return (props) => <View testID="step-form" />;
});

jest.mock("../../components/StepList", () => {
  const { View } = jest.requireActual("react-native");
  return (props) => <View testID="step-list" />;
});

jest.mock("../../components/ProgramDropdown", () => {
  const { Button, View } = jest.requireActual("react-native");
  return (props) => (
    <View testID="program-dropdown">
      <Button title="Select Program" onPress={() => props.onChange("1")} />
    </View>
  );
});

describe("GoalFormScreen", () => {
  const mockNavigation = { goBack: jest.fn() };
  const mockRoute = { params: { id: 1 } };
  const mockQueryClient = { invalidateQueries: jest.fn() };

  beforeEach(() => {
    useQueryClient.mockReturnValue(mockQueryClient);
    useMutation.mockReturnValue({
      mutate: jest.fn(),
    });
    useQuery.mockReturnValue({
      data: {
        id: 1,
        title: "Test Goal",
        description: "Goal description",
        banner_image: "image-url",
        date_start: "2022-01-01",
        date_end: "2022-12-31",
        visible: true,
        steps: [{ id: 1, title: "Step 1", description: "Step 1 description" }],
      },
      isSuccess: true,
      isLoading: false,
    });
  });

  it("renders the form with all input fields", () => {
    const { getByTestId } = render(
      <GoalFormScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByTestId("goal-title")).toBeTruthy();
    expect(getByTestId("goal-description")).toBeTruthy();
    expect(getByTestId("image-picker")).toBeTruthy();
    expect(getByTestId("date-picker")).toBeTruthy();
    expect(getByTestId("step-form")).toBeTruthy();
    expect(getByTestId("step-list")).toBeTruthy();
    expect(getByTestId("program-dropdown")).toBeTruthy();
  });

  it("loads goal data correctly in edit mode", async () => {
    const { getByTestId } = render(
      <GoalFormScreen navigation={mockNavigation} route={mockRoute} />
    );

    await waitFor(() => {
      expect(getByTestId("goal-title").props.value).toBe("Test Goal");
      expect(getByTestId("goal-description").props.value).toBe(
        "Goal description"
      );
    });
  });

  it("submits the form and calls the upsert mutation", async () => {
    const mockMutate = jest.fn();
    useMutation.mockReturnValue({ mutate: mockMutate });

    const { getByTestId } = render(
      <GoalFormScreen navigation={mockNavigation} route={mockRoute} />
    );

    // Fill out the form
    fireEvent.changeText(getByTestId("goal-title"), "New Goal Title");
    fireEvent.changeText(
      getByTestId("goal-description"),
      "New Goal Description"
    );
    fireEvent.press(getByTestId("image-picker")); // Pick an image
    fireEvent.press(getByTestId("date-picker")); // Pick a start date
    fireEvent.press(getByTestId("date-picker")); // Pick an end date

    fireEvent.press(getByTestId("goal-title")); // Submit form
    fireEvent.press(getByTestId("goal-description")); // Ensure form submission

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(expect.any(Object)); // Check if form was submitted
    });
  });

  it("toggles the visible state with the switch", () => {
    const { getByTestId } = render(
      <GoalFormScreen navigation={mockNavigation} route={mockRoute} />
    );

    const switchElement = getByTestId("visible-switch");

    // Initially true (from loaded data)
    expect(switchElement.props.value).toBe(true);

    // Toggle to false
    fireEvent(switchElement, "onValueChange", false);
    expect(switchElement.props.value).toBe(false);
  });
});
