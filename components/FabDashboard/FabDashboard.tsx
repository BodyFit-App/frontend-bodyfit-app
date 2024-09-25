import React from "react";
import { FAB, Portal } from "react-native-paper";
import theme from "../../theme";

/**
 * `FabDashboard` component renders a floating action button (FAB) group with multiple actions
 * to navigate to different forms for creating goals, exercises, and programs.
 *
 * @param {Object} props - The props for the `FabDashboard` component.
 * @param {Object} props.navigation - The navigation object provided by React Navigation to handle screen navigation.
 * @returns {JSX.Element} The floating action button (FAB) group with actions for navigating to different screens.
 */

export const FabDashboard = ({ navigation }: any) => {
  const [state, setState] = React.useState({ open: false });

  /**
   * Handles the state change for opening and closing the FAB group.
   *
   * @param {Object} state - The new state of the FAB group.
   * @param {boolean} state.open - Indicates whether the FAB group is open or closed.
   */

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        open={open}
        fabStyle={{ backgroundColor: theme.colors.primary }}
        visible
        testID="fab-icon"
        icon={open ? "pen" : "plus"}
        actions={[
          {
            icon: "target",
            label: "Créer un objectif",
            color: theme.colors.primary,
            style: {
              borderWidth: 1,
              borderColor: theme.colors.primary,
              backgroundColor: theme.colors.backgroundButton,
            },
            labelTextColor: theme.colors.primary,
            onPress: () => navigation.push("GoalFormScreen", {}),
            testID: "fab-action-goal",
          },
          {
            icon: "run-fast",
            label: "Créer un exercice",
            color: theme.colors.primary,
            style: {
              borderWidth: 1,
              borderColor: theme.colors.primary,
              backgroundColor: theme.colors.backgroundButton,
            },
            labelTextColor: theme.colors.primary,
            onPress: () => navigation.push("ExerciseFormScreen", {}),
            testID: "fab-action-exercise",
          },
          {
            icon: "progress-clock",
            label: "Créer un programme",
            color: theme.colors.primary,
            style: {
              borderWidth: 1,
              borderColor: theme.colors.primary,
              backgroundColor: theme.colors.backgroundButton,
            },
            labelTextColor: theme.colors.primary,
            onPress: () => navigation.push("ProgramFormScreen", {}),
            testID: "fab-action-program",
          },
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
};
