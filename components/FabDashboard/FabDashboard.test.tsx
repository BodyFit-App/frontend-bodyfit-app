import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import { FabDashboard } from "./FabDashboard";
import { Provider as PaperProvider } from "react-native-paper";

jest.mock("react-native-paper", () => {
  const actualPaper = jest.requireActual("react-native-paper");
  return {
    ...actualPaper,
    Portal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe("FabDashboard Component", () => {
  const mockNavigation = {
    push: jest.fn(),
  };

  const renderWithProvider = (component: React.ReactNode) => {
    return render(<PaperProvider>{component}</PaperProvider>);
  };

  it("should render the FAB with the plus icon initially", () => {
    const { getByTestId } = renderWithProvider(
      <FabDashboard navigation={mockNavigation} />
    );

    const plusIcon = getByTestId("fab-icon-container");
    expect(plusIcon).toBeTruthy();
  });

  it("should change the icon when the FAB is open", () => {
    const { getByTestId } = renderWithProvider(
      <FabDashboard navigation={mockNavigation} />
    );

    const fabButton = getByTestId("fab-icon");
    fireEvent.press(fabButton);

    const currentIcon = getByTestId("cross-fade-icon-current");
    expect(currentIcon).toBeTruthy();
  });

  xit("should navigate to GoalFormScreen when the goal action is pressed", async () => {
    const { getByTestId } = renderWithProvider(
      <FabDashboard navigation={mockNavigation} />
    );

    // Verifier que le fab est ouvert
    const currentIcon = getByTestId("cross-fade-icon-current");
    expect(currentIcon).toBeTruthy();

    console.log("currentIcon", currentIcon);

    // Verifier que l'action goal est presente
    const goalAction = getByTestId("fab-action-goal");
    expect(goalAction).toBeTruthy();
  });
});
