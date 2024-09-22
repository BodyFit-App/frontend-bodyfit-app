import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ProgramPanel from "./ProgramPanel";

jest.mock("./ProgramForm", () => {
  const { View } = jest.requireActual("react-native");
  return jest.fn(() => <View testID="program-form" />);
});

jest.mock("./SessionList", () => {
  const { View, Button } = jest.requireActual("react-native");
  return jest.fn(({ onDelete }) => (
    <View testID="session-list">
      <Button
        testID="session-list-delete-button"
        title="Delete Session"
        onPress={() => onDelete(0)}
      />
    </View>
  ));
});

jest.mock("./VisibilityToggle", () => {
  const { View } = jest.requireActual("react-native");
  return jest.fn(() => <View testID="visibility-toggle" />);
});

jest.mock("./DeleteModal", () => {
  const { View, Button } = jest.requireActual("react-native");
  return jest.fn(({ visible, onClose, onConfirm }) =>
    visible ? (
      <View testID="delete-modal">
        <Button title="Confirm" onPress={onConfirm} />
        <Button title="Close" onPress={onClose} />
      </View>
    ) : null
  );
});

describe("ProgramPanel", () => {
  const mockFormContext = {
    control: {},
    handleSubmit: jest.fn((fn) => fn),
    getValues: jest.fn(() => ({
      sessions: [
        { id: 1, name: "Session 1" },
        { id: 2, name: "Session 2" },
      ],
    })),
    setValue: jest.fn(),
  };

  const mockOnSubmit = jest.fn();
  const mockOnAddSession = jest.fn();
  const mockSetSessionToDelete = jest.fn();

  it("renders all components correctly", () => {
    const { getByTestId } = render(
      <ProgramPanel
        onAddSession={mockOnAddSession}
        onSubmit={mockOnSubmit}
        formContext={mockFormContext}
        isEditMode={false}
        setSessionToDelete={mockSetSessionToDelete}
      />
    );

    expect(getByTestId("program-form")).toBeTruthy();
    expect(getByTestId("session-list")).toBeTruthy();
    expect(getByTestId("visibility-toggle")).toBeTruthy();
    expect(getByTestId("confirm")).toBeTruthy();
  });

  it("submits the form when the confirm button is pressed", () => {
    const { getByTestId } = render(
      <ProgramPanel
        onAddSession={mockOnAddSession}
        onSubmit={mockOnSubmit}
        formContext={mockFormContext}
        isEditMode={false}
        setSessionToDelete={mockSetSessionToDelete}
      />
    );

    fireEvent.press(getByTestId("confirm"));

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("opens delete modal and deletes session when confirmed", async () => {
    const { getByTestId, queryByTestId } = render(
      <ProgramPanel
        onAddSession={mockOnAddSession}
        onSubmit={mockOnSubmit}
        formContext={mockFormContext}
        isEditMode={false}
        setSessionToDelete={mockSetSessionToDelete}
      />
    );

    fireEvent.press(getByTestId("session-list-delete-button"));
    expect(queryByTestId("delete-modal")).toBeTruthy();

    fireEvent.press(getByTestId("delete-modal").children[0]);

    await waitFor(() => {
      expect(mockSetSessionToDelete).toHaveBeenCalledWith(expect.any(Function));
      expect(mockFormContext.setValue).toHaveBeenCalledWith("sessions", [
        { id: 2, name: "Session 2" },
      ]);
      expect(queryByTestId("delete-modal")).toBeFalsy();
    });
  });
});
