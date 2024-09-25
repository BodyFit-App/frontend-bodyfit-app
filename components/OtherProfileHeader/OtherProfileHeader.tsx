import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Text, Button } from "react-native-paper";
import CustomButton from "../CustomButton/CustomButton";
import theme from "../../theme";

/**
 * `OtherProfilHeader` component displays a user's profile information, including name, username,
 * number of followers, and statistics on exercises, programs, and goals created.
 * It also includes a button to follow or unfollow the user.
 *
 * @component
 * @example
 * const handleFollowToggle = () => {
 *   console.log('Follow/unfollow the user');
 * };
 * return (
 *   <OtherProfilHeader
 *     firstname="John"
 *     lastname="Doe"
 *     username="johndoe"
 *     followers={100}
 *     profileImage="https://example.com/image.jpg"
 *     exercisesCount={10}
 *     programsCount={5}
 *     goalsCount={3}
 *     followed={false}
 *     onFollowToggle={handleFollowToggle}
 *   />
 * );
 *
 * @param {Object} props - The component props.
 * @param {string} props.firstname - The user's first name.
 * @param {string} props.lastname - The user's last name.
 * @param {string} props.username - The user's username.
 * @param {number} props.followers - The number of followers the user has.
 * @param {string} [props.profileImage] - Optional URL of the user's profile image.
 * @param {number} props.exercisesCount - The number of exercises created by the user.
 * @param {number} props.programsCount - The number of programs created by the user.
 * @param {number} props.goalsCount - The number of goals achieved by the user.
 * @param {boolean} props.followed - Indicates whether the current user is following this user.
 * @param {function} props.onFollowToggle - Function to call when the follow/unfollow button is pressed.
 *
 * @returns {JSX.Element} The `OtherProfilHeader` component.
 */

interface OtherProfilHeaderProps {
  firstname: string;
  lastname: string;
  username: string;
  followers: number;
  profileImage?: string;
  exercisesCount: number;
  programsCount: number;
  goalsCount: number;
  followed: boolean;
  onFollowToggle: () => void;
}

const OtherProfilHeader: React.FC<OtherProfilHeaderProps> = ({
  firstname,
  lastname,
  username,
  followers,
  profileImage,
  exercisesCount,
  programsCount,
  goalsCount,
  followed,

  onFollowToggle,
}) => {
  const defaultImage = "https://placekitten.com/200/200";
  const imageSource = profileImage
    ? { uri: profileImage }
    : { uri: defaultImage };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Avatar.Image testID="profile-image" size={100} source={imageSource} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>
            {firstname} {lastname}
          </Text>
          <Text style={styles.username}>@{username}</Text>
          <Text style={styles.followers}>{followers} followers</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{exercisesCount}</Text>
          <Text style={styles.statLabel}>Exercices</Text>
          <Text style={styles.statLabel}>créés</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{programsCount}</Text>
          <Text style={styles.statLabel}>Programmes</Text>
          <Text style={styles.statLabel}>créés</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{goalsCount}</Text>
          <Text style={styles.statLabel}>Objectifs</Text>
          <Text style={styles.statLabel}>accomplis</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <CustomButton
          {...(followed
            ? {
                style: {
                  backgroundColor: theme.colors.primary,
                  borderWidth: 0,
                },
              }
            : "")}
          {...(followed ? { textColor: theme.colors.textFollow } : "")}
          onPress={onFollowToggle}
          style={styles.button}
        >
          {followed ? "Suivi(e)" : "Suivre"}
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userInfo: {
    marginLeft: 50,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  username: {
    color: "#A0A0A0",
    fontSize: 16,
    marginTop: 5,
  },
  followers: {
    color: "#ffffff",
    fontSize: 16,
    marginTop: 5,
    fontStyle: "italic",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    color: "#2F80ED",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  statLabel: {
    color: "#ffffff",
    fontSize: 14,
    fontStyle: "italic",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: "#161626",
    borderColor: "#42424D",
    borderRadius: 6,
    borderWidth: 1,
    flex: 1,
  },
});

export default OtherProfilHeader;
