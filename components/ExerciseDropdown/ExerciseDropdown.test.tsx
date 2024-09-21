import React from "react";
import {
  fireEvent,
  render,
  waitFor,
  cleanup,
} from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ExerciseDropdown from "./ExerciseDropdown";
import { fetchDropdownExercises } from "../../api/exercises";
import { MultiSelectDropdown } from "react-native-paper-dropdown";
import { View, Text, TouchableOpacity } from "react-native";

jest.mock("../../api/exercises", () => ({
  fetchDropdownExercises: jest.fn(),
}));

jest.mock("react-native-paper-dropdown", () => ({
  MultiSelectDropdown: jest.fn(({ options, onSelect, value, ...props }) => (
    <DropdownMock
      options={options}
      onSelect={onSelect}
      value={value}
      {...props}
    />
  )),
}));

jest.mock("../DropdownInput/DropdownInput", () => "DropdownInput");

const DropdownMock = ({ options, onSelect, value, disabled }) => (
  <View>
    <TouchableOpacity
      testID="dropdown-button"
      accessibilityState={{ disabled }}
      onPress={() => {
        onSelect(options.map((option) => option.value));
      }}
    >
      <Text>Open Dropdown</Text>
    </TouchableOpacity>
  </View>
);

describe("ExerciseDropdown", () => {
  let queryClient;

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 0,
          retry: false,
        },
      },
    });
  });

  afterEach(() => {
    queryClient.clear();
    cleanup();
  });

  it("should generate the correct options from fetchDropdownExercises", async () => {
    const mockExercises = [
      { id: 1, title: "Exercise 1" },
      { id: 2, title: "Exercise 2" },
    ];

    (fetchDropdownExercises as jest.Mock).mockResolvedValue(mockExercises);

    render(
      <QueryClientProvider client={queryClient}>
        <ExerciseDropdown value={[]} onChange={() => {}} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(MultiSelectDropdown).toHaveBeenCalledWith(
        expect.objectContaining({
          options: [
            { label: "Exercise 1", value: "1" },
            { label: "Exercise 2", value: "2" },
          ],
        }),
        {}
      );
    });
  });

  it("should call onChange with the selected values", async () => {
    const mockExercises = [
      { id: 1, title: "Exercise 1" },
      { id: 2, title: "Exercise 2" },
    ];

    (fetchDropdownExercises as jest.Mock).mockResolvedValue(mockExercises);
    const mockOnChange = jest.fn();

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <ExerciseDropdown value={[]} onChange={mockOnChange} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(MultiSelectDropdown).toHaveBeenCalled();
    });

    await waitFor(() => {
      fireEvent.press(getByTestId("dropdown-button"));
      expect(mockOnChange).toHaveBeenCalledWith([1, 2]);
    });
  });

  it("should disable the dropdown when no data is available", async () => {
    (fetchDropdownExercises as jest.Mock).mockResolvedValue(null);

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <ExerciseDropdown value={[]} onChange={() => {}} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(MultiSelectDropdown).toHaveBeenCalled();
    });
    const dropdownButton = getByTestId("dropdown-button");

    expect(dropdownButton.props.accessibilityState.disabled).toBe(true);
  });
});
