import React from "react";
import { View, Text } from "react-native";
import { Divider, IconButton, TouchableRipple } from "react-native-paper";
import CustomButton from "../../components/CustomButton/CustomButton";
import { SessionListProps } from "./types";
import theme from "../../theme";

const SessionList: React.FC<SessionListProps> = ({
  sessions,
  onAddSession,
  onDelete,
}) => {
  return (
    <View style={{ gap: 16 }}>
      <Divider bold />
      <CustomButton onPress={() => onAddSession()}>
        Ajouter une session
      </CustomButton>
      {sessions.map(({ title }, i) => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: theme.colors.backgroundButton,
          }}
          key={i}
        >
          <TouchableRipple
            style={{ flex: 1, padding: 16 }}
            onPress={() => onAddSession(i)}
          >
            <Text style={{ color: theme.colors.text }}>{title}</Text>
          </TouchableRipple>
          <IconButton onPress={() => onDelete(i)} icon="delete" />
        </View>
      ))}
      <Divider bold />
    </View>
  );
};

export default SessionList;
