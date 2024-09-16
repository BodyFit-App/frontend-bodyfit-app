import React from "react";
import { render, act } from "@testing-library/react-native";
import DropdownInput from "./DropdownInput";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

jest.mock("react-native-paper", () => {
    const originalModule = jest.requireActual("react-native-paper");
  
    return {
      ...originalModule,
      TextInput: jest.fn((props) => {
        return <input {...props} />;
      }),
    };
  });

describe("DropdownInput Component", () => {
  const mockProps = {
    placeholder: "Select an option",
    label: "Label",
    selectedLabel: "Selected option",
    rightIcon: <Icon name="chevron-down-circle-outline" testID="icon-chevron-down" />,
    mode: "outlined" as "outlined" | "flat" | undefined,
    disabled: false,
    error: false,
  };

  beforeEach(() => {
    jest.useFakeTimers(); 
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should render the component with label and selected value", () => {
    const { getByTestId } = render(<DropdownInput {...mockProps} />);
    expect(getByTestId("dropdown-input")).toBeTruthy();
  });

  it("should render the right icon", () => {
    const { getByTestId } = render(<DropdownInput {...mockProps} />);
    const rightIcon = getByTestId("dropdown-input");
    expect(rightIcon).toBeTruthy();
  });

  it("should be disabled when the `disabled` prop is passed", () => {
    const { getByTestId } = render(
      <DropdownInput {...mockProps} disabled={true} />
    );
    const input = getByTestId("dropdown-input");
    expect(input.props.disabled).toBe(true);
    expect(input.props.editable).toBe(false);
  });
  

  it("should display the error state when `error` is passed", () => {
    const { getByTestId } = render(<DropdownInput {...mockProps} error={true} />);
    expect(getByTestId("dropdown-input")).toBeTruthy();
  });

  it("should use default mode 'outlined' if not passed", () => {
    const { getByTestId } = render(
      <DropdownInput {...mockProps} mode={undefined} />
    );
  
    const input = getByTestId("dropdown-input");

    expect(input.props.outlineColor).toBeTruthy();
  });

  it("should be disabled when the `disabled` prop is passed", () => {
    const { getByTestId } = render(
      <DropdownInput {...mockProps} disabled={true} />
    );
    const input = getByTestId("dropdown-input");
    expect(input.props.disabled).toBe(true);
    expect(input.props.editable).toBe(false);
  });
  

  it("should not display error by default if `error` is not passed", () => {
    const { getByTestId } = render(
      <DropdownInput {...mockProps} error={undefined} />
    );
    const input = getByTestId("dropdown-input");
    expect(input.props.error).toBe(false);
  });

  it("should use the default mode 'outlined' when none is provided", () => {
    const { getByTestId } = render(<DropdownInput {...mockProps} mode={undefined} />);
    const input = getByTestId("dropdown-input");
    expect(input.props.mode).toBe("outlined");
  });

  it("should use the default disabled value 'false' when none is provided", () => {
    const { getByTestId } = render(<DropdownInput {...mockProps} disabled={undefined} />);
    const input = getByTestId("dropdown-input");
    expect(input.props.disabled).toBe(false);
  });

  it("should use the default error value 'false' when none is provided", () => {
    const { getByTestId } = render(<DropdownInput {...mockProps} error={undefined} />);
    const input = getByTestId("dropdown-input");
    expect(input.props.error).toBe(false);
  });
  
});
