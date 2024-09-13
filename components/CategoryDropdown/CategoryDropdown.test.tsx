import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CategoryDropdown from "./CategoryDropdown";
import { fetchCategories } from "../../api/categories";
import { MultiSelectDropdown } from "react-native-paper-dropdown";

// Mock de fetchCategories
jest.mock("../../api/categories", () => ({
  fetchCategories: jest.fn(),
}));

// Mock pour MultiSelectDropdown
jest.mock("react-native-paper-dropdown", () => ({
  MultiSelectDropdown: jest.fn(() => null),
}));

describe("CategoryDropdown", () => {
  const queryClient = new QueryClient();

  it("should generate the correct options from fetchCategories", async () => {
    const mockCategories = [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ];

    (fetchCategories as jest.Mock).mockResolvedValue(mockCategories);

    render(
      <QueryClientProvider client={queryClient}>
        <CategoryDropdown value={[]} onChange={() => {}} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(MultiSelectDropdown).toHaveBeenCalledWith(
        expect.objectContaining({
          options: [
            { label: "Category 1", value: "1" },
            { label: "Category 2", value: "2" },
          ],
        }),
        {}
      );
    });
  });
});
