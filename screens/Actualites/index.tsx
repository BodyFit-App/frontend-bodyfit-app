import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { fetchFolloweesActivity } from "../../api/followings";
import ActuCard from "../../components/ActuCard/ActuCard";
import { useAuth } from "../../hooks/useAuth";
import { StackScreenProps } from "@react-navigation/stack";
import { AppParamListBase } from "../../navigations/main";

const ActualiteScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "HomeScreen">) => {
  const { session } = useAuth();
  const profileId = session?.user.user_metadata.profile_id;

  const fetchFolloweesActivityWithPagination = async ({ pageParam = 1 }) => {
    try {
      const { data, nextCursor, count } = await fetchFolloweesActivity(
        pageParam
      );
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

  const handlePseudoPress = (id?: number) => {
    navigation.push("ProfilDetailScreen" as never, { id } as never);
  };

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
