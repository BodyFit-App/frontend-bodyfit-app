import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { Card, Text, ProgressBar, IconButton } from "react-native-paper";
import theme from "../../theme";
import DateChip from "../DateChip";

interface GoalHeaderProps {
  title: string;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  onPressEdit?: () => void;
  isMine?: boolean;
}

/**
 * Props for the GoalHeader component.
 *
 * @typedef {Object} GoalHeaderProps
 * @property {string} title - The title of the goal.
 * @property {string} imageUrl - The URL of the image to be displayed.
 * @property {Date} startDate - The start date of the goal.
 * @property {Date} endDate - The end date of the goal.
 * @property {number} progress - The current progress of the goal, a number between 0 and 1.
 * @property {() => void} [onPressEdit] - Optional function called when the edit button is pressed.
 * @property {boolean} [isMine] - Optional flag indicating if the goal belongs to the current user. Defaults to false.
 */

/**
 * GoalHeader component displays a header for a goal, including its title, image, start and end dates,
 * a progress bar, and an optional edit button if the goal belongs to the current user.
 *
 * @param {GoalHeaderProps} props - The props for the GoalHeader component.
 * @returns {JSX.Element} A JSX element representing the goal header.
 */

const { width } = Dimensions.get("window");

const GoalHeader: React.FC<GoalHeaderProps> = ({
  title,
  imageUrl,
  startDate,
  endDate,
  progress,
  onPressEdit = () => console.log("onPressEdit not implemented"),
  isMine = false,
}) => {
  return (
    <Card style={styles.card}>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={styles.title}>{title}</Text>
        {!!isMine && (
          <IconButton onPress={onPressEdit} size={24} icon="pencil" />
        )}
      </View>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        testID="training-image"
      />
      <View style={styles.container}>
        <View style={styles.dateChipContainer}>
          <DateChip title="Date de début" date={startDate} />
        </View>
        <View style={styles.dateChipContainer}>
          <DateChip title="Date de fin" date={endDate} />
        </View>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressView}>
          <ProgressBar
            progress={progress}
            color="#32e230"
            style={styles.progressBar}
          />
        </View>
        <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
    backgroundColor: "#161626",
    borderColor: theme.colors.border,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    width: width,
    alignSelf: "center",
  },
  container: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
  },
  dateChipContainer: {
    flex: 1, // Each DateChip takes equal space
    marginHorizontal: 8, // Add space between the two DateChips
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
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
    color: theme.colors.text,
  },
  title: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "left",
    padding: 16,
    marginVertical: 10,
    textTransform: "uppercase",
  },
  image: {
    height: 250,
  },
});

export default GoalHeader;
