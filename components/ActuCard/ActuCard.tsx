import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text, Card } from "react-native-paper";
/**
 * Props for the `ActuCard` component.
 *
 * @typedef {Object} ActuCardProps
 * @property {string} username - The username of the exercise creator.
 * @property {string} fullName - The full name of the user.
 * @property {string} [profileImageUrl] - The URL of the user's profile image (optional). A default image is used if not provided.
 * @property {string} [actionDescription] - Description of the action performed (e.g., "created a new exercise").
 * @property {string} [exerciseLinkText] - The text for the exercise link (optional).
 * @property {Function} onActivityPress - Function called when the exercise link is pressed.
 * @property {Function} onUsernamePress - Function called when the username is pressed.
 */

/**
 * `ActuCard` component displays information about an action performed by a user
 * within a card. It shows an avatar, full name, clickable username,
 * action description, and a clickable link to the exercise.
 *
 * @param {ActuCardProps} props - The props for the `ActuCard` component.
 * @returns {JSX.Element} The rendered activity card.
 */

interface ActuCardProps {
  username: string;
  fullName: string;
  profileImageUrl?: string;
  actionDescription?: string;
  exerciseLinkText?: string;
  onActivityPress: () => void;
  onUsernamePress: () => void;
}

const ActuCard: React.FC<ActuCardProps> = ({
  username,
  fullName,
  profileImageUrl,
  actionDescription,
  exerciseLinkText,
  onActivityPress,
  onUsernamePress,
}) => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <Card style={styles.card}>
      <View style={styles.headerContainer}>
        <Avatar.Image
          size={50}
          source={
            profileImageUrl
              ? { uri: profileImageUrl }
              : require("../../assets/default-avatar.png")
          }
          testID={profileImageUrl ? "profile-image" : "default-avatar"}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.fullName}>
            {fullName}{" "}
            <Text style={styles.username} onPress={onUsernamePress}>
              @{username}
            </Text>
          </Text>
          <Text variant="labelSmall" style={styles.description}>
            {actionDescription}{" "}
            <Text style={styles.link} onPress={onActivityPress}>
              {truncateText(exerciseLinkText ?? "", 15)}
            </Text>
          </Text>
        </View>
      </View>
    </Card>
  );
};

/**
 * Interface for `ActuCard` component props.
 */

const styles = StyleSheet.create({
  card: {
    backgroundColor: "transparent",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    borderBottomColor: "#36363e",
    borderBottomWidth: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  fullName: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  username: {
    color: "#2F80ED",
    marginTop: 2,
    marginLeft: 5,
  },
  description: {
    color: "#A0A0A0",
    marginTop: 1,
  },
  link: {
    color: "#2F80ED",
    textDecorationLine: "underline",
  },
});

export default ActuCard;
