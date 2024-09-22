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

export const GoalListScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "GoalListScreen">) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { order, handleFilterChange, selectedFilter, filterList } =
    useFilterOrder();
  const [count, setCount] = useState(0);
  const handleFetchGoals = async ({ pageParam }: any) => {
    try {
      const goals = await fetchGoals(
        pageParam,
        { title: debouncedSearchQuery },
        order
      );
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
