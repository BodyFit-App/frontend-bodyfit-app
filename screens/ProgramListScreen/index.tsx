import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { fetchPrograms } from "../../api/programs";
import ItemCard from "../../components/ItemCard";
import CustomSearchBar from "../../components/CustomSearchBar/CustomSearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import { ProgramOrder } from "../../types/orders.types";
import { useDebounce } from "../../hooks/useDebounce";
import { StackScreenProps } from "@react-navigation/stack";
import { handleToggleFavoriteProgram } from "../../api/toggles";
import { AppParamListBase } from "../../navigations/main";
import { useFilterOrder } from "../../hooks/useFilterOrder";

/**
 * ProgramListScreen Component
 *
 * This component serves as the wrapper for the `ProgramListScene`. It receives navigation and route props.
 *
 * @component
 * @example
 * return (
 *   <ProgramListScreen navigation={navigation} route={route} />
 * )
 *
 * @param {StackScreenProps<AppParamListBase, "ProgramListScreen">} props - Navigation and route props.
 * @returns {JSX.Element} The `ProgramListScene` component wrapped in navigation.
 */

export const ProgramListScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "ProgramListScreen">) => {
  return <ProgramListScene navigation={navigation} route={route} />;
};

/**
 * ProgramListScene Component
 *
 * This component is responsible for displaying a list of programs with infinite scrolling. It also includes
 * search functionality and a filter bar to sort and filter programs based on specific criteria.
 *
 * @component
 * @example
 * return (
 *   <ProgramListScene navigation={navigation} route={route} />
 * )
 *
 * @param {object} props - Component props.
 * @param {any} props.navigation - Navigation object for navigating between screens.
 * @param {any} props.route - Route object containing the parameters for the screen.
 *
 * @returns {JSX.Element} - A screen that displays a list of programs.
 */

export const ProgramListScene = ({ navigation, route }: any) => {
  const filtersParam = route.params?.filters || {};
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const { order, handleFilterChange, selectedFilter, filterList } =
    useFilterOrder();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const filters = { title: debouncedSearchQuery, ...filtersParam };

  /**
   * Fetches a list of programs with pagination.
   *
   * @async
   * @function fetchProgramsInfinite
   *
   * @param {object} pageParam - Pagination parameter to fetch the next page of programs.
   * @returns {Promise<object>} - Returns a paginated list of programs.
   */

  const fetchProgramsInfinite = async ({ pageParam }: any) => {
    try {
      return fetchPrograms(pageParam, filters, order);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const queryKey = ["programs", filters, order];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: fetchProgramsInfinite,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    });

  const count = data?.pages[0].count ?? 0;

  const mergedData = data?.pages.flatMap((page) => page.data) ?? [];

  const uniqueData = mergedData?.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  const handleProgramPress = (id: number) => {
    navigation.push("ProgramDetailsScreen", { id });
  };

  const mutation = useMutation({
    mutationKey: queryKey,
    mutationFn: handleToggleFavoriteProgram,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  /**
   * Handles toggling the favorite state of a program.
   *
   * @function toggleFavorite
   *
   * @param {number} id - The ID of the program to toggle.
   * @param {boolean} isFav - The current favorite state of the program.
   */

  const toggleFavorite = (id: number, isFav: boolean) => {
    mutation.mutate({ id, isFav });
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
              description={item.description ?? ""}
              pseudo={item.profiles?.pseudo ?? ""}
              isFav={item.favorite_programs.length > 0}
              onPressFav={() =>
                toggleFavorite(item.id, item.favorite_programs.length > 0)
              }
              onPressNav={() => handleProgramPress(item.id)}
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
