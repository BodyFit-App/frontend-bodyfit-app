import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, ProgressBar } from "react-native-paper";

/**
 * ObjectifCard Component
 *
 * Ce composant représente une carte d'objectif, qui affiche un titre, une période (date de début et de fin),
 * une description, ainsi qu'une barre de progression indiquant l'avancement de l'objectif.
 * Il est possible d'ajouter une action lorsqu'on clique sur la carte via la prop `onPress`.
 *
 * @component
 * @example
 * return (
 *   <ObjectifCard
 *     title="Perte de poids"
 *     startDate="2024-01-01"
 *     endDate="2024-12-31"
 *     description="Objectif de perte de poids pour l'année 2024."
 *     progress={0.4}
 *     onPress={() => console.log('Accéder à l\'objectif')}
 *   />
 * );
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.title - Le titre de l'objectif.
 * @param {string} [props.startDate] - La date de début de l'objectif.
 * @param {string} [props.endDate] - La date de fin de l'objectif.
 * @param {string} [props.description] - La description de l'objectif.
 * @param {number} props.progress - La progression de l'objectif, exprimée sous forme de nombre entre 0 et 1 (ex. 0.5 pour 50%).
 * @param {function} [props.onPress] - Fonction optionnelle appelée lorsque la carte est pressée.
 *
 * @returns {JSX.Element} Un élément React représentant une carte d'objectif avec titre, dates, description et progression.
 */

interface ObjectifCardProps {
  title: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  progress: number;
  onPress?: () => void;
}

const formatDate = (date?: string) => {
  if (!date) return null;
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

const ObjectifCard: React.FC<ObjectifCardProps> = ({
  title,
  startDate = new Date().toISOString().split("T")[0],
  endDate = new Date().toISOString().split("T")[0],
  description = "Sans description",
  progress,
  onPress,
}) => {
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <Card style={styles.card} onPress={onPress} testID="objectif-card">
      <Card.Content>
        <View style={styles.headerContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressView}>
              <ProgressBar
                progress={progress}
                color="#32e230"
                style={styles.progressBar}
                testID="progress-bar"
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
        </View>
        <Text style={styles.date}>
          {`Du ${formattedStartDate} au ${formattedEndDate}`}
        </Text>
        <Text style={styles.description}>
          {description.length > 100
            ? description.substring(0, 100) + "..."
            : description}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#161626",
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(47, 128, 237, 0.3)",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2F80ED",
    flex: 1,
    marginRight: 5,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  progressView: {
    flex: 1,
  },
  progressBar: {
    height: 5,
    marginRight: 8,
    backgroundColor: "#42424D",
  },
  progressText: {
    fontSize: 14,
    color: "#2F80ED",
  },
  date: {
    color: "#A0A0A0",
    marginBottom: 10,
  },
  description: {
    color: "#ffffff",
  },
});

export default ObjectifCard;
