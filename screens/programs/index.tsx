import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { fetchPrograms } from "../../api/programs";
import { formatProgramsWithFavorites } from "../../lib/helpers";
import ItemCard from "../../components/ItemCard";
import CustomSearchBar from "../../components/CustomSearchBar/CustomSearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import { ProgramOrder } from "../../types/orders.types";
import { useDebounce } from "../../hooks/useDebounce";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFavProgramMutation } from "../../hooks/useFavProgramMutation";

export const ProgramsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [count, setCount] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("Plus récents");
  const [order, setOrder] = useState<ProgramOrder>({
    field: "created_at",
    asc: false,
  });

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const filterList = ["Plus récents", "Moins récents", "A-Z", "Z-A"];

  const fetchProgramsWithFavorites = async ({ pageParam }: any) => {
    try {
      const programs = await fetchPrograms(
        pageParam,
        { title: debouncedSearchQuery },
        order
      );

      setCount(programs.count ?? 0);

      return formatProgramsWithFavorites(programs.data, programs.nextCursor);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const queryKey = ["programs", { title: debouncedSearchQuery }, order];

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    status,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn: fetchProgramsWithFavorites,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
  });

  const mergedData = data?.pages.flatMap((page) => page.programs) ?? [];

  const uniqueData = mergedData?.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

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

  const handleProgramPress = (id: number) => {
    navigation.navigate("Program", { id });
  };

  const toggleFavorite = (id: number, isFav: boolean) => {
    handleMutationFav(id, isFav);
  };

  const { handleMutationFav } = useFavProgramMutation(queryKey);

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
              description={item.description ?? ""}
              pseudo={item.profiles?.pseudo ?? ""}
              isFav={item.isFav}
              onPressFav={() => toggleFavorite(item.id, item.isFav)}
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
