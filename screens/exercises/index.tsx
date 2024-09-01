import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { fetchExercises } from "../../api/exercises";
import { ExerciseFilter } from "../../types/filters.types";
import { MD2Colors, Text } from "react-native-paper";

export const ExercisesScreen = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<ExerciseFilter>({});

  const { data, error, isLoading } = useQuery({
    queryKey: ["exercises", page, filter],
    queryFn: () => fetchExercises(page, filter),
  });

  if (isLoading)
    return <ActivityIndicator animating={true} color={MD2Colors.red800} />;

  if (error) return <Text>{error.message}</Text>;

  return (
    <View>
      {data?.map(({ id, title }) => (
        <Text key={id} style={{ color: "white" }}>
          {title}
        </Text>
      ))}
    </View>
  );
};
