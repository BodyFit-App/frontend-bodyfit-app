// CustomButton.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import CustomButton from "./CustomButton";
import theme from "../../theme";
import { fireEvent } from "@testing-library/react-native";

xdescribe("CustomButton", () => {
  it("should render correctly with children", () => {
    const { getByText } = render(<CustomButton>Click me</CustomButton>);
    expect(getByText("Click me")).toBeTruthy();
  });

  it("should call onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <CustomButton onPress={onPressMock}>Click me</CustomButton>
    );
    const button = getByRole("button");

    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
