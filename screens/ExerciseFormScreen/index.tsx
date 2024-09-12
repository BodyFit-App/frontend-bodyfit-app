import { useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import TextField from "../../components/TextField/TextField";
import theme from "../../theme";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Switch } from "react-native-paper";
import ImagePicker from "../../components/ImagePicker";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchExerciseById, upsertExercise } from "../../api/exercises";
import { TablesInsert } from "../../types/database.types";

export default function ExerciseFormScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const exerciseId = null;
  const isEditMode = !!exerciseId;

  const { data: exercise, isSuccess } = useQuery({
    queryKey: ["exercise", exerciseId],
    queryFn: () => fetchExerciseById(exerciseId!),
    enabled: isEditMode,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      banner_image: "",
      description: "",
      estimated_time_seconds: "1",
      visible: false,
    },
  });

  const upsertMutation = useMutation({
    mutationFn: (body: TablesInsert<"exercises">) =>
      upsertExercise({ ...(isEditMode ? { id: exerciseId } : {}), ...body }),
    onSuccess: () => {
      // queryClient.invalidateQueries(["exercise", exerciseId]);
      navigation.goBack();
    },
  });

  const onSubmit = (data: any) => {
    upsertMutation.mutate(data);
  };

  useEffect(() => {
    if (isSuccess && exercise) {
      reset({
        title: exercise.title || "",
        banner_image: exercise.banner_image || "",
        description: exercise.description?.toString() || "",
        estimated_time_seconds:
          exercise.estimated_time_seconds?.toString() || "1",
        visible: exercise.visible || false,
      });
    }
  }, [isSuccess, exercise, reset]);

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
              <ImagePicker onChange={onChange} value={value} />
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
                value={value}
                multiline
                numberOfLines={10}
              />
            )}
            name="description"
          />

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                mode="outlined"
                label="Temps estimé en minutes"
                placeholder="Ex: Temps estimé en minutes"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
            name="estimated_time_seconds"
          />

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
                  Je souhaite partager cet exercice
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
