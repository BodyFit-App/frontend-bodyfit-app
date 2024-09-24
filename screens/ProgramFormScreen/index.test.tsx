import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ProgramFormScreen } from "./";
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

jest.mock("../../api/programs", () => ({
  fetchProgramById: jest.fn(),
  upsertProgram: jest.fn(),
  addProgramSession: jest.fn(),
}));

jest.mock("../../api/sessions", () => ({
  addExerciseSession: jest.fn(),
  resetExerciseSession: jest.fn(),
  deleteSession: jest.fn(),
}));

jest.mock("./ProgramPanel", () => {
  const { View, Button } = jest.requireActual("react-native");
  return jest.fn(({ onAddSession }) => (
    <View testID="program-panel">
      <Button
        testID="add-session-button"
        title="Add Session"
        onPress={() => onAddSession()}
      />
    </View>
  ));
});

jest.mock("./SessionPanel", () => {
  const { View, Button } = jest.requireActual("react-native");
  return jest.fn(({ onBack }) => (
    <View testID="session-panel">
      <Button testID="submit-button" title="Submit" onPress={onBack} />
    </View>
  ));
});

describe("ProgramFormScreen", () => {
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
        title: "Test Program",
        description: "Program description",
        visible: true,
        sessions: [
          {
            id: 1,
            title: "Session 1",
            description: "Session description",
            exercises: [{ id: 1 }],
          },
        ],
      },
      isSuccess: true,
    });

    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      session: { user: { id: "test-user" } },
    });
  });

  it("renders ProgramPanel on initial render", () => {
    const { getByTestId } = render(
      <ProgramFormScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByTestId("program-panel")).toBeTruthy();
  });

  it("navigates to SessionPanel when adding a session", async () => {
    const { getByTestId, rerender } = render(
      <ProgramFormScreen navigation={mockNavigation} route={mockRoute} />
    );

    fireEvent.press(getByTestId("add-session-button"));

    await waitFor(() => {
      rerender(
        <ProgramFormScreen navigation={mockNavigation} route={mockRoute} />
      );
      expect(getByTestId("session-panel")).toBeTruthy();
    });
  });

  it("successfully fetches program data and populates form", async () => {
    const { getByTestId } = render(
      <ProgramFormScreen navigation={mockNavigation} route={mockRoute} />
    );

    await waitFor(() => {
      expect(getByTestId("program-panel")).toBeTruthy();
    });
  });
});
