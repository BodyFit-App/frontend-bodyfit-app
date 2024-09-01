import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { ProgramFilter } from "../../types/filters.types";
import { MD2Colors, Text } from "react-native-paper";
import { fetchPrograms } from "../../api/programs";

export const ProgramsScreen = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<ProgramFilter>({});

  const { data, error, isLoading } = useQuery({
    queryKey: ["programs", page, filter],
    queryFn: () => fetchPrograms(page, filter),
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
