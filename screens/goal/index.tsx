import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { MD2Colors, Text } from "react-native-paper";
import { useParams } from "react-router-native";
import { fetchGoalById } from "../../api/goals";

export const GoalScreen = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["goal", id],
    queryFn: () => fetchGoalById(+id!),
  });

  if (isLoading)
    return <ActivityIndicator animating={true} color={MD2Colors.red800} />;

  if (error) return <Text>{error.message}</Text>;

  return <View>{data?.title}</View>;
};
