import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { fetchProfiles } from "../../api/profiles";
import ActuCard from "../../components/ActuCard/ActuCard";
import { useAuth } from "../../hooks/useAuth";
import { StackScreenProps } from "@react-navigation/stack";
import { AppParamListBase } from "../../navigations/main";
import FollowerCard from "../../components/FollowerCard/FollowerCard";
import CustomSearchBar from "../../components/CustomSearchBar/CustomSearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import { ProfileOrder } from "../../types/orders.types";
import { useDebounce } from "../../hooks/useDebounce";

const FollowersScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "HomeScreen">) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Plus récents");
  const [order, setOrder] = useState<ProfileOrder>({
    field: "created_at",
    asc: false,
  });


  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const filters = { pseudo: debouncedSearchQuery };
  const { session } = useAuth();
  const profileId = session?.user.user_metadata.profile_id;

  const fetchProfileInfinite = async ({ pageParam }: any) => {
    try {
      const { data, nextCursor, count } = await fetchProfiles(pageParam, filters, order);
      return { data, nextCursor, count };
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
    queryKey: ["profile", profileId, order, filters],
    queryFn: fetchProfileInfinite,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const mergedData = data?.pages.flatMap((page) => page.data) ?? [];
  const uniqueData = mergedData?.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  const handlePseudoPress = (id?: number) => {
    navigation.push("ProfilDetailScreen" as never, { id } as never);
  };
  const count = data?.pages[0].count ?? 0;

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
        setOrder({ field: "pseudo", asc: true });
        break;
      case "Z-A":
        setOrder({ field: "pseudo", asc: false });
        break;
      default:
        setOrder({ field: "created_at", asc: false });
    }
  };

  return (
    <View style={styles.container}>
      <CustomSearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Rechercher un pseudo"
      />
      <FilterBar
        defaultFilter={selectedFilter}
        filters={["Plus récents", "Moins récents", "A-Z", "Z-A"]}
        onFilterChange={handleFilterChange}
        resultsCount={count}
      />
      <FlatList
        data={uniqueData}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <FollowerCard
            username={item?.pseudo || ""}
            fullName={item?.firstname + " " + item?.lastname || ""}
            profileImageUrl={item.avatar_url || ""}
            followed={true}
            onFollowToggle={() => handlePseudoPress(item?.id || undefined)}
            followersCount={item?.followedBy?.length || 0}
            exercisesCount={item?.exercises?.length || 0}
            goalsCount={item?.goals?.length || 0}
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

export default FollowersScreen;
