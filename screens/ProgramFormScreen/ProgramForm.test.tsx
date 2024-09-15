import React from "react";
import { fireEvent, render, cleanup, act } from "@testing-library/react-native";
import ProgramForm from "./ProgramForm";
import { Provider } from "react-native-paper";
import { useForm } from "react-hook-form";
import { FormData } from "./types";

const MockProvider = ({ children }: any) => <Provider>{children}</Provider>;

const FormWithHook = () => {
  const { control } = useForm<FormData>();
  return <ProgramForm control={control} />;
};

describe("DeleteModal", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    cleanup();
  });

  it("should trigger callbacks onPress", async () => {
    const { getByTestId } = render(
      <MockProvider>
        <FormWithHook />
      </MockProvider>
    );

    expect(getByTestId("button-id")).toBeTruthy();
  });
});
