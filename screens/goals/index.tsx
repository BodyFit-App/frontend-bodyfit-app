import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { GoalFilter } from "../../types/filters.types";
import { GoalOrder } from "../../types/orders.types";
import { fetchGoals } from "../../api/goals";
import CustomSearchBar from "../../components/CustomSearchBar/CustomSearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import ObjectifCard from "../../components/ObjectifCard/ObjectifCard";
import { useDebounce } from "../../hooks/useDebounce";

export const GoalsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [filter, setFilter] = useState<GoalFilter>({});
  const [order, setOrder] = useState<GoalOrder>({
    field: "created_at",
    asc: false,
  });
  const [count, setCount] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("Plus récents");

  const filterList = ["Plus récents", "Moins récents", "A-Z", "Z-A"];

  const handleFetchGoals = async ({ pageParam }: any) => {
    try {
      const goals = await fetchGoals(pageParam, filter, order);
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
    queryKey: ["goals", filter, order],
    queryFn: handleFetchGoals,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const mergedData = data?.pages.flatMap((page) => page.data) ?? [];

  const uniqueData = mergedData.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleObjectifPress = (id: number) => {
    navigation.navigate("Goal", { id });
  };

  const applySearchFilter = (search: string) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      title: search.length > 0 ? search : undefined,
    }));
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

  useEffect(() => {
    applySearchFilter(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

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
        data={uniqueData}
        keyExtractor={(item) => item.id.toString()}
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
