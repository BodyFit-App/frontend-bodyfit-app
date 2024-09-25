import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, ProgressBar } from "react-native-paper";

/**
 * ObjectifCard Component
 *
 * This component represents a goal card, which displays a title, a time period (start and end dates),
 * a description, and a progress bar showing the goal's completion status.
 * It also supports an optional press action via the `onPress` prop.
 *
 * @component
 * @example
 * return (
 *   <ObjectifCard
 *     title="Weight Loss"
 *     startDate="2024-01-01"
 *     endDate="2024-12-31"
 *     description="Weight loss goal for the year 2024."
 *     progress={0.4}
 *     onPress={() => console.log('Access the goal')}
 *   />
 * );
 *
 * @param {Object} props - The component properties.
 * @param {string} props.title - The title of the goal.
 * @param {string} [props.startDate] - The start date of the goal.
 * @param {string} [props.endDate] - The end date of the goal.
 * @param {string} [props.description] - The description of the goal.
 * @param {number} props.progress - The progress of the goal, expressed as a number between 0 and 1 (e.g., 0.5 for 50%).
 * @param {function} [props.onPress] - Optional function called when the card is pressed.
 *
 * @returns {JSX.Element} A React element representing a goal card with a title, dates, description, and progress.
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
  if (!date) return "Dates à définir";
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "Dates à définir";
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return parsedDate.toLocaleDateString(undefined, options);
};

const ObjectifCard: React.FC<ObjectifCardProps> = ({
  title,
  startDate,
  endDate,
  description = "Sans description",
  progress,
  onPress,
}) => {
  const formattedStartDate = formatDate(startDate); 
  const formattedEndDate = formatDate(endDate);

  const renderDate = () => {
    if (formattedStartDate !== "Dates à définir" && formattedEndDate !== "Dates à définir") {
      return `Du ${formattedStartDate} au ${formattedEndDate}`;
    } else if (formattedStartDate !== "Dates à définir") {
      return `Débute le ${formattedStartDate}`;
    } else if (formattedEndDate !== "Dates à définir") {
      return `Jusqu'au ${formattedEndDate}`;
    }
    return "Dates à définir";
  };

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
          {renderDate()} {/* Appel à la fonction qui rend les dates */}
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
flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
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
