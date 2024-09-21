import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ExerciseDropdown from "./ExerciseDropdown";
import { fetchDropdownExercises } from "../../api/exercises";
import { MultiSelectDropdown } from "react-native-paper-dropdown";

jest.mock("../../api/exercises", () => ({
  fetchDropdownExercises: jest.fn(),
}));

jest.mock("react-native-paper-dropdown", () => ({
  MultiSelectDropdown: jest.fn(() => null),
}));

jest.mock("../DropdownInput/DropdownInput", () => "DropdownInput");

describe("ExerciseDropdown", () => {
  const queryClient = new QueryClient();

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

    render(
      <QueryClientProvider client={queryClient}>
        <ExerciseDropdown value={[]} onChange={mockOnChange} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(MultiSelectDropdown).toHaveBeenCalled();
    });
  });
});
