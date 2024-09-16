import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { fetchGoals } from "../../api/goals";
import CustomSearchBar from "../../components/CustomSearchBar/CustomSearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import ObjectifCard from "../../components/ObjectifCard/ObjectifCard";

export const GoalsScreen = () => {
  const [filter, setFilter] = useState("Plus récents");
  const [searchQuery, setSearchQuery] = useState("");

  const filterList = ["Plus récents", "Moins récents", "A-Z", "Z-A"];

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    status,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["goals", filter],
    queryFn: ({ pageParam }) => fetchGoals(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  type RootStackParamList = {
    Goal: { id: number };
  };

  type GoalScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Goal"
  >;

  const navigation = useNavigation<GoalScreenNavigationProp>();

  const handleObjectifPress = (id: number) => {
    navigation.navigate("Goal", { id });
  };

  // à revoir
  const filteredData = data?.pages.map((group) =>
    group.data.filter(
      (goal) =>
        goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (goal.description && goal.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  const totalGoals = filteredData?.reduce(
    (total, page) => total + page.length,
    0
  );

  return status === "pending" ? (
    <Text>Loading...</Text>
  ) : status === "error" ? (
    <Text>Error: {error.message}</Text>
  ) : (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <CustomSearchBar
          placeholder={"Rechercher"}
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>

      <FilterBar
        filters={filterList}
        defaultFilter={filter}
        onFilterChange={setFilter}
        resultsCount={totalGoals}
      />

      <ScrollView>
        {filteredData?.map((group, i) => (
          <React.Fragment key={i}>
            {group.map(({ id, title, description, steps, date_start, date_end }) => (
              <ObjectifCard
                key={id}
                title={title}
                description={description ?? ""}
                startDate={date_start ?? ""}
                endDate={date_end ?? ""}
                progress={
                  steps && steps.length > 0
                    ? steps.filter((step) => step.achieved).length / steps.length
                    : 0
                }
                onPress={() => handleObjectifPress(id)}
              />
            ))}
          </React.Fragment>
        ))}
      </ScrollView>
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
