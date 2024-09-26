import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { fetchProfiles } from "../../api/profiles";
import { useAuth } from "../../hooks/useAuth";
import { StackScreenProps } from "@react-navigation/stack";
import { AppParamListBase } from "../../navigations/main";
import FollowerCard from "../../components/FollowerCard/FollowerCard";
import CustomSearchBar from "../../components/CustomSearchBar/CustomSearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import { ProfileOrder } from "../../types/orders.types";
import { useDebounce } from "../../hooks/useDebounce";
import { handleToggleFollow } from "../../api/toggles";
import { useFollowOrder } from "../../hooks/useFollowOrder";

/**
 * FollowersScreen Component
 *
 * This screen displays a list of user profiles that can be searched, filtered, and followed/unfollowed.
 * It fetches the profiles using infinite scrolling, allowing the user to load more profiles as they scroll.
 * The screen provides search functionality, sorting by different criteria, and a follow toggle feature.
 *
 * @component
 * @example
 * return <FollowersScreen navigation={navigation} route={route} />;
 *
 * @param {StackScreenProps<AppParamListBase, "HomeScreen">} props - Navigation and route props provided by the Stack Navigator.
 * @returns {JSX.Element} The rendered FollowersScreen component.
 */

export const FollowersScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "HomeScreen">) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { order, selectedFilter, handleFilterChange, filterList } =
    useFollowOrder();

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const filters = { pseudo: debouncedSearchQuery };
  const { session } = useAuth();
  const profileId = session?.user.user_metadata.profile_id;

  /**
   * Fetches profiles with pagination support for infinite scrolling.
   *
   * @param {Object} param - Contains the page parameter for pagination.
   * @returns {Promise<Object>} The fetched profiles data.
   */

  const fetchProfileInfinite = async ({ pageParam }: any) => {
    try {
      const { data, nextCursor, count } = await fetchProfiles(
        pageParam,
        { pseudo: debouncedSearchQuery },
        order
      );

      return { data, nextCursor, count };
    } catch (error) {
      // console.error(error);

      throw new Error((error as Error).message);
    }
  };

  const queryClient = useQueryClient();
  const queryKey = ["profile", profileId, order, filters];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey,
    queryFn: fetchProfileInfinite,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const mergedData = data?.pages.flatMap((page) => page.data) ?? [];
  const uniqueData = mergedData?.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  const handlePseudoPress = (id: number) => {
    navigation.push("ProfileDetailsScreen", { id });
  };
  const count = data?.pages[0].count ?? 0;

  const mutation = useMutation({
    mutationKey: queryKey,
    mutationFn: handleToggleFollow,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
  
  /**
   * Toggles the follow status for a specific profile.
   *
   * @param {number} id - The profile ID.
   * @param {boolean} isFollowed - Indicates whether the profile is currently followed.
   */
  
  const toggleFavorite = (id: number, isFollowed: boolean) => {
    mutation.mutate({ id, isFollowed });
  };

  return (
    <View style={styles.container}>
      <CustomSearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Rechercher un pseudo"
        style={{ marginTop: 10 }}
      />
      <FilterBar
        defaultFilter={selectedFilter}
        filters={filterList}
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
            followed={item.followedBy.length > 0}
            onFollowToggle={() =>
              toggleFavorite(item.id, item.followedBy.length > 0)
            }
            onPressPseudo={() => handlePseudoPress(item.id)}
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
