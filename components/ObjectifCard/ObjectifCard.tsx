import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, ProgressBar } from "react-native-paper";

interface ObjectifCardProps {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  progress: number;
  onPress?: () => void;
}

const ObjectifCard: React.FC<ObjectifCardProps> = ({
  title,
  startDate,
  endDate,
  description,
  progress,
  onPress,
}) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressView}>
              <ProgressBar
                progress={progress}
                color="#32e230"
                style={styles.progressBar}
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
        </View>
        <Text style={styles.date}>
          Du {startDate} au {endDate}
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
