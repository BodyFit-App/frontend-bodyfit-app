import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { GoalFormScreen } from "./";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("../../hooks/useAuth", () => ({
  useAuth: jest.fn(),
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
    <View testID={props.testID}>
      <Button title={props.label} onPress={() => props.onChange(new Date())} />
    </View>
  );
});

jest.mock("./StepForm", () => {
  const { View } = jest.requireActual("react-native");
  return (props) => <View testID="step-form" />;
});

jest.mock("./StepList", () => {
  const { View } = jest.requireActual("react-native");
  return (props) => <View testID="step-list" />;
});

jest.mock("../../components/ProgramDropdown/ProgramDropdown", () => {
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

    useAuth.mockReturnValue({
      session: { user: { id: "test-user-id" } },
    });
  });

  it("renders the form with all input fields", () => {
    const { getByTestId } = render(
      <GoalFormScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByTestId("goal-title")).toBeTruthy();
    expect(getByTestId("goal-description")).toBeTruthy();
    expect(getByTestId("image-picker")).toBeTruthy();
    expect(getByTestId("date-picker-start")).toBeTruthy(); // Start date picker
    expect(getByTestId("date-picker-end")).toBeTruthy(); // End date picker
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
