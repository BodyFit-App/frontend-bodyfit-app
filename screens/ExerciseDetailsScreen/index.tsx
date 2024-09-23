import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, ScrollView, View, StyleSheet } from "react-native";
import { fetchExerciseById } from "../../api/exercises";
import { Divider, MD2Colors, Text } from "react-native-paper";
import TrainingHeader from "../../components/TrainingHeader/TrainingHeader";
import { getPublicUrl } from "../../lib/supabase";
import CreatorCard from "../../components/CreatorCard";
import { handleToggleFavoriteExercise } from "../../api/toggles";
import { useAuth } from "../../hooks/useAuth";
import { StackScreenProps } from "@react-navigation/stack";
import { AppParamListBase } from "../../navigations/main";

export const ExerciseDetailsScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "ExerciseDetailsScreen">) => {
  const id = route.params.id;
  const { session } = useAuth();

  const queryClient = useQueryClient();
  const queryKey = ["exercise", id];

  const { data, error, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: () =>
      fetchExerciseById(id, session?.user.user_metadata.profile_id),
  });

  const mutation = useMutation({
    mutationKey: queryKey,
    mutationFn: handleToggleFavoriteExercise,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const toggleFavorite = (id: number, isFav: boolean) => {
    mutation.mutate({ id, isFav });
  };

  if (isLoading)
    return (
      <ActivityIndicator
        testID="loading-indicator"
        animating={true}
        color={MD2Colors.red800}
      />
    );

  if (error) return <Text>{error.message}</Text>;

  return (
    <ScrollView>
      <View>
        <TrainingHeader
          title={data?.title || ""}
          imageUrl={getPublicUrl("images", data?.banner_image ?? "")}
          duration={`${data?.estimated_time_minutes || 0}`}
          categories={data?.categories.map((c) => c.name) || []}
          isFavorite={
            !!data?.favorite_exercises && data.favorite_exercises.length > 0
          }
          onToggleFavorite={() =>
            toggleFavorite(data!.id, data!.favorite_exercises.length > 0)
          }
          onPressEdit={() =>
            navigation.push("ExerciseFormScreen", { id: data?.id })
          }
          isMine={
            !!(
              data?.profile_id &&
              session?.user.user_metadata.profile_id === data.profile_id
            )
          }
        />
      </View>
      <View style={styles.containertxt}>
        <Text style={styles.title}>Description</Text>
        <Divider style={{ height: 1, marginBottom: 20 }} />
        <Text style={styles.txtdescription}>{data?.description}</Text>
      </View>
      <View style={styles.containertxt}>
        <Text style={styles.title}>Créateur</Text>
        <Divider style={{ height: 1 }} />
      </View>
      <CreatorCard
        firstname={data?.profiles?.firstname || ""}
        lastname={data?.profiles?.lastname || ""}
        pseudo={data?.profiles?.pseudo || ""}
        avatarUrl={getPublicUrl("images", data?.profiles?.avatar_url ?? "")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containertxt: {
    padding: 16,
  },
  txtdescription: {
    fontSize: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 10,
  },
});
