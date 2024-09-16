import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import { useForm } from "react-hook-form";
import VisibilityToggle from "./VisibilityToggle";
import { FormData } from "./types";

const MockComponent: React.FC = () => {
  const { control } = useForm<FormData>({
    defaultValues: { visible: false },
  });

  return <VisibilityToggle control={control} />;
};

describe("VisibilityToggle", () => {
  it("should render and toggle switch", async () => {
    const { getByText, getByRole } = render(<MockComponent />);

    getByText("Je souhaite partager ce programme");

    const switchElement = getByRole("switch");

    expect(switchElement).toBeTruthy();

    fireEvent(switchElement, "valueChange", true);

    expect(switchElement.props.value).toBe(true);
  });
});
