import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import OtherProfilHeader from "./OtherProfileHeader";

const mockProps = {
  firstname: "John",
  lastname: "Doe",
  username: "johndoe",
  followers: 100,
  profileImage: "https://example.com/image.jpg",
  exercisesCount: 10,
  programsCount: 5,
  goalsCount: 3,
  followed: false,
  onFollowToggle: jest.fn(),
};

describe("OtherProfilHeader Component", () => {
  it("renders correctly with provided props", () => {
    const { getByText, getByTestId } = render(
      <OtherProfilHeader {...mockProps} />
    );

    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("@johndoe")).toBeTruthy();
    expect(getByText("100 followers")).toBeTruthy();
    expect(getByText("10")).toBeTruthy();
    expect(getByText("Exercices")).toBeTruthy();
    expect(getByText("5")).toBeTruthy();
    expect(getByText("Programmes")).toBeTruthy();
    expect(getByText("3")).toBeTruthy();
    expect(getByText("Objectifs")).toBeTruthy();
    const profileImage = getByTestId("profile-image");
    expect(profileImage.props.source.uri).toBe(mockProps.profileImage);
  });

  it("toggles follow status when button is pressed", () => {
    const { getByText } = render(<OtherProfilHeader {...mockProps} />);

    const button = getByText("Suivre");
    fireEvent.press(button);

    expect(mockProps.onFollowToggle).toHaveBeenCalled();
  });

  it('displays "Suivi(e)" when followed is true', () => {
    const { getByText } = render(
      <OtherProfilHeader {...{ ...mockProps, followed: true }} />
    );

    expect(getByText("Suivi(e)")).toBeTruthy();
  });

  it("matches the snapshot", () => {
    const tree = render(<OtherProfilHeader {...mockProps} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
