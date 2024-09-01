import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { fetchExerciseById } from "../../api/exercises";
import { MD2Colors, Text } from "react-native-paper";
import { useParams } from "react-router-native";

export const ExerciseScreen = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["exercise", id],
    queryFn: () => fetchExerciseById(+id!),
  });

  if (isLoading)
    return <ActivityIndicator animating={true} color={MD2Colors.red800} />;

  if (error) return <Text>{error.message}</Text>;

  return <View>{data?.title}</View>;
};
