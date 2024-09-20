import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Text, Button } from "react-native-paper";
import CustomButton from "../CustomButton/CustomButton";
import theme from "../../theme";

/**
 * Composant `OtherProfilHeader` qui affiche les informations du profil utilisateur, y compris le nom, le nom d'utilisateur,
 * le nombre de followers, ainsi que des statistiques sur les exercices, programmes et objectifs créés.
 * Le composant affiche également des boutons pour modifier et partager le profil.
 *
 * @component
 * @example
 * const handleEditProfile = () => {
 *   console.log('Modifier le profil');
 * };
 * const handleShareProfile = () => {
 *   console.log('Partager le profil');
 * };
 * return (
 *   <OtherProfilHeader
 *     name="John Doe"
 *     username="johndoe"
 *     followers={0}
 *     profileImage="https://example.com/image.jpg"
 *     exercisesCount={10}
 *     programsCount={5}
 *     goalsCount={3}
 *   />
 * );
 *
 * @param {Object} props - Les props du composant.
 * @param {string} props.firstname - Le prénom de l'utilisateur.
 * @param {string} props.lastname - Le nom de famille de l'utilisateur.
 * @param {string} props.username - Le nom d'utilisateur.
 * @param {number} props.followers - Le nombre de followers.
 * @param {string} [props.profileImage] - L'URL de l'image du profil (optionnelle).
 * @param {number} props.exercisesCount - Le nombre d'exercices créés par l'utilisateur.
 * @param {number} props.programsCount - Le nombre de programmes créés par l'utilisateur.
 * @param {number} props.goalsCount - Le nombre d'objectifs accomplis par l'utilisateur.
 *
 * @returns {JSX.Element} Le composant `OtherProfilHeader`.
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
        <Avatar.Image  testID="profile-image"  size={100} source={imageSource} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{firstname} {lastname}</Text>
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
          {...(followed ? { style: { backgroundColor: theme.colors.primary, borderWidth: 0} } : "")}
          {...(followed ? { textColor: theme.colors.textFollow  } : "")}
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
