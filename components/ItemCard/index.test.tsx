import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ItemCard from ".";

const mockProps = {
  title: "Test Title",
  pseudo: "TestUser",
  description: "This is a test description.",
  categories: ["Category1", "Category2"],
  time: 30,
  total: 5,
  onPressNav: jest.fn(),
  isFav: false,
  onPressFav: jest.fn(),
};

describe("ItemCard Component", () => {
  it("renders correctly with provided props", () => {
    const { getByText } = render(<ItemCard {...mockProps} />);

    expect(getByText("@testuser")).toBeTruthy();
    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText("This is a test description.")).toBeTruthy();
    expect(getByText("30 min")).toBeTruthy();
    expect(getByText("5")).toBeTruthy();
    expect(getByText("Category1 • Category2")).toBeTruthy();
  });

  it("handles navigation on press", () => {
    const { getByText } = render(<ItemCard {...mockProps} />);

    fireEvent.press(getByText("Test Title"));
    expect(mockProps.onPressNav).toHaveBeenCalled();
  });

  it("handles favorite button press", () => {
    const { getByRole } = render(<ItemCard {...mockProps} />);

    fireEvent.press(getByRole("button"));
    expect(mockProps.onPressFav).toHaveBeenCalled();
  });

  it("does not render favorite button when not needed", () => {
    const { getByText } = render(<ItemCard {...mockProps} isFav={undefined} />);
    expect(() => getByText("star")).toThrow(); // Adjust as needed for icon presence
  });

  it("matches the snapshot", () => {
    const tree = render(<ItemCard {...mockProps} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
