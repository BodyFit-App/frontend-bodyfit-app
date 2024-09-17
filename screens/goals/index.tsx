import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import { GoalFilter } from "../../types/filters.types";
import { GoalOrder } from "../../types/orders.types";
import { fetchGoals } from "../../api/goals";
import CustomSearchBar from "../../components/CustomSearchBar/CustomSearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import ObjectifCard from "../../components/ObjectifCard/ObjectifCard";

export const GoalsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<GoalFilter>({});
  const [order, setOrder] = useState<GoalOrder>({field: "created_at", asc: false,});
  const [count, setCount] = useState(0);

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
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["goals", filter, order],
    queryFn: handleFetchGoals,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  type RootStackParamList = {
    Goal: { id: number };
  };

  type GoalScreenNavigationProp = StackNavigationProp<RootStackParamList, "Goal">;

  const navigation = useNavigation<GoalScreenNavigationProp>();

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

  return status === "pending" ? (
    <Text>Loading...</Text>
  ) : status === "error" ? (
    <Text>Error: {error.message}</Text>
  ) : (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <CustomSearchBar
          placeholder={"Rechercher"}
          onChangeText={(query) => {
            setSearchQuery(query);
            applySearchFilter(query);
          }}
          value={searchQuery}
        />
      </View>

      <FilterBar
        filters={filterList}
        defaultFilter={filter.title || "Plus récents"}
        onFilterChange={handleFilterChange}
        resultsCount={count}
      />

      <FlatList
        data={data?.pages.flatMap((page) => page.data)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ObjectifCard
            key={item.id}
            title={item.title}
            description={item.description ?? ""}
            startDate={item.date_start ?? ""}
            endDate={item.date_end ?? ""}
            progress={
              item.steps && item.steps.length > 0
                ? item.steps.filter((step) => step.achieved).length / item.steps.length
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
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="large" /> : null}
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
