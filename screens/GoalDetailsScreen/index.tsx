import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, ScrollView, View, StyleSheet } from "react-native";

import { Divider, MD2Colors, Text } from "react-native-paper";

import { getPublicUrl } from "../../lib/supabase";

import GoalHeader from "../../components/GoalHeader";
import { fetchGoalById, updateStepStatus } from "../../api/goals";
import StepCard from "../../components/StepCard/StepCard";
import { StackScreenProps } from "@react-navigation/stack";
import { AppParamListBase } from "../../navigations/main";
import { useAuth } from "../../hooks/useAuth";

export const GoalDetailsScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "GoalDetailsScreen">) => {
  const id = route.params.id;
  const { session } = useAuth();

  const queryClient = useQueryClient();
  const queryKey = ["goal", id];
  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchGoalById(+id!),
  });

  const steps = data?.steps.sort((a, b) => a.id - b.id) || [];

  const handleUpdateAchieved = async ({ id, isAchieved }: any) => {
    try {
      return updateStepStatus(id, isAchieved);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const mutation = useMutation({
    mutationKey: queryKey,
    mutationFn: handleUpdateAchieved,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const toggleAchieved = (id: number, isAchieved: boolean) => {
    mutation.mutate({ id, isAchieved });
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
      <View>
        <GoalHeader
          title={data?.title || ""}
          imageUrl={getPublicUrl("images", data?.banner_image ?? "")}
          startDate={new Date(data?.date_start ?? "")}
          endDate={new Date(data?.date_end ?? "")}
          progress={
            data?.steps && data.steps.length > 0
              ? data.steps.filter((step) => step.achieved).length /
                data.steps.length
              : 0
          }
          onPressEdit={() =>
            navigation.push("GoalFormScreen", { id: data?.id })
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
        <Text style={styles.title}>Les étapes</Text>
        <Divider style={{ height: 1, marginBottom: 20 }} />
        {steps?.map((step, index) => (
          <View key={step.id} style={styles.containerCard}>
            <StepCard
              stepNumber={index + 1}
              totalSteps={data?.steps.length || 0}
              description={step.description ?? ""}
              isEditable={false}
              isValidated={step.achieved}
              onValidate={() => toggleAchieved(step.id, !step.achieved)}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containertxt: {
    padding: 16,
  },
  containerCard: {
    flex: 1,
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
