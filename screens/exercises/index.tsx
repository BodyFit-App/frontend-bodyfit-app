import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import {
  fetchExercises,
  getFavoriteStatusForExercises,
} from "../../api/exercises";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { formatExercisesWithFavorites } from "../../lib/helpers";
import ItemCard from "../../components/ItemCard";
import { useFavExerciseMutation } from "../../hooks/useFavExerciseMutation";
import { useDebounce } from "../../hooks/useDebounce";
import { ExerciseOrder } from "../../types/orders.types";
import CustomSearchBar from "../../components/CustomSearchBar/CustomSearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import { ExerciseFilter } from "../../types/filters.types";

export const ExercisesScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [count, setCount] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("Plus récents");
  const [order, setOrder] = useState<ExerciseOrder>({
    field: "created_at",
    asc: false,
  });

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const filterList = ["Plus récents", "Moins récents", "A-Z", "Z-A"];

  const fetchExercicesWithFavorites = async ({ pageParam }: any) => {
    try {
      const exercices = await fetchExercises(
        pageParam,
        { title: debouncedSearchQuery },
        order
      );
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

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    status,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["exercises", { title: debouncedSearchQuery }, order],
    queryFn: fetchExercicesWithFavorites,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const mergedData = data?.pages.flatMap((page) => page.exercises) ?? [];

  const uniqueData = mergedData?.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  
  const { handleMutationFav, isError } = useFavExerciseMutation({ title: debouncedSearchQuery, order });

  const toggleFavorite = (id: number, isFav: boolean) => {
    handleMutationFav(id, !isFav);
  };

  const handleFilterChange = (selectedFilter: string) => {
    setSelectedFilter(selectedFilter);
    switch (selectedFilter) {
      case "Plus récents":
        setOrder({ field: "created_at", asc: false });
        break;
      case "Moins récents":
        setOrder({ field: "created_at", asc: true });
        break;
      case "A-Z":
        setOrder({ field: "title", asc: true });
        break;
      case "Z-A":
        setOrder({ field: "title", asc: false });
        break;
      default:
        setOrder({ field: "created_at", asc: false });
    }
  };

  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleExercicePress = (id: number) => {
    navigation.navigate("Exercise", { id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <CustomSearchBar
          placeholder="Rechercher"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FilterBar
        filters={filterList}
        defaultFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        resultsCount={count}
      />
      <FlatList
        data={uniqueData ?? []}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <ItemCard
              title={item.title}
              pseudo={item.profiles?.pseudo || "Unknown"}
              description={item.description || ""}
              categories={
                item.categories ? item.categories.map((cat) => cat.name) : []
              }
              time={parseInt(
                item.estimated_time_seconds
                  ? `${Math.floor(item.estimated_time_seconds / 60)} min`
                  : "0 min",
                10
              )}
              isFav={item.isFav}
              onPressFav={() => toggleFavorite(item.id, item.isFav)}
              onPressNav={() => handleExercicePress(item.id)}
            />
          </View>
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator size="large" /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchBarContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
});
