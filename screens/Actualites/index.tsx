import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { fetchFolloweesActivity } from "../../api/followings";
import { StackNavigationProp } from "@react-navigation/stack";
import ActuCard from "../../components/ActuCard/ActuCard";
import CustomSearchBar from "../../components/CustomSearchBar/CustomSearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import { useAuth } from "../../hooks/useAuth";
import { useDebounce } from "../../hooks/useDebounce";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const ActualiteScreen = () => {
  const { session } = useAuth();
  const profileId = session?.user.user_metadata.profile_id;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Plus récents");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchFolloweesActivityWithPagination = async ({ pageParam }: any) => {
    try {
      return fetchFolloweesActivity(pageParam);
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["followeesActivity", profileId, { title: debouncedSearchQuery }],
    queryFn: fetchFolloweesActivityWithPagination,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return undefined;
      return pages.length + 1;
    },
  });

  const mergedData = data?.pages.flatMap((page) => page) ?? [];

  const handleFilterChange = (selectedFilter: string) => {
    setSelectedFilter(selectedFilter);
  };

  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleExercicePress = (id: number, type: string) => {
    navigation.navigate(type, { id });
  };

  return (
    <View style={styles.container}>
      <CustomSearchBar
        placeholder="Rechercher"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FilterBar
        filters={["Plus récents", "Moins récents"]}
        defaultFilter={selectedFilter}
        onFilterChange={handleFilterChange}
      />
      <FlatList
        data={mergedData}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <ActuCard
            username={item.pseudo || "Unknown"}
            fullName={`${item.firstname || ""} ${item.lastname || ""}`}
            profileImageUrl={item.avatar_url || ""}
            exerciseLinkText={item.title || "Exercice"}
            onExercisePress={() => console.log("Pressed on exercise")}
            onUsernamePress={() => console.log("Pressed on username")}
          />
        )}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
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
    justifyContent: "center",
    paddingHorizontal: 16,
  },
});

export default ActualiteScreen;
