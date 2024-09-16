import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import DeleteModal from "./DeleteModal";
import { Provider } from "react-native-paper";

const MockProvider = ({ children }: any) => <Provider>{children}</Provider>;

describe("DeleteModal", () => {
  it("should trigger callbacks onPress", () => {
    const mockOnConfirm = jest.fn();
    const mockOnClose = jest.fn();

    const { getByTestId } = render(
      <MockProvider>
        <DeleteModal
          visible={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
        />
      </MockProvider>
    );

    fireEvent.press(getByTestId("button-confirm"));
    expect(mockOnConfirm).toHaveBeenCalled();

    fireEvent.press(getByTestId("button-close"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
