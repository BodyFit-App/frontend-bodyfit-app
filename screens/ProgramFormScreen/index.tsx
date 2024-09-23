import { useRoute, RouteProp } from "@react-navigation/native";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  addProgramSession,
  fetchProgramById,
  upsertProgram,
} from "../../api/programs";
import { View, ScrollView } from "react-native";
import ProgramPanel from "./ProgramPanel";
import SessionPanel from "./SessionPanel";
import {
  addExerciseSession,
  deleteSession,
  resetExerciseSession,
} from "../../api/sessions";
import { FormData } from "./types";
import { AppParamListBase } from "../../navigations/main";
import { StackScreenProps } from "@react-navigation/stack";

export const ProgramFormScreen = ({
  navigation,
  route,
  ...props
}: StackScreenProps<AppParamListBase, "ProgramFormScreen">) => {
  const queryClient = useQueryClient();
  const id = route.params?.id;
  const isEditMode = !!id;

  const [sessionToDelete, setSessionToDelete] = useState<number[]>([]);

  const { data: program, isSuccess } = useQuery({
    queryKey: ["program", id],
    queryFn: () => fetchProgramById(id!),
    enabled: isEditMode,
  });

  const formMethods = useForm<FormData>();
  const {
    control,
    reset,
    formState: { errors },
  } = formMethods;

  const handleUpsert = async (body: FormData) => {
    try {
      const { sessions, ...rest } = body;

      const program = await upsertProgram({
        ...(isEditMode && { id: id }),
        ...rest,
      });

      sessions?.forEach(async ({ id, title, description, exerciseIds }) => {
        if (id) await resetExerciseSession(id);

        const { id: sessionId } = await addProgramSession(program.id, {
          id,
          title,
          description,
        });
        await addExerciseSession(sessionId, exerciseIds);
      });

      sessionToDelete.forEach((idToDelete) => deleteSession(idToDelete));
    } catch (error) {
      // console.error(error);
    }
  };

  const upsertMutation = useMutation({
    mutationFn: handleUpsert,
    onSuccess: () => {
      /*
       * WARNING !! It does not "reset" sessions ids so you may need to force a complete refetch
       * if you try to modify a session and re-upsert, it might create a new session instead of updating it
       */
      queryClient.invalidateQueries({ queryKey: ["program", id] });
      navigation.goBack();
    },
  });

  useEffect(() => {
    if (isSuccess && program) {
      reset({
        title: program.title,
        description: program.description?.toString(),
        visible: program.visible,
        sessions: program.sessions.map(
          ({ id, title, description, exercises }) => {
            return {
              id,
              title,
              description: description?.toString(),
              exerciseIds: exercises.map(({ id }) => id),
            };
          }
        ),
      });
    }
  }, [isSuccess, program, reset]);

  const [step, setStep] = useState(1);
  const [selectIndex, setSelectedIndex] = useState<undefined | number>();

  const onAddSession = (index?: number) => {
    setSelectedIndex(index);
    setStep(2);
  };

  const onBack = () => {
    setStep(1);
  };

  const onSubmit = (data: FormData) => {
    upsertMutation.mutate(data);
  };

  return (
    <View style={{ padding: 16 }}>
      <ScrollView>
        <View>
          {step === 1 ? (
            <ProgramPanel
              isEditMode={isEditMode}
              onAddSession={onAddSession}
              onSubmit={onSubmit}
              formContext={formMethods}
              setSessionToDelete={setSessionToDelete}
            />
          ) : (
            <SessionPanel
              control={control}
              onBack={onBack}
              index={selectIndex}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};
