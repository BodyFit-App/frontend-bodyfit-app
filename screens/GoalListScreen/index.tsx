import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { GoalOrder } from "../../types/orders.types";
import { fetchGoals } from "../../api/goals";
import CustomSearchBar from "../../components/CustomSearchBar/CustomSearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import ObjectifCard from "../../components/ObjectifCard/ObjectifCard";
import { useDebounce } from "../../hooks/useDebounce";
import { AppParamListBase } from "../../navigations/main";
import { useFilterOrder } from "../../hooks/useFilterOrder";

/**
 * GoalListScreen Component
 *
 * This component is responsible for displaying a paginated list of user goals. It features a search bar, filter options,
 * and infinite scrolling to load more goals. It fetches data using React Query and allows users to filter and search goals.
 *
 * @component
 * @example
 * return (
 *   <GoalListScreen
 *     navigation={navigation}
 *     route={route}
 *   />
 * );
 *
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - The navigation object provided by React Navigation.
 * @param {Object} props.route - The route object that contains the current route's information.
 *
 * @returns {JSX.Element} A React component that renders a list of goals with search, filter, and infinite scrolling functionality.
 *
 * @typedef {Object} Goal - The goal object containing details about each goal.
 * @property {number} id - The unique identifier of the goal.
 * @property {string} title - The title of the goal.
 * @property {string} [description] - A brief description of the goal.
 * @property {string} [date_start] - The start date of the goal.
 * @property {string} [date_end] - The end date of the goal.
 * @property {Object[]} steps - An array of step objects representing the goal's steps.
 * @property {boolean} [steps.achieved] - Indicates if the step is achieved.
 *
 * @typedef {Object} Filters - The filters object used to filter goals.
 * @property {string} [title] - The search query used to filter by goal title.
 *
 * @param {Object} route.params - Contains the parameters passed through the route, including filters.
 * @param {Filters} [route.params.filters] - Optional filters to be applied when fetching the goals list.
 */

export const GoalListScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "GoalListScreen">) => {
  const filtersParam = route?.params?.filters || {};
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { order, handleFilterChange, selectedFilter, filterList } =
    useFilterOrder();
  const [count, setCount] = useState(0);
  const filters = { title: debouncedSearchQuery, ...filtersParam };
  const handleFetchGoals = async ({ pageParam }: any) => {
    try {
      const goals = await fetchGoals(pageParam, filters, order);
      setCount(goals.count ?? 0);
      return goals;
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
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["goals", { title: debouncedSearchQuery }, order],
    queryFn: handleFetchGoals,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const mergedData = data?.pages.flatMap((page) => page.data) ?? [];

  const uniqueData = mergedData?.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  const handleObjectifPress = (id: number) => {
    navigation.push("GoalDetailsScreen", { id });
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
          <ObjectifCard
            title={item.title}
            description={item.description ?? ""}
            startDate={item.date_start ?? ""}
            endDate={item.date_end ?? ""}
            progress={
              item.steps && item.steps.length > 0
                ? item.steps.filter((step) => step.achieved).length /
                  item.steps.length
                : 0
            }
            onPress={() => handleObjectifPress(item.id)}
          />
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
