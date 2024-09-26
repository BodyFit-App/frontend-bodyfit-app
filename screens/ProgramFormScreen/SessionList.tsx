import React from "react";
import { View, Text } from "react-native";
import { Divider, IconButton, TouchableRipple } from "react-native-paper";
import CustomButton from "../../components/CustomButton/CustomButton";
import { SessionListProps } from "./types";
import theme from "../../theme";

/**
 * SessionList Component
 *
 * This component displays a list of sessions. Each session includes a title and options to either edit or delete the session.
 * The component also provides a button to add new sessions.
 *
 * @component
 * @example
 * // Example usage
 * return (
 *   <SessionList
 *     sessions={sessions}
 *     onAddSession={handleAddSession}
 *     onDelete={handleDeleteSession}
 *   />
 * );
 *
 * @param {Object} props - The props for the SessionList component.
 * @param {Array<Object>} props.sessions - An array of session objects, each containing a title.
 * @param {Function} props.onAddSession - Callback function triggered to add or edit a session. It can optionally take an index to edit a session.
 * @param {Function} props.onDelete - Callback function triggered to delete a session.
 *
 * @returns {JSX.Element} The SessionList component.
 */

const SessionList = ({
  sessions,
  onAddSession,
  onDelete,
}: SessionListProps) => {
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
            testID={`add-session-${i}`}
            style={{ flex: 1, padding: 16 }}
            onPress={() => onAddSession(i)}
          >
            <Text style={{ color: theme.colors.text }}>{title}</Text>
          </TouchableRipple>
          <IconButton
            testID={`delete-session-${i}`}
            onPress={() => onDelete(i)}
            icon="delete"
          />
        </View>
      ))}
      <Divider bold />
    </View>
  );
};

export default SessionList;
