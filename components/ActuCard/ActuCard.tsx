import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text, Card } from "react-native-paper";
/**
 * Props pour le composant ActuCard
 *
 * @typedef {Object} ActuCardProps
 * @property {string} username - Le nom d'utilisateur du créateur de l'exercice.
 * @property {string} fullName - Le nom complet de l'utilisateur.
 * @property {string} [profileImageUrl] - L'URL de l'image de profil de l'utilisateur (facultatif). Une image par défaut est utilisée si non fourni.
 * @property {string} actionDescription - Description de l'action réalisée (ex: "a créé un nouvel exercice").
 * @property {string} exerciseLinkText - Le texte du lien vers l'exercice.
 * @property {function} onExercisePress - Fonction appelée lorsque le lien vers l'exercice est cliqué.
 * @property {function} onUsernamePress - Fonction appelée lorsque le nom d'utilisateur est cliqué.
 */

/**
 * Composant `ActuCard` qui affiche les informations d'une action effectuée par un utilisateur
 * dans une carte. Le composant affiche un avatar, un nom complet, un nom d'utilisateur cliquable,
 * une description de l'action et un lien cliquable vers l'exercice.
 *
 * @param {ActuCardProps} props - Les props du composant ActuCard.
 * @returns {JSX.Element} La carte d'actualité avec l'avatar, le nom d'utilisateur, la description de l'action et un lien.
 */

interface ActuCardProps {
  username: string;
  fullName: string;
  profileImageUrl?: string;
  actionDescription?: string;
  exerciseLinkText?: string;
  onExercisePress: () => void;
  onUsernamePress: () => void;
}

const ActuCard: React.FC<ActuCardProps> = ({
  username,
  fullName,
  profileImageUrl,
  actionDescription,
  exerciseLinkText,
  onExercisePress,
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
          testID={profileImageUrl ? 'profile-image' : 'default-avatar'} 
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
            <Text style={styles.link} onPress={onExercisePress}>
              {truncateText(exerciseLinkText ?? '', 15)}
            </Text>
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#161626",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
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
