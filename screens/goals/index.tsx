import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { fetchGoals } from "../../api/goals";

export const GoalsScreen = () => {
  const [filter, setFilter] = useState({});

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    status,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["goals", filter],
    queryFn: ({ pageParam }) => fetchGoals(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  return status === "pending" ? (
    <Text>Loading...</Text>
  ) : status === "error" ? (
    <Text>Error: {error.message}</Text>
  ) : (
    <View>
      {data?.pages.map((group, i) => (
        <React.Fragment>
          {group.data.map(({ id, title }) => (
            <Text key={id} style={{ color: "white" }}>
              {title}
            </Text>
          ))}
        </React.Fragment>
      ))}
    </View>
  );
};
