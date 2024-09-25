import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Avatar, Button } from "react-native-paper";
import CustomButton from "../CustomButton/CustomButton";
import theme from "../../theme";

/**
 * Props for the FollowerCard component.
 *
 * @typedef {Object} FollowerCardProps
 * @property {string} [username] - The user's unique username.
 * @property {string} [fullName] - The user's full name.
 * @property {string} [profileImageUrl] - The URL of the user's profile image. If no image is provided, a default image is used.
 * @property {number} [followersCount] - The number of people following this user.
 * @property {number} [exercisesCount] - The number of exercises created by the user.
 * @property {number} [goalsCount] - The number of goals the user has achieved.
 * @property {boolean} [followed] - Indicates whether the current user is following this user.
 * @property {() => void} [onFollowToggle] - Function called when the follow/unfollow button is pressed.
 * @property {() => void} [onPressPseudo] - Function called when the username (pseudo) is pressed.
 */

/**
 * FollowerCard component displays a user's follower information, including their username, full name, 
 * profile image, and statistics. It also includes a button to follow or unfollow the user.
 *
 * @param {FollowerCardProps} props - The props for the FollowerCard component.
 * @returns {JSX.Element} A JSX element representing the follower card.
 */

interface FollowerCardProps {
  username?: string;
  fullName?: string;
  profileImageUrl?: string;
  followersCount?: number;
  exercisesCount?: number;
  goalsCount?: number;
  followed?: boolean;
  onFollowToggle?: () => void;
  onPressPseudo?: () => void;
}

const FollowerCard: React.FC<FollowerCardProps> = ({
  username,
  fullName,
  profileImageUrl,
  followersCount,
  exercisesCount,
  goalsCount,
  followed,
  onFollowToggle,
  onPressPseudo,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
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
          <Text style={styles.username} onPress={onPressPseudo}>
            @{username}
          </Text>
          <Text style={styles.fullName}>{fullName}</Text>
        </View>
        <Button
          style={styles.button}
          mode="contained"
          labelStyle={{ fontSize: 10 }}
          textColor={followed ? "#ffffff" : "#2F80ED"}
          buttonColor={followed ? "#2F80ED" : "transparent"}
          //{...(followed ? { style: { backgroundColor: theme.colors.primary, borderWidth: 0}} : "")}
          //{...(followed ? { textColor: theme.colors.textFollow } : "")}
          onPress={onFollowToggle}
        >
          {followed ? "Suivi(e)" : "Suivre"}
        </Button>
      </Card.Content>
      <View style={styles.statsContainer}>
        <Text variant="labelSmall" style={styles.statTextCount}>
          {followersCount}{" "}
          <Text variant="labelSmall" style={styles.statText}>
            Suivis
          </Text>
        </Text>
        <Text variant="labelSmall" style={styles.statTextCount}>
          {exercisesCount}{" "}
          <Text variant="labelSmall" style={styles.statText}>
            Exercices créés
          </Text>
        </Text>
        <Text variant="labelSmall" style={styles.statTextCount}>
          {goalsCount}{" "}
          <Text variant="labelSmall" style={styles.statText}>
            Objectifs atteints
          </Text>
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#161626",
    marginBottom: 10,
    borderRadius: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    color: "#2F80ED",
    fontWeight: "bold",
  },
  fullName: {
    color: "#ffffff",
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "center",
  },
  statText: {
    color: "#A0A0A0",
    marginRight: 10,
  },
  statTextCount: {
    color: "#2F80ED",
    marginRight: 10,
  },
  button: {
    borderColor: "#42424D",
    borderRadius: 6,
    borderWidth: 1,
    marginRight: 10,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

export default FollowerCard;
