import React from "react";
import { FAB, Portal } from "react-native-paper";
import theme from "../../theme";

export const FabDashboard = ({ navigation }: any) => {
  const [state, setState] = React.useState({ open: false });

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
            style: { borderWidth: 1, borderColor: theme.colors.primary, backgroundColor: theme.colors.backgroundButton },
            labelTextColor: theme.colors.primary,
            onPress: () => navigation.push("GoalFormScreen", {}),
            testID: 'fab-action-goal',
          },
          {
            icon: "run-fast",
            label: "Créer un exercice",
            color: theme.colors.primary,
            style: { borderWidth: 1, borderColor: theme.colors.primary, backgroundColor: theme.colors.backgroundButton },
            labelTextColor: theme.colors.primary,
            onPress: () => navigation.push("ExerciseFormScreen", {}),
            testID: 'fab-action-exercise', 
          },
          {
            icon: "progress-clock",
            label: "Créer un programme",
            color: theme.colors.primary,
            style: { borderWidth: 1, borderColor: theme.colors.primary, backgroundColor: theme.colors.backgroundButton },
            labelTextColor: theme.colors.primary,
            onPress: () => navigation.push("ProgramFormScreen", {}),
            testID: 'fab-action-program',
          },
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
};
