import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { fetchExercises } from "../../api/exercises";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import ItemCard from "../../components/ItemCard";
import {
  handleToggleFavoriteExercise,
  useToggleMutation,
} from "../../hooks/useToggleMutation";
import { useDebounce } from "../../hooks/useDebounce";
import { ExerciseOrder } from "../../types/orders.types";
import CustomSearchBar from "../../components/CustomSearchBar/CustomSearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import { useAuth } from "../../hooks/useAuth";

export const ExercisesScreen = () => {
  const { session } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Plus récents");
  const [order, setOrder] = useState<ExerciseOrder>({
    field: "created_at",
    asc: false,
  });

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const filterList = ["Plus récents", "Moins récents", "A-Z", "Z-A"];

  const fetchExercicesInfinite = async ({ pageParam }: any) => {
    try {
      return fetchExercises(
        pageParam,
        { title: debouncedSearchQuery },
        order,
        session?.user.user_metadata.profile_id
      );
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    }
  };

  const queryClient = useQueryClient();
  const queryKey = ["exercises", { title: debouncedSearchQuery }, order];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: queryKey,
      queryFn: fetchExercicesInfinite,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const count = data?.pages[0].count ?? 0;

  const mergedData = data?.pages.flatMap((page) => page.data) ?? [];

  const uniqueData = mergedData?.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  const { handleMutation } = useToggleMutation(
    () => queryClient.invalidateQueries({ queryKey }),
    handleToggleFavoriteExercise
  );

  const toggleFavorite = (id: number, isFav: boolean) => {
    handleMutation({ id, isFav });
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
              categories={
                item.categories ? item.categories.map((cat) => cat.name) : []
              }
              time={parseInt(
                item.estimated_time_seconds
                  ? `${Math.floor(item.estimated_time_seconds / 60)} min`
                  : "0 min",
                10
              )}
              isFav={item.favorite_exercises.length > 0}
              onPressFav={() =>
                toggleFavorite(item.id, item.favorite_exercises.length > 0)
              }
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
