import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { Card, Text, Chip, IconButton } from "react-native-paper";
import InputChip from "../InputChip/InputChip";
import theme from "../../theme";

/**
 * Properties for the TrainingHeader component
 * @typedef {Object} TrainingHeaderProps
 * @property {string} title - The title of the training.
 * @property {string} imageUrl - The URL of the image representing the training.
 * @property {string} [duration] - The duration of the training (e.g., "40 min").
 * @property {string[]} categories - The list of categories/tags for the training.
 * @property {boolean} isFavorite - Indicates whether the training is marked as a favorite.
 * @property {() => void} onToggleFavorite - Callback function to toggle the favorite status.
 * @property {() => void} [onPressEdit] - Optional function called when the edit button is pressed.
 * @property {boolean} [isMine] - Optional flag to indicate if the training belongs to the current user.
 */

/**
 * Component that displays training information in the form of a card.
 * @param {TrainingHeaderProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered card component.
 */

interface TrainingHeaderProps {
  title: string;
  imageUrl: string;
  duration?: string;
  categories: string[];
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPressEdit?: () => void;
  isMine?: boolean;
}

const { width } = Dimensions.get("window");

const TrainingHeader: React.FC<TrainingHeaderProps> = ({
  title,
  imageUrl,
  duration,
  categories,
  isFavorite,
  onToggleFavorite,
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
      <View style={styles.containerInfo}>
        <View>
          <Text style={styles.titleCat}>Catégorie</Text>
          <View style={styles.containerChip}>
            {categories.map((tag, index) => (
              <InputChip
                key={index}
                children={tag}
                style={styles.chip}
                textStyle={{ fontSize: 13, lineHeight: 15 }}
              />
            ))}
          </View>
        </View>
        <View>
          <View style={styles.containerDuration}>
            <IconButton
              style={{ padding: 0, margin: 0 }}
              icon="clock-outline"
              iconColor="#2F80ED"
              size={18}
            />
            <Text style={styles.txtDuration}>{`${duration} min`}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <IconButton
              style={{ padding: 0, margin: 0 }}
              icon={isFavorite ? "star" : "star-outline"}
              iconColor={isFavorite ? "#2F80ED" : "#A0A0A0"}
              size={25}
              onPress={onToggleFavorite}
              testID="favorite-button"
            />
          </View>
        </View>
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
  containerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
    alignContent: "center",
  },
  containerChip: {
    flexDirection: "row",
  },
  containerDuration: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  txtDuration: {
    color: theme.colors.text,
    fontSize: 16,
  },

  titleCat: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    marginLeft: 5,
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
  chip: {
    height: 30,
    marginRight: 5,
  },
});

export default TrainingHeader;
