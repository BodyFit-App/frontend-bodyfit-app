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
  onPressNav: (...args: any[]) => void;
  isFav: boolean;
  onPressFav: (...args: any[]) => void;
};

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
        paddingLeft: 4,
        paddingRight: 16,
        paddingVertical: 8,
        width: "100%",
        backgroundColor: theme.colors.backgroundButton,
        borderWidth: 2,
        borderColor: theme.colors.primary,
      }}
    >
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <IconButton
          onPress={onPressFav}
          icon={() => (
            <Icon source={isFav ? "star" : "star-outline"} size={28} />
          )}
        />
        <TouchableOpacity onPress={onPressNav} style={{ flex: 1 }}>
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
            <Text
              style={{
                fontSize: 12,
                color: theme.colors.textPlaceholder,
                marginTop: 4,
              }}
            >
              {categories.join(" • ")}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Card>
  );
}
