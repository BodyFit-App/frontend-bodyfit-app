import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, IconButton, Chip } from "react-native-paper";

interface MyTrainingCardProps {
  username: string;
  exerciseTitle: string;
  tags: string[];
  duration: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onExercisePress?: () => void;
}

/**
 * MyTrainingCard Component
 *
 * Ce composant représente une carte d'entraînement qui affiche le nom d'utilisateur,
 * le titre de l'exercice, la durée de l'exercice, ainsi que des étiquettes (tags) associées.
 * Il offre également une fonctionnalité pour ajouter ou retirer l'exercice des favoris
 * via une étoile cliquable.
 *
 * @component
 * @example
 * const tags = ['Cardio', 'Fessier', 'Quadriceps'];
 * return (
 *   <MyTrainingCard
 *     username="janedoe"
 *     exerciseTitle="Course à pied"
 *     tags={tags}
 *     duration="40 min"
 *     isFavorite={true}
 *     onToggleFavorite={() => console.log('Toggle Favorite')}
 *     onExercisePress={() => console.log('Go to exercise')}
 *   />
 * );
 *
 * @param {Object} props - Props du composant.
 * @param {string} props.username - Le nom d'utilisateur de la personne ayant créé l'exercice.
 * @param {string} props.exerciseTitle - Le titre de l'exercice.
 * @param {string[]} props.tags - Un tableau contenant les tags associés à l'exercice.
 * @param {string} props.duration - La durée de l'exercice.
 * @param {boolean} props.isFavorite - Indique si l'exercice est dans les favoris.
 * @param {function} props.onToggleFavorite - Fonction appelée lorsqu'on clique sur l'icône étoile pour ajouter/retirer des favoris.
 * @param {function} [props.onExercisePress] - Fonction appelée lorsqu'on clique sur le titre de l'exercice pour accéder aux détails.
 *
 * @returns {JSX.Element} Un élément React représentant une carte d'entraînement.
 */
const MyTrainingCard: React.FC<MyTrainingCardProps> = ({
  username,
  exerciseTitle,
  tags,
  duration,
  isFavorite,
  onToggleFavorite,
  onExercisePress,
}) => {
  const visibleTags = tags.slice(0, 3);
  const remainingTagsCount = tags.length - visibleTags.length;
  const favorite = isFavorite? "star" : "star-outline";
  const colorFavorite = isFavorite? "#2F80ED" : "#A0A0A0";

  return (
    <Card
      style={styles.card}
    >
      <View style={styles.headerContainer}>
        <IconButton
          icon={favorite}
          iconColor={colorFavorite}
          size={30}
          onPress={onToggleFavorite}
          style={styles.iconButton}
          testID="favorite-button"
        />
        <View style={styles.textContainer}>
          <Text style={styles.username}>@{username}</Text>
          <Text style={styles.exerciseTitle} onPress={onExercisePress}>
            {exerciseTitle}
          </Text>
        </View>
        <View style={styles.rightSection}>
          <View style={styles.durationContainer}>
            <IconButton icon="clock-outline" iconColor="#2F80ED" size={18} />
            <Text style={styles.duration}>{duration}</Text>
          </View>
        </View>
      </View>
      <View style={styles.tagContainer}>
        {visibleTags.map((tag, index) => (
          <Chip
            mode="outlined"
            compact
            key={index}
            style={styles.chip}
            textStyle={styles.chipText}
          >
            {tag}
          </Chip>
        ))}
        {remainingTagsCount > 0 && (
          <Chip
            mode="outlined"
            compact
            style={styles.chip}
            textStyle={styles.chipText}
          >
            + {remainingTagsCount} autres
          </Chip>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#161626",
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
    borderColor: "#2F80ED",
    borderWidth: 2,
    width: "95%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  iconButton: {
    marginLeft: -10,
  },
  textContainer: {
    flex: 1,
  },
  username: {
    color: "#2F80ED",
    fontWeight: "bold",
  },
  exerciseTitle: {
    color: "#ffffff",
  },
  rightSection: {
    justifyContent: "center",
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  duration: {
    color: "#2F80ED",
    fontWeight: "bold",
    marginLeft: 2,
  },
  tagContainer: {
    flexDirection: "row",
  },
  chip: {
    backgroundColor: "#0b0b12",
    borderRadius: 16,
    borderColor: "#2F80ED",
    marginRight: 5,
  },
  chipText: {
    lineHeight: 9,
    fontSize: 9,
    color: "#ffffff",
  },
});

export default MyTrainingCard;
