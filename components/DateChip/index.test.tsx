import React from "react";
import { render } from "@testing-library/react-native";
import DateChip from ".";

describe("DateChip", () => {
  const mockPropsWithDate = {
    title: "Event",
    date: new Date("2023-09-21T00:00:00"),
  };

  const mockPropsWithoutDate = {
    title: "Event",
  };

  it("renders correctly with title and formatted date", () => {
    const { getByText } = render(<DateChip {...mockPropsWithDate} />);
    const formattedDate = mockPropsWithDate.date.toLocaleDateString();
    expect(getByText(mockPropsWithDate.title)).toBeTruthy();
    expect(getByText(formattedDate)).toBeTruthy();
  });

  it("renders correctly with title but without date", () => {
    const { getByText, queryByText } = render(
      <DateChip {...mockPropsWithoutDate} />
    );
    expect(getByText(mockPropsWithoutDate.title)).toBeTruthy();
    expect(queryByText(new RegExp("\\d{2}/\\d{2}/\\d{4}"))).toBeNull();
  });
});
