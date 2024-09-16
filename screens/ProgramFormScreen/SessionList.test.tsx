import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SessionList from "./SessionList";
import { SessionListProps } from "./types";

const mockSessions = [{ title: "Session 1" }, { title: "Session 2" }];

const mockOnAddSession = jest.fn();
const mockOnDelete = jest.fn();

describe("SessionList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render and handle 'Ajouter une session' button click", () => {
    const { getByText } = render(
      <SessionList
        sessions={mockSessions}
        onAddSession={mockOnAddSession}
        onDelete={mockOnDelete}
      />
    );

    const addButton = getByText("Ajouter une session");
    fireEvent.press(addButton);
    expect(mockOnAddSession).toHaveBeenCalled();
  });

  it("should render sessions and handle session touch and delete button clicks", () => {
    const { getByTestId } = render(
      <SessionList
        sessions={mockSessions}
        onAddSession={mockOnAddSession}
        onDelete={mockOnDelete}
      />
    );

    const addButton = getByTestId("add-session-0");

    fireEvent.press(addButton);
    expect(mockOnAddSession).toHaveBeenCalledWith(0);

    const deleteButton = getByTestId("delete-session-0");

    fireEvent.press(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith(0);
  });
});
