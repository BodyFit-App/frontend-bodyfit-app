import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import theme from "../../theme";
import ObjectifCard from "../../components/ObjectifCard/ObjectifCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProfileById } from "../../api/profiles";
import { getPublicUrl } from "../../lib/supabase";
import ItemCard from "../../components/ItemCard";
import OtherProfilHeader from "../../components/OtherProfileHeader/OtherProfileHeader";
import { StackScreenProps } from "@react-navigation/stack";
import { handleToggleFollow } from "../../api/toggles";
import { AppParamListBase } from "../../navigations/main";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

export const ProfileDetailsScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "ProfileDetailsScreen">) => {
  const id = route.params.id;

  const queryClient = useQueryClient();
  const queryKey = ["profile", id];
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => fetchProfileById(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationKey: queryKey,
    mutationFn: handleToggleFollow,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const toggleFavorite = (id: number, isFollowed: boolean) => {
    mutation.mutate({ id, isFollowed });
  };

  if (isLoading)
    return (
      <ActivityIndicator
        testID="activity-indicator"
        animating={true}
        color={MD2Colors.red800}
      />
    );

  if (error) return <Text>{error.message}</Text>;

  return (
    <ScrollView>
      <View style={styles.profilheader}>
        {profile && (
          <OtherProfilHeader
            firstname={profile.firstname ?? ""}
            lastname={profile.lastname ?? ""}
            username={profile.pseudo ?? ""}
            followers={profile.followedBy?.length ?? 0}
            profileImage={getPublicUrl("images", profile.avatar_url ?? "")}
            exercisesCount={profile.exercises?.length ?? 0}
            programsCount={profile.programs?.length ?? 0}
            goalsCount={profile.goals?.length ?? 0}
            followed={profile.followedBy.length > 0}
            onFollowToggle={() =>
              toggleFavorite(profile.id, profile.followedBy.length > 0)
            }
          />
        )}
      </View>

      <View style={styles.containerobj}>
        <View style={styles.headerRow}>
          <Text style={styles.titletxt}>Ses objectifs</Text>
          <Text
            style={styles.subtitletxt}
            onPress={() =>
              navigation.push("GoalListScreen", {
                filters: { profile_id: id },
              })
            }
          >
            Tout afficher
          </Text>
        </View>
        <View style={styles.containercard}>
          {profile?.goals?.slice(-2).map((goal) => (
            <ObjectifCard
              key={goal.id}
              title={goal.title}
              description={goal.description ?? ""}
              progress={goal.achieved ? 1 : 0}
              startDate={goal.date_start ?? ""}
              endDate={goal.date_end ?? ""}
            />
          ))}
        </View>
      </View>

      <View style={styles.containerobj}>
        <View style={styles.headerRow}>
          <Text style={styles.titletxt}>Ses exercices</Text>
          <Text
            style={styles.subtitletxt}
            onPress={() =>
              navigation.push("ExerciseListScreen", {
                filters: { profile_id: id },
              })
            }
          >
            Tout afficher
          </Text>
        </View>
        <View style={styles.containercard}>
          {profile?.exercises?.slice(-2).map((exercise) => (
            <View style={styles.itemCardContainer} key={exercise.id}>
              <ItemCard
                title={exercise.title}
                time={exercise.estimated_time_seconds ?? 0}
                categories={
                  exercise.categories.map((categorie) => categorie.name) ?? []
                }
                pseudo={profile.pseudo ?? ""}
                onPressNav={() =>
                  navigation.push("ExerciseDetailsScreen", { id: exercise.id })
                }
              />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.containerobj}>
        <View style={styles.headerRow}>
          <Text style={styles.titletxt}>Ses programmes</Text>
          <Text
            style={styles.subtitletxt}
            onPress={() =>
              navigation.push("ProgramListScreen", {
                filters: { profile_id: id },
              })
            }
          >
            Tout afficher
          </Text>
        </View>
        <View style={styles.containercard}>
          {profile?.programs?.slice(-2).map((program) => (
            <View style={styles.itemCardContainer} key={program.id}>
              <ItemCard
                title={program.title}
                description={program.description ?? ""}
                pseudo={profile.pseudo ?? ""}
                onPressNav={() =>
                  navigation.push("ProgramDetailsScreen", { id: program.id })
                }
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profilheader: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  containeract: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  containerobj: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  containerbtn: {
    flexDirection: "row",
    marginTop: 20,
  },
  containercard: {
    flexDirection: "column",
    marginTop: 20,
  },
  containergrah: {
    marginTop: 40,
    alignItems: "center",
  },
  titletxt: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "600",
  },
  subtitletxt: {
    color: theme.colors.textPlaceholder,
    fontSize: 12,
    fontWeight: "600",
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 14,
    color: theme.colors.text,
  },
  noDataText: {
    color: theme.colors.textPlaceholder,
    fontSize: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemCardContainer: {
    marginBottom: 10,
  },
});
