import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ProgramPanel from "./ProgramPanel";
import { FormData } from "./types";

jest.mock("../../components/CustomButton/CustomButton", () => "CustomButton");
jest.mock("./SessionList", () => "SessionList");
jest.mock("./ProgramForm", () => "ProgramForm");
jest.mock("./VisibilityToggle", () => "VisibilityToggle");
jest.mock("./DeleteModal", () => "DeleteModal");

const FormWrapper = ({
  onAddSession,
  onSubmit,
  setSessionToDelete,
  isEditMode,
}: {
  onAddSession: () => void;
  onSubmit: () => void;
  setSessionToDelete: React.Dispatch<React.SetStateAction<number[]>>;
  isEditMode: boolean;
}) => {
  const methods = useForm<FormData>({
    defaultValues: {
      sessions: [
        { id: 1, title: "Session 1" },
        { id: 2, title: "Session 2" },
      ],
    },
  });

  return (
    <FormProvider {...methods}>
      <ProgramPanel
        onAddSession={onAddSession}
        onSubmit={onSubmit}
        formContext={methods}
        isEditMode={isEditMode}
        setSessionToDelete={setSessionToDelete}
      />
    </FormProvider>
  );
};

describe("ProgramPanel Integration Test", () => {
  it("should handle form submission", async () => {
    const onAddSession = jest.fn();
    const onSubmit = jest.fn();
    const setSessionToDelete = jest.fn();

    const { getByTestId } = render(
      <FormWrapper
        onAddSession={onAddSession}
        onSubmit={onSubmit}
        setSessionToDelete={setSessionToDelete}
        isEditMode={false}
      />
    );

    fireEvent.press(getByTestId("confirm"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it("should render correct button text based on isEditMode", () => {
    const onAddSession = jest.fn();
    const onSubmit = jest.fn();
    const setSessionToDelete = jest.fn();

    const { getByTestId, rerender } = render(
      <FormWrapper
        onAddSession={onAddSession}
        onSubmit={onSubmit}
        setSessionToDelete={setSessionToDelete}
        isEditMode={false}
      />
    );

    expect(getByTestId("confirm").props.children).toBe("Confirmer");
    rerender(
      <FormWrapper
        onAddSession={onAddSession}
        onSubmit={onSubmit}
        setSessionToDelete={setSessionToDelete}
        isEditMode={true}
      />
    );

    expect(getByTestId("confirm").props.children).toBe("Modifier");
  });
});
