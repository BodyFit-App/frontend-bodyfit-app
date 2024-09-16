import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FollowerCard from "./FollowerCard";

describe("FollowerCard", () => {
  const mockProps = {
    username: "john_doe",
    fullName: "John Doe",
    profileImageUrl: "https://example.com/john.jpg",
    followersCount: 100,
    exercisesCount: 50,
    goalsCount: 10,
    followed: false,
    onFollowToggle: jest.fn(),
  };

  it("renders the basic information correctly", () => {
    const { getByText } = render(<FollowerCard {...mockProps} />);
    expect(getByText("@john_doe")).toBeTruthy();
    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("100 Suivis")).toBeTruthy();
    expect(getByText("50 Exercices créés")).toBeTruthy();
    expect(getByText("10 Objectifs atteints")).toBeTruthy();
  });

  it("calls onFollowToggle when the button is pressed", () => {
    const { getByText } = render(<FollowerCard {...mockProps} />);
    fireEvent.press(getByText("Suivre"));

    expect(mockProps.onFollowToggle).toHaveBeenCalled();
  });

  it('displays the correct button text depending on the "followed" state', () => {
    const { getByText: getByTextNotFollowed } = render(
      <FollowerCard {...mockProps} followed={false} />
    );
    expect(getByTextNotFollowed("Suivre")).toBeTruthy();

    const { getByText: getByTextFollowed } = render(
      <FollowerCard {...mockProps} followed={true} />
    );
    expect(getByTextFollowed("Suivi(e)")).toBeTruthy();
  });
  it('renders the default avatar when no profileImageUrl is provided', () => {
    const { getByTestId } = render(
      <FollowerCard
        {...mockProps}
        profileImageUrl={undefined}
      />
    );
  
    expect(getByTestId('default-avatar')).toBeTruthy();
  });
  
});
