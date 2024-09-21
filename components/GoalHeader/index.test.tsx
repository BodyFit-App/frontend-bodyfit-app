import React from "react";
import { render } from "@testing-library/react-native";
import GoalHeader from ".";

const mockProps = {
  title: "Test Goal",
  imageUrl: "https://example.com/image.png",
  startDate: new Date("2024-01-01"),
  endDate: new Date("2024-12-31"),
  progress: 0.5,
};

describe("GoalHeader Component", () => {
  it("renders correctly with provided props", () => {
    const { getByText, getByTestId } = render(<GoalHeader {...mockProps} />);

    expect(getByText("Test Goal")).toBeTruthy();
    expect(getByText("Date de début")).toBeTruthy();
    expect(getByText("Date de fin")).toBeTruthy();
    expect(getByTestId("training-image").props.source.uri).toBe(
      mockProps.imageUrl
    );
  });

  it("displays the correct progress", () => {
    const { getByText } = render(<GoalHeader {...mockProps} />);
    expect(getByText("50%")).toBeTruthy();
  });

  it("matches the snapshot", () => {
    const tree = render(<GoalHeader {...mockProps} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
