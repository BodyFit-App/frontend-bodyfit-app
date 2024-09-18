import {
  QueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import ItemCard from "../../components/ItemCard";
import { addFavExercise, deleteFavExercise } from "../../api/favorites";
import { useFavExerciseMutation } from "../../hooks/useFavExerciseMutation";

export const ExercisesScreen = () => {
  const queryClient = useQueryClient();
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

  const { handleMutationFav, isError } = useFavExerciseMutation(filter);

  const toggleFavorite = (id: number, isFav: boolean) => {
    handleMutationFav(id, isFav);
  };

  return status === "pending" ? (
    <Text>Loading...</Text>
  ) : status === "error" ? (
    <Text>Error: {error.message}</Text>
  ) : (
    <View>
      <ScrollView>
        {data!.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.exercises.map(({ id, isFav }) => (
              <ItemCard
                key={id}
                title={""}
                pseudo={""}
                categories={[]}
                time={0}
                onPressNav={function (...args: any[]): void {
                  throw new Error("Function not implemented.");
                }}
                isFav={isFav}
                onPressFav={() => toggleFavorite(id, isFav)}
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
