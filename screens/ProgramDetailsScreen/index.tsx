import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Divider,
  MD2Colors,
  Text,
} from "react-native-paper";
import TrainingHeader from "../../components/TrainingHeader/TrainingHeader";
import { getPublicUrl } from "../../lib/supabase";
import CreatorCard from "../../components/CreatorCard";
import { fetchProgramById } from "../../api/programs";
import ItemCard from "../../components/ItemCard";
import { handleToggleFavoriteProgram } from "../../api/favorites";
import { useAuth } from "../../hooks/useAuth";
import theme from "../../theme";
import { StackScreenProps } from "@react-navigation/stack";
import { AppParamListBase } from "../../navigations/main";

export const ProgramDetailsScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "ProgramDetailsScreen">) => {
  const id = 12;

  const { session } = useAuth();

  const queryClient = useQueryClient();
  const queryKey = ["program", id];

  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchProgramById(id, session?.user.user_metadata.profile_id),
  });

  const mutation = useMutation({
    mutationKey: queryKey,
    mutationFn: handleToggleFavoriteProgram,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const toggleFavorite = (id: number, isFav: boolean) => {
    mutation.mutate({ id, isFav });
  };

  if (isLoading)
    return <ActivityIndicator animating={true} color={MD2Colors.red800} />;

  if (error) return <Text>{error.message}</Text>;

  return (
    <ScrollView>
      <View>
        <TrainingHeader
          title={data?.title || ""}
          imageUrl={getPublicUrl(
            "images",
            data?.sessions[0]?.exercises[1]?.banner_image || ""
          )}
          duration={(
            data?.sessions.reduce(
              (acc, session) =>
                acc +
                session.exercises.reduce(
                  (exAcc, exercise) =>
                    exAcc + (exercise.estimated_time_seconds || 0),
                  0
                ),
              0
            ) || 0
          ).toString()}
          categories={
            data?.sessions.flatMap((session) =>
              session.exercises.flatMap((exercise) =>
                exercise.categories.map((category) => category.name)
              )
            ) || []
          }
          isFavorite={
            !!data?.favorite_programs && data.favorite_programs.length > 0
          }
          onToggleFavorite={() => {
            toggleFavorite(data!.id, data!.favorite_programs.length > 0);
          }}
        />
      </View>
      <View style={styles.containertxt}>
        <Text style={styles.title}>Description</Text>
        <Divider style={{ height: 1, marginBottom: 20 }} />
        <Text style={styles.txtdescription}>{data?.description}</Text>
      </View>
      <View style={styles.containertxt}>
        {data?.sessions.map((session) => (
          <View key={session.id}>
            <Divider bold style={{ marginVertical: 20 }} />
            <Text style={styles.title}>{session.title}</Text>
            <Text style={styles.txtdescription}>{session.description}</Text>
            <Text
              style={{
                marginTop: 24,
                marginBottom: 8,
                fontSize: 16,
                color: theme.colors.primary,
              }}
            >
              Exercices à réaliser
            </Text>
            {session.exercises.map((exercise) => (
              <View key={exercise.id} style={styles.itemCardContainer}>
                <ItemCard
                  title={exercise.title}
                  time={exercise.estimated_time_seconds ?? 0}
                  categories={
                    exercise.categories.map((categorie) => categorie.name) ?? []
                  }
                  pseudo={data?.profiles?.pseudo || ""}
                  onPressNav={() => console.log("Go to exercise")}
                />
              </View>
            ))}
          </View>
        ))}
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
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  itemCardContainer: {
    marginBottom: 15,
  },
});
