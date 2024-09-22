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

export const ProgramListScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "ProgramListScreen">) => {
  return <ProgramListScene navigation={navigation} route={route} />;
};

export const ProgramListScene = ({ navigation, route }: any) => {
  const filtersParam = route.params?.filters || {};
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const { order, handleFilterChange, selectedFilter, filterList } =
    useFilterOrder();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const filters = { title: debouncedSearchQuery, ...filtersParam };

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
