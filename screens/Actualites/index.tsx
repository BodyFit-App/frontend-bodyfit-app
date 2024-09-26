import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { fetchFolloweesActivity } from "../../api/followings";
import ActuCard from "../../components/ActuCard/ActuCard";
import { useAuth } from "../../hooks/useAuth";
import { StackScreenProps } from "@react-navigation/stack";
import { AppParamListBase } from "../../navigations/main";
import { Divider, Text } from "react-native-paper";

/**
 * ActualiteScreen Component
 *
 * This component displays a list of recent activities from users the current user follows.
 * It uses infinite scrolling to load more activities as the user scrolls down the list.
 * Each activity is displayed in an `ActuCard`, and users can navigate to detailed screens like
 * Goal, Exercise, or Program details.
 *
 * @component
 * @example
 * return <ActualiteScreen navigation={navigation} route={route} />;
 *
 * @param {StackScreenProps<AppParamListBase, "HomeScreen">} props - The props for the component, including navigation and route.
 * @returns {JSX.Element} The rendered ActualiteScreen component.
 */

const ActualiteScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "HomeScreen">) => {
  const { session } = useAuth();
  const profileId = session?.user.user_metadata.profile_id;

  /**
   * Fetches paginated activities from followees using the pageParam for pagination.
   *
   * @param {Object} params - Parameters for fetching paginated data.
   * @param {number} params.pageParam - The current page number for fetching activities.
   * @returns {Promise<Object>} - The fetched data, including the nextCursor for pagination.
   */

  const fetchFolloweesActivityWithPagination = async ({ pageParam = 1 }) => {
    try {
      const { data, nextCursor, count } = await fetchFolloweesActivity(
        pageParam
      );
      return { data, nextCursor, count };
    } catch (error) {
      // console.error(error);
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
    queryKey: ["followeesActivity", profileId],
    queryFn: fetchFolloweesActivityWithPagination,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const mergedData = data?.pages.flatMap((page) => page.data) ?? [];
  const uniqueData = mergedData?.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.title === item.title)
  );

  /**
   * Handles navigation to the appropriate details screen based on activity type.
   *
   * @param {number} id - The ID of the activity item.
   * @param {string} type - The type of activity (goals, exercises, programs).
   */

  const handleActivityPress = (id?: number, type?: string) => {
    if (type === "goals") {
      navigation.push("GoalDetailsScreen", { id } as never);
    } else if (type === "exercises") {
      navigation.push("ExerciseDetailsScreen", { id } as never);
    } else if (type === "programs") {
      navigation.push("ProgramDetailsScreen", { id } as never);
    } else {
      console.warn("Unknown type", type);
    }
  };

  /**
   * Handles navigation to the user's profile when their username is clicked.
   *
   * @param {number} id - The profile ID of the user.
   */
  const handlePseudoPress = (id?: number) => {
    navigation.push("ProfilDetailScreen" as never, { id } as never);
  };

  /**
   * Adjusts the description text based on the activity type.
   *
   * @param {string} item - The activity type.
   * @returns {string} - The action description text.
   */
  const adjustText = (item: any) => {
    if (item === "goals") {
      return "a atteint son objectif:";
    } else if (item === "exercises") {
      return "a créé un nouvel exercise:";
    } else {
      return "a ajouté le programme:";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fil d'actualités</Text>
      <Divider />
      {uniqueData?.length === 0 ? (
        <Text style={styles.noDataText}>
          Aucune activité à afficher pour le moment
        </Text>
      ) : (
        <FlatList
          data={uniqueData}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <ActuCard
              username={item.pseudo || ""}
              fullName={`${item.firstname || ""} ${item.lastname || ""}`}
              profileImageUrl={item.avatar_url || ""}
              actionDescription={adjustText(item.type) || ""}
              exerciseLinkText={item.title || ""}
              onActivityPress={() =>
                handleActivityPress(
                  item.id ? item.id : undefined,
                  item.type ? item.type : undefined
                )
              }
              onUsernamePress={() =>
                handlePseudoPress(item.profile_id ? item.profile_id : undefined)
              }
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#2F80ED",
  },
  noDataText: {
    textAlign: "center",
    margin: "auto",
    color: "#A0A0A0",
  },
});

export default ActualiteScreen;
