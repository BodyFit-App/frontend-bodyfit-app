import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useForm, FormProvider } from "react-hook-form";
import ProgramForm from "./ProgramForm";
import { FormData } from "./types";

jest.mock("../../components/TextField/TextField", () => "TextField");

const FormWrapper = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <ProgramForm control={methods.control} />
    </FormProvider>
  );
};

describe("ProgramForm Integration Test", () => {
  it("should handle form input and validation", async () => {
    const { getByTestId } = render(<FormWrapper />);

    expect(getByTestId("title")).toBeTruthy();
    expect(getByTestId("description")).toBeTruthy();

    fireEvent.changeText(getByTestId("title"), "Running");
    fireEvent.changeText(getByTestId("description"), "Ensure proper equipment");

    await waitFor(() => {
      expect(getByTestId("title").props.value).toBe("Running");
      expect(getByTestId("description").props.value).toBe(
        "Ensure proper equipment"
      );
    });
  });

  it("should apply validation rules", async () => {
    const { getByTestId } = render(<FormWrapper />);

    expect(getByTestId("title")).toBeTruthy();
    expect(getByTestId("description")).toBeTruthy();

    fireEvent.changeText(getByTestId("title"), "");
    fireEvent.changeText(getByTestId("description"), "Some description");
  });
});
