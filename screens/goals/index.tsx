import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { MD2Colors, Text } from "react-native-paper";
import { fetchGoals } from "../../api/goals";

export const GoalsScreen = () => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["goals", page],
    queryFn: () => fetchGoals(page),
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
