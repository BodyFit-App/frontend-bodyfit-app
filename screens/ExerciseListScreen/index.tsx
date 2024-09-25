import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { fetchExercises } from "../../api/exercises";
import { StackScreenProps } from "@react-navigation/stack";
import ItemCard from "../../components/ItemCard";
import { useDebounce } from "../../hooks/useDebounce";
import { ExerciseOrder } from "../../types/orders.types";
import CustomSearchBar from "../../components/CustomSearchBar/CustomSearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import { useAuth } from "../../hooks/useAuth";
import { handleToggleFavoriteExercise } from "../../api/toggles";
import { AppParamListBase } from "../../navigations/main";
import { useFilterOrder } from "../../hooks/useFilterOrder";

/**
 * ExerciseListScreen Component
 *
 * This component serves as a wrapper for the ExerciseListScene. It allows navigation to the ExerciseListScene
 * and passes the necessary route and navigation props.
 *
 * @component
 * @example
 * return <ExerciseListScreen navigation={navigation} route={route} />;
 *
 * @param {StackScreenProps<AppParamListBase, "ExerciseListScreen">} props - Navigation and route props provided by the Stack Navigator.
 * @returns {JSX.Element} The rendered ExerciseListScreen component.
 */

export const ExerciseListScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "ExerciseListScreen">) => {
  return <ExerciseListScene navigation={navigation} route={route} />;
};

/**
 * ExerciseListScene Component
 *
 * This component fetches and displays a paginated list of exercises. It includes features like
 * search filtering, sorting by different criteria, and the ability to favorite exercises.
 * The component uses React Query for infinite scrolling and mutation (toggling favorite status).
 *
 * @component
 * @example
 * return <ExerciseListScene navigation={navigation} route={route} />;
 *
 * @param {Object} props - Props passed to the component.
 * @param {any} props.navigation - Navigation prop for navigating to different screens.
 * @param {any} props.route - Route prop containing any parameters passed to the screen.
 * @returns {JSX.Element} The rendered ExerciseListScene component.
 */

export const ExerciseListScene = ({ navigation, route }: any) => {
  const filtersParam = route?.params?.filters || {};
  const { session } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const { order, handleFilterChange, selectedFilter, filterList } =
    useFilterOrder();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const filters = { title: debouncedSearchQuery, ...filtersParam };

  const fetchExercicesInfinite = async ({ pageParam }: any) => {
    try {
      return fetchExercises(
        pageParam,
        filters,
        order,
        session?.user.user_metadata.profile_id
      );
    } catch (error) {
      // console.error(error);
      throw new Error((error as Error).message);
    }
  };

  const queryClient = useQueryClient();
  const queryKey = ["exercises", filters, order];

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

  const mutation = useMutation({
    mutationKey: queryKey,
    mutationFn: handleToggleFavoriteExercise,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  /**
   * Toggles the favorite status of an exercise.
   *
   * @param {number} id - The ID of the exercise.
   * @param {boolean} isFav - Whether the exercise is currently a favorite.
   */
  
  const toggleFavorite = (id: number, isFav: boolean) => {
    mutation.mutate({ id, isFav });
  };

  /**
   * Handles navigation to the Exercise Details screen.
   *
   * @param {number} id - The ID of the exercise to view details for.
   */

  const handleExercicePress = (id: number) => {
    navigation.navigate("ExerciseDetailsScreen", { id });
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
        testID="flat-list"
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
                item.estimated_time_minutes
                  ? `${Math.floor(item.estimated_time_minutes)}`
                  : "0",
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
