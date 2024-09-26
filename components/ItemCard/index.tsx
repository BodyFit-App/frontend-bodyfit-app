import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Card, Icon, IconButton } from "react-native-paper";
import theme from "../../theme";

type Props = {
  title: string;
  pseudo: string;
  description?: string;
  categories?: string[];
  time?: number;
  total?: number;
  onPressNav?: (...args: any[]) => void;
  isFav?: boolean;
  onPressFav?: (...args: any[]) => void;
  disabledFav?: boolean;
};

/**
 * Props for the ItemCard component.
 *
 * @typedef {Object} Props
 * @property {string} title - The title of the item.
 * @property {string} pseudo - The pseudonym or username of the user.
 * @property {string} [description] - Optional description of the item.
 * @property {string[]} [categories] - Optional list of categories associated with the item.
 * @property {number} [time] - Optional time in minutes associated with the item.
 * @property {number} [total] - Optional total count or number associated with the item (e.g., total exercises).
 * @property {() => void} [onPressNav] - Optional callback function triggered when the item is pressed.
 * @property {boolean} [isFav] - Optional boolean indicating if the item is marked as a favorite.
 * @property {() => void} [onPressFav] - Optional callback function triggered when the favorite button is pressed.
 * @property {boolean} [disabledFav] - Optional flag indicating whether the favorite button should be disabled.
 */

/**
 * ItemCard component renders a card with item details such as title, pseudonym, description, 
 * categories, and other relevant information. It also supports navigation and favorite toggle functionality.
 *
 * @param {Props} props - The props for the ItemCard component.
 * @returns {JSX.Element} The rendered ItemCard component.
 */

export default function ItemCard({
  title,
  pseudo,
  description,
  categories = [],
  time,
  total,
  onPressNav,
  isFav,
  onPressFav,
}: Props) {
  return (
    <Card
      style={{
        paddingLeft: isFav !== undefined && !!onPressFav ? 4 : 16,
        paddingRight: 16,
        paddingVertical: 8,
        width: "100%",
        backgroundColor: theme.colors.backgroundButton,
        borderWidth: 2,
        borderColor: theme.colors.primary,
      }}
    >
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        {isFav !== undefined && !!onPressFav && (
          <IconButton
            onPress={onPressFav}
            icon={() => (
              <Icon source={isFav ? "star" : "star-outline"} size={28} />
            )}
          />
        )}
        <TouchableOpacity
          onPress={onPressNav ?? (() => {})}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
              {`@${pseudo.toLocaleLowerCase()}`}
            </Text>
            {!!time && (
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "baseline",
                }}
              >
                <Icon source="watch" size={16} color={theme.colors.primary} />
                <Text
                  style={{ color: theme.colors.primary, fontWeight: "700" }}
                >
                  {time} min
                </Text>
              </View>
            )}
            {!!total && (
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "baseline",
                }}
              >
                <Icon
                  source="dumbbell"
                  size={16}
                  color={theme.colors.primary}
                />

                <Text
                  style={{ color: theme.colors.primary, fontWeight: "700" }}
                >
                  {total}
                </Text>
              </View>
            )}
          </View>
          <Text
            style={{ color: "white", fontWeight: "700", marginBottom: 2 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          {!!description && (
            <Text
              style={{ color: "white", marginBottom: 2 }}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {description}
            </Text>
          )}
          <View
            style={{
              flexDirection: "row",
              gap: 8,
            }}
          >
            {!!categories && categories.length > 0 && (
              <Text
                style={{
                  fontSize: 12,
                  color: theme.colors.textPlaceholder,
                  marginTop: 4,
                }}
              >
                {categories.join(" • ")}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </Card>
  );
}
