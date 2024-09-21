import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardScreen from "./";
import { useAuth } from "../../hooks/useAuth";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native-paper";

// Mocking the useAuth hook
jest.mock("../../hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

const queryClient = new QueryClient();

const mockProfile = {
  firstname: "John",
  lastname: "Doe",
  pseudo: "johnny",
  avatar_url: "test-avatar-url",
  followedBy: [],
  exercises: [
    {
      id: "1",
      title: "Push Up",
      estimated_time_seconds: 300,
      categories: [{ name: "Strength" }],
    },
    {
      id: "2",
      title: "Squat",
      estimated_time_seconds: 600,
      categories: [{ name: "Strength" }],
    },
  ],
  programs: [
    { id: "1", title: "Beginner Program", description: "A simple program" },
  ],
  goals: [
    {
      id: "1",
      title: "Lose Weight",
      description: "Lose 5kg",
      achieved: false,
      date_start: "2023-01-01",
      date_end: "2023-06-01",
    },
  ],
};

// Mocking the hooks
beforeEach(() => {
  (useAuth as jest.Mock).mockReturnValue({
    session: {
      user: {
        user_metadata: {
          profile_id: "123",
        },
      },
    },
    signOut: jest.fn(),
  });

  // Add query responses if using TanStack Query
  jest.mock("../../api/profiles", () => ({
    fetchProfileById: jest.fn().mockResolvedValue(mockProfile),
  }));
});

xdescribe("DashboardScreen", () => {
  it("renders profile header correctly with profile data", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <DashboardScreen route={{}} navigation={{}} />
        </NavigationContainer>
      </QueryClientProvider>
    );

    console.log("LOG", queryClient.getQueryData(["profile", 123]));

    // Wait for profile data to be rendered
    // expect(await screen.findByText("John Doe")).toBeTruthy();
    // expect(await screen.findByText("johnny")).toBeTruthy();
  });

  xit("renders goals correctly", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <DashboardScreen route={{}} navigation={{}} />
        </NavigationContainer>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.findByText("Mes objectifs")).toBeTruthy();
      expect(screen.findByText("Lose Weight")).toBeTruthy();
    });
  });

  xit("renders exercises correctly", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <DashboardScreen route={{}} navigation={{}} />
        </NavigationContainer>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.findByText("Mes exercices")).toBeTruthy();
      expect(screen.findByText("Push Up")).toBeTruthy();
    });
  });

  xit("renders programs correctly", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <DashboardScreen route={{}} navigation={{}} />
        </NavigationContainer>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.findByText("Mes programmes")).toBeTruthy();
      expect(screen.findByText("Beginner Program")).toBeTruthy();
    });
  });

  xit("displays activity button and handles press", async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <DashboardScreen route={{}} navigation={{}} />
        </NavigationContainer>
      </QueryClientProvider>
    );

    const activityButton = await waitFor(() => getByText("Temps"));
    expect(activityButton).toBeTruthy();
    fireEvent.press(activityButton);
    // Here you can check for expected behavior
  });

  xit("calls signOut when the user signs out", async () => {
    const { signOut } = useAuth();
    render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <DashboardScreen route={{}} navigation={{}} />
        </NavigationContainer>
      </QueryClientProvider>
    );

    // Simulate signing out
    await signOut();

    expect(signOut).toHaveBeenCalled();
  });

  xit("displays correct message when there is no progress data", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <DashboardScreen route={{}} navigation={{}} />
        </NavigationContainer>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Aucune donnée disponible")).toBeTruthy();
    });
  });

  xit('navigates to GoalListScreen when the first "Tout afficher" is pressed', async () => {
    const navigation = { push: jest.fn() };

    render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <DashboardScreen route={{}} navigation={navigation} />
        </NavigationContainer>
      </QueryClientProvider>
    );

    await waitFor(() => {
      // Get all instances of "Tout afficher"
      const allShowMoreButtons = screen.getAllByText("Tout afficher");
      expect(allShowMoreButtons).toHaveLength(3);

      // Press the first "Tout afficher"
      fireEvent.press(allShowMoreButtons[0]);
      expect(navigation.push).toHaveBeenCalledWith("GoalListScreen", {
        filters: { profile_id: "123" },
      });
    });
  });

  xit('navigates to ExerciseListScreen when the second "Tout afficher" is pressed', async () => {
    const navigation = { push: jest.fn() };

    render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <DashboardScreen route={{}} navigation={navigation} />
        </NavigationContainer>
      </QueryClientProvider>
    );

    await waitFor(() => {
      // Get all instances of "Tout afficher"
      const allShowMoreButtons = screen.getAllByText("Tout afficher");
      expect(allShowMoreButtons).toHaveLength(3);

      // Press the first "Tout afficher"
      fireEvent.press(allShowMoreButtons[1]);
      expect(navigation.push).toHaveBeenCalledWith("ExerciseListScreen", {
        filters: { profile_id: "123" },
      });
    });
  });

  xit('navigates to ProgramListScreen when the third "Tout afficher" is pressed', async () => {
    const navigation = { push: jest.fn() };

    render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <DashboardScreen route={{}} navigation={navigation} />
        </NavigationContainer>
      </QueryClientProvider>
    );

    await waitFor(() => {
      // Get all instances of "Tout afficher"
      const allShowMoreButtons = screen.getAllByText("Tout afficher");
      expect(allShowMoreButtons).toHaveLength(3);

      // Press the first "Tout afficher"
      fireEvent.press(allShowMoreButtons[2]);
      expect(navigation.push).toHaveBeenCalledWith("ProgramListScreen", {
        filters: { profile_id: "123" },
      });
    });
  });
});
