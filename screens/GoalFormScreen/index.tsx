import { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import TextField from "../../components/TextField/TextField";
import theme from "../../theme";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Divider, Switch } from "react-native-paper";
import ImagePicker from "../../components/ImagePicker/ImagePicker";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TablesInsert } from "../../types/database.types";
import { uploadImage } from "../../buckets/images";
import {
  addSteps,
  fetchGoalById,
  resetSteps,
  upsertGoal,
} from "../../api/goals";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import { fr, registerTranslation } from "react-native-paper-dates";
import StepList from "./StepList";
import StepForm from "./StepForm";
import React from "react";

type ParamListBase = {
  GoalFormScreen: {
    goalId?: number;
  };
};

export type GoalData = any;

registerTranslation("fr", fr);

export default function GoalFormScreen() {
  const route = useRoute<RouteProp<ParamListBase>>();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const goalId = route.params?.goalId || 7;
  const isEditMode = !!goalId;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TablesInsert<"goals"> & { steps: TablesInsert<"steps">[] }>({
    defaultValues: {
      title: "",
      banner_image: "",
      date_start: "",
      date_end: "",
      description: "",
      visible: false,
      steps: [],
    },
  });

  const { data: goal, isSuccess } = useQuery({
    queryKey: ["goal", goalId],
    queryFn: () => fetchGoalById(goalId!),
    enabled: isEditMode,
  });

  const handleUpsert = async (body: TablesInsert<"goals"> & { steps: [] }) => {
    try {
      let banner_image = body.banner_image;
      if (banner_image && banner_image.startsWith("file://")) {
        const { path } = await uploadImage(banner_image, body.title, "goals");
        banner_image = path;
      }

      const { steps, ...data } = body;

      const newBody = {
        ...(isEditMode ? { id: goalId } : {}),
        ...data,
        banner_image: banner_image,
      };

      const goal = await upsertGoal(newBody);

      try {
        if (isEditMode) await resetSteps(goal.id);
        addSteps(
          steps.map((step: TablesInsert<"steps">) => ({
            ...step,
            goal_id: goal.id,
          }))
        );
      } catch (err) {
        console.error(err);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const upsertMutation = useMutation({
    mutationFn: handleUpsert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goal", goalId] });
      // navigation.goBack();
    },
  });

  const onSubmit = (data: any) => {
    upsertMutation.mutate(data);
  };

  useEffect(() => {
    if (isSuccess && goal) {
      reset({
        title: goal.title || "",
        banner_image: goal.banner_image || undefined,
        date_start: goal.date_start || "",
        date_end: goal.date_end || "",
        description: goal.description || "",
        visible: goal.visible || false,
        steps:
          goal.steps.map(({ id, title, description }) => ({
            id,
            title,
            description,
          })) || [],
      });
    }
  }, [isSuccess, goal, reset]);

  return (
    <View style={{ padding: 16 }}>
      <ScrollView>
        <View style={{ gap: 16 }}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                mode="outlined"
                label="Titre"
                placeholder="Ex: Course à pied"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="title"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <ImagePicker onChange={onChange} value={value || null} />
            )}
            name="banner_image"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                mode="outlined"
                label="Description"
                placeholder="Ex: Pensez à bien vous équiper"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || ""}
                multiline
                numberOfLines={10}
              />
            )}
            name="description"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomDatePicker
                onChange={(date) => onChange(date?.toDateString())}
                onBlur={onBlur}
                value={value ? new Date(value) : undefined}
                inputMode={"start"}
                locale="fr"
                label="Date de début"
              />
            )}
            name="date_start"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomDatePicker
                onChange={(date) => onChange(date?.toDateString())}
                onBlur={onBlur}
                value={value ? new Date(value) : undefined}
                inputMode={"start"}
                locale="fr"
                label="Date de fin"
              />
            )}
            name="date_end"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                mode="outlined"
                label="Description"
                placeholder="Ex: Pensez à bien vous équiper"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || ""}
                multiline
                numberOfLines={10}
              />
            )}
            name="description"
          />

          <Divider bold />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <StepForm value={value || []} onChange={onChange} />
                <StepList steps={value} onChange={onChange} />
              </>
            )}
            name="steps"
          />

          <Divider bold />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: theme.colors.secondary, fontSize: 16 }}>
                  Je souhaite partager cet objectif
                </Text>
                <Switch
                  style={{ marginLeft: 16 }}
                  onValueChange={onChange}
                  value={value}
                />
              </View>
            )}
            name="visible"
          />

          <CustomButton onPress={handleSubmit(onSubmit)}>
            {isEditMode ? "Modifier" : "Créer"}
          </CustomButton>
        </View>
      </ScrollView>
    </View>
  );
}
