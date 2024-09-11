import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Avatar, Button } from "react-native-paper";
import CustomButton from "../CustomButton/CustomButton";
import theme from "../../theme";

/**
 * Props pour le composant FollowerCard.
 *
 * @typedef {Object} FollowerCardProps
 * @property {string} username - Le nom d'utilisateur (identifiant unique) de l'utilisateur.
 * @property {string} fullName - Le nom complet de l'utilisateur.
 * @property {string} [profileImageUrl] - L'URL de l'image de profil de l'utilisateur. Si aucune image n'est fournie, une image par défaut est utilisée.
 * @property {number} followersCount - Le nombre de personnes qui suivent cet utilisateur.
 * @property {number} exercisesCount - Le nombre d'exercices créés par l'utilisateur.
 * @property {number} goalsCount - Le nombre d'objectifs atteints par l'utilisateur.
 * @property {boolean} followed - Indique si l'utilisateur est suivi par l'utilisateur actuel.
 * @property {() => void} onFollowToggle - Fonction appelée lorsqu'on appuie sur le bouton pour suivre ou ne plus suivre l'utilisateur.
 */

/**
 * Composant représentant une carte d'utilisateur qui affiche des informations sur un follower,
 * telles que son nom d'utilisateur, son nom complet, son image de profil, ainsi que ses statistiques.
 * Un bouton permet de suivre ou de ne plus suivre l'utilisateur.
 *
 * @param {FollowerCardProps} props - Les props du composant.
 * @returns {JSX.Element} Un élément JSX représentant la carte du follower.
 */

interface FollowerCardProps {
  username: string;
  fullName: string;
  profileImageUrl?: string;
  followersCount: number;
  exercisesCount: number;
  goalsCount: number;
  followed: boolean;
  onFollowToggle: () => void;
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
          testID={profileImageUrl ? 'profile-image' : 'default-avatar'}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.username}>@{username}</Text>
          <Text style={styles.fullName}>{fullName}</Text>
        </View>
        <CustomButton
          {...(followed ? { style: { backgroundColor: theme.colors.primary, borderWidth: 0} } : "")}
          {...(followed ? { textColor: theme.colors.textFollow  } : "")}
          onPress={onFollowToggle}
        >
          {followed ? "Suivi(e)" : "Suivre"}
        </CustomButton>
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
});

export default FollowerCard;
