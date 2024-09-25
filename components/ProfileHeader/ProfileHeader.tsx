import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Text, Button, Icon } from "react-native-paper";
import theme from "../../theme";

/**
 * `ProfilHeader` component displays a user's profile information, including name, username,
 * number of followers, and statistics on exercises, programs, and goals created.
 * The component also includes buttons to edit and sign out of the profile.
 *
 * @component
 * @example
 * const handleEditProfile = () => {
 *   console.log('Edit Profile');
 * };
 * const handleSignOut = () => {
 *   console.log('Sign Out');
 * };
 * return (
 *   <ProfilHeader
 *     firstname="John"
 *     lastname="Doe"
 *     username="johndoe"
 *     followers={100}
 *     profileImage="https://example.com/image.jpg"
 *     exercisesCount={10}
 *     programsCount={5}
 *     goalsCount={3}
 *     onEditProfile={handleEditProfile}
 *     onSignOutProfile={handleSignOut}
 *   />
 * );
 *
 * @param {Object} props - The component properties.
 * @param {string} props.firstname - The user's first name.
 * @param {string} props.lastname - The user's last name.
 * @param {string} props.username - The user's username.
 * @param {number} props.followers - The number of followers the user has.
 * @param {string} [props.profileImage] - Optional URL of the user's profile image.
 * @param {number} props.exercisesCount - The number of exercises created by the user.
 * @param {number} props.programsCount - The number of programs created by the user.
 * @param {number} props.goalsCount - The number of goals achieved by the user.
 * @param {function} props.onEditProfile - Function to call when the user clicks "Edit Profile".
 * @param {function} props.onSignOutProfile - Function to call when the user clicks "Sign Out".
 *
 * @returns {JSX.Element} The `ProfilHeader` component.
 */

interface ProfilHeaderProps {
  firstname: string;
  lastname: string;
  username: string;
  followers: number;
  profileImage?: string;
  exercisesCount: number;
  programsCount: number;
  goalsCount: number;
  onEditProfile: () => void;
  onSignOutProfile: () => void;
}

const ProfilHeader: React.FC<ProfilHeaderProps> = ({
  firstname,
  lastname,
  username,
  followers,
  profileImage,
  exercisesCount,
  programsCount,
  goalsCount,
  onEditProfile,
  onSignOutProfile,
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
          <Text style={styles.name}>{firstname}</Text>
          <Text style={styles.name}>{lastname}</Text>
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
        <Button
          mode="contained"
          compact
          onPress={onEditProfile}
          style={styles.button}
          textColor="#2F80ED"
        >
          Modifier le profil
        </Button>
        <Button
          mode="contained"
          compact
          onPress={onSignOutProfile}
          style={styles.button}
          textColor="#2F80ED"
        >
          <Icon source={"exit-to-app"} size={20} color={theme.colors.primary} />
        </Button>
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
    justifyContent: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "#161626",
    borderColor: "#42424D",
    borderRadius: 6,
    borderWidth: 1,
    marginRight: 10,
  },
});

export default ProfilHeader;
