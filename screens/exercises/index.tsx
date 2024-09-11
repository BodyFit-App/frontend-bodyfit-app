import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  fetchExercises,
  getFavoriteStatusForExercises,
} from "../../api/exercises";
import { ExerciseFilter } from "../../types/filters.types";
import { Button, Text } from "react-native-paper";
import { formatExercisesWithFavorites } from "../../lib/helpers";
import ObjectifCard from "../../components/ObjectifCard/ObjectifCard";

export const ExercisesScreen = () => {
  const [filter, setFilter] = useState<ExerciseFilter>({});

  const [count, setCount] = useState(0);

  const fetchExercicesWithFavorites = async ({ pageParam }: any) => {
    try {
      const exercices = await fetchExercises(pageParam, filter);
      setCount(exercices.count ?? 0);
      const favorites = await getFavoriteStatusForExercises(
        exercices.data.map(({ id }) => id)
      );

      return formatExercisesWithFavorites(
        exercices.data,
        favorites,
        exercices.nextCursor
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  // Check the doc if needed https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    status,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["exercises", filter],
    queryFn: fetchExercicesWithFavorites,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  return status === "pending" ? (
    <Text>Loading...</Text>
  ) : status === "error" ? (
    <Text>Error: {error.message}</Text>
  ) : (
    <View>
      <ScrollView>
        {data!.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.exercises.map(({ id, title, description, isFav }) => (
              <ObjectifCard
                key={id}
                title={title}
                startDate={""}
                endDate={""}
                description={""}
                progress={0.2}
                onPress={() => console.log("coucou")}
              />
            ))}
          </React.Fragment>
        ))}
        <Text>{count}</Text>
        <Text>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</Text>
      </ScrollView>
    </View>
  );
};
