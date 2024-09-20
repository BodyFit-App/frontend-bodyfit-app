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

  const fetchFolloweesActivityWithPagination = async ({ pageParam = 1 }) => {
    try {
      const { data, nextCursor, count } = await fetchFolloweesActivity(pageParam);
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
  
  console.log("data", data);
  
  const mergedData = data?.pages.flatMap((page) => page.data) ?? [];
  const uniqueData = mergedData?.filter(
    (item, index, self) => index === self.findIndex((t) => t.title === item.title)
  ); 


  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleExercicePress = (id: number, type: string) => {
    navigation.navigate(type);
  };

  const adjustText = (item: any)=> {
    if (item === "goals"){
       return "a atteint son objectif:"
    } else if (item === "exercises"){
       return "a créé un nouvel exercise:"
    }  else {
       return "a ajouté le programme:"}
  }

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
      onActivityPress={() => console.log("Pressed on exercise")}
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
