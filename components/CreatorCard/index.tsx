import { View, Text, StyleSheet } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";
import theme from "../../theme";

/**
 * Props for the `CreatorCard` component.
 *
 * @typedef {Object} CreatorCardProps
 * @property {string} firstname - The first name of the creator.
 * @property {string} lastname - The last name of the creator.
 * @property {string} pseudo - The pseudonym or username of the creator.
 * @property {string} avatarUrl - The URL of the creator's avatar image.
 */

/**
 * `CreatorCard` component displays a card with the creator's information,
 * including their avatar, full name, and pseudonym.
 *
 * @param {CreatorCardProps} props - The props for the `CreatorCard` component.
 * @returns {JSX.Element} The rendered creator card component.
 */
interface CreatorCardProps {
  firstname: string;
  lastname: string;
  pseudo: string;
  avatarUrl: string;
}

export default function CreatorCard({
  firstname,
  lastname,
  pseudo,
  avatarUrl,
}: CreatorCardProps) {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.container}>
        <Avatar.Image
          testID="avatar-image"
          size={90}
          source={{ uri: avatarUrl }}
        />
        <View style={styles.containerInfo}>
          <Text style={styles.titleLarge}>{`${firstname} ${lastname}`}</Text>
          <Text style={styles.bodyMedium}>@{pseudo}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

/**
 * Styles for the `CreatorCard` component.
 */
const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 25,
    backgroundColor: theme.colors.backgroundNav,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  containerInfo: {
    flexDirection: "column",
    marginLeft: 16,
  },

  titleLarge: {
    fontSize: 24,
    color: theme.colors.textFollow,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: "800",
    color: theme.colors.text,
  },
});
