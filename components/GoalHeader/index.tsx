import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { Card, Text, ProgressBar } from "react-native-paper";
import theme from "../../theme";
import DateChip from "../DateChip";

interface GoalHeaderProps {
  title: string;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
  progress: number;
}

const { width } = Dimensions.get("window");

const GoalHeader: React.FC<GoalHeaderProps> = ({
  title,
  imageUrl,
  startDate,
  endDate,
  progress,
}) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>{title}</Text>
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
