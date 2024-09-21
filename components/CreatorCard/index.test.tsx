import React from "react";
import { render } from "@testing-library/react-native";
import CreatorCard from ".";

describe("CreatorCard", () => {
  const mockProps = {
    firstname: "John",
    lastname: "Doe",
    pseudo: "johndoe",
    avatarUrl: "https://example.com/avatar.png",
  };

  it("renders correctly with the given props", () => {
    const { getByText, getByTestId } = render(<CreatorCard {...mockProps} />);

    // Check if the avatar is rendered with the correct source
    const avatarImage = getByTestId("avatar-image");
    expect(avatarImage.props.source).toEqual({ uri: mockProps.avatarUrl });

    // Check if the first and last names are rendered
    expect(
      getByText(`${mockProps.firstname} ${mockProps.lastname}`)
    ).toBeTruthy();

    // Check if the pseudo is rendered
    expect(getByText(`@${mockProps.pseudo}`)).toBeTruthy();
  });
});
