import React from "react";
import { FAB, Portal } from "react-native-paper";

export const FabHome = ({ navigation }: any) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? "calendar-today" : "plus"}
        actions={[
          {
            icon: "star",
            label: "Star",
            onPress: () => navigation.push("GoalFormScreen", {}),
          },
          {
            icon: "email",
            label: "Email",
            onPress: () => navigation.push("ExerciseFormScreen", {}),
          },
          {
            icon: "bell",
            label: "Remind",
            onPress: () => navigation.push("ProgramFormScreen", {}),
          },
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
};
