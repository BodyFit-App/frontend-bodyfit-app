import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { Card, Text, Chip, IconButton } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

/**
 * Propriétés pour le composant TrainingCard
 * @typedef {Object} TrainingCardProps
 * @property {string} title - Le titre de l'entraînement.
 * @property {string} imageUrl - URL de l'image représentant l'entraînement.
 * @property {string} duration - Durée de l'entraînement (ex. : "40 min").
 * @property {string[]} categories - Liste des catégories/tags de l'entraînement.
 * @property {boolean} isFavorite - Indique si l'entraînement est marqué comme favori.
 * @property {() => void} onToggleFavorite - Fonction de rappel pour basculer l'état favori.
 */

/**
 * Composant affichant les informations d'un entraînement sous forme de carte.
 * @param {TrainingCardProps} props - Les propriétés pour le composant.
 * @returns {JSX.Element} Le composant carte affiché.
 */

interface TrainingCardProps {
  title: string;
  imageUrl: string;
  duration: string;
  categories: string[];
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const { width } = Dimensions.get("window");

const TrainingCard: React.FC<TrainingCardProps> = ({
  title,
  imageUrl,
  duration,
  categories,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.line} />
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Catégorie</Text>
        <View style={styles.rightSection}>
          <MaterialCommunityIcons
            name="clock-outline"
            color="#2F80ED"
            size={18}
          />
          <Text style={styles.duration}>{duration}</Text>
        </View>
      </View>
      <View style={styles.tagsAndFavoriteContainer}>
        <View style={styles.tagContainer}>
          {categories.map((tag, index) => (
            <Chip
              key={index}
              mode="outlined"
              style={styles.chip}
              textStyle={styles.chipText}
            >
              {tag}
            </Chip>
          ))}
        </View>
        <View style={styles.favoriteContainer}>
          <IconButton
            icon={isFavorite ? "star" : "star-outline"}
            iconColor={isFavorite ? "#2F80ED" : "#A0A0A0"}
            size={35}
            onPress={onToggleFavorite}
            style={styles.iconButton}
          />
        </View>
      </View>
      <View style={styles.line} />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#161626",
    borderColor: "#2F80ED",
    borderWidth: 0,
    width: width,
    alignSelf: "center",
  },
  line: {
    height: 1,
    backgroundColor: "#A0A0A0",
  },
  title: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
    marginVertical: 10,
    paddingLeft: 10,
  },
  image: {
    width: "100%",
    height: 200,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  label: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  duration: {
    color: "#2F80ED",
    marginLeft: 5,
    fontWeight: "bold",
  },
  tagsAndFavoriteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  chip: {
    backgroundColor: "#0b0b12",
    borderRadius: 8,
    borderColor: "#2F80ED",
    marginRight: 5,
    marginBottom: 5,
  },
  chipText: {
    lineHeight: 16,
    fontSize: 10,
    color: "#ffffff",
  },
  favoriteContainer: {
    justifyContent: "flex-start",
  },
  iconButton: {
    marginTop: 1,
  },
});

export default TrainingCard;
