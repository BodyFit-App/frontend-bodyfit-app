import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dropdown } from "react-native-paper-dropdown";
import { fetchDropdownPrograms } from "../../api/programs";
import ProgramDropdown from "./ProgramDropdown";

jest.mock("../../api/programs", () => ({
  fetchDropdownPrograms: jest.fn(),
}));

jest.mock("react-native-paper-dropdown", () => ({
  Dropdown: jest.fn(() => null),
}));

jest.mock("../DropdownInput/DropdownInput", () => "DropdownInput");

describe("ProgramDropdown", () => {
  const queryClient = new QueryClient();

  it("should generate the correct options from fetchDropdownPrograms", async () => {
    const mockPrograms = [
      { id: 1, title: "Program 1" },
      { id: 2, title: "Program 2" },
    ];

    (fetchDropdownPrograms as jest.Mock).mockResolvedValue(mockPrograms);

    render(
      <QueryClientProvider client={queryClient}>
        <ProgramDropdown value={null} onChange={() => {}} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(Dropdown).toHaveBeenCalledWith(
        expect.objectContaining({
          options: [
            { label: "Program 1", value: "1" },
            { label: "Program 2", value: "2" },
          ],
        }),
        {}
      );
    });
  });
});
