import { useRoute, RouteProp } from "@react-navigation/native";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchProgramById, upsertProgram } from "../../api/programs";
import { View, ScrollView } from "react-native";
import ProgramPanel from "./ProgramPanel";
import SessionPanel from "./SessionPanel";

export type FormData = {
  title: string;
  description?: string;
  visible: boolean;
  sessions?: Array<{
    id?: number;
    title: string;
    description: string;
    exerciseIds: number[];
  }>;
};

type ParamListBase = {
  ProgramFormScreen: {
    programId?: number;
  };
};

const ProgramFormScreen = () => {
  const route = useRoute<RouteProp<ParamListBase>>();
  const queryClient = useQueryClient();
  const programId = route.params?.programId || 4;
  const isEditMode = !!programId;

  const { data: program, isSuccess } = useQuery({
    queryKey: ["program", programId],
    queryFn: () => fetchProgramById(programId!),
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
      upsertProgram(
        { ...(isEditMode && { id: programId }), ...rest },
        sessions
      );
    } catch (error) {
      console.error(error);
    }
  };

  const upsertMutation = useMutation({
    mutationFn: handleUpsert,
    onSuccess: () => {
      /*
       * WARNING !! It does not mutate sessions ids so you may need to force a complete refetch
       * if you try to modify a session and re-upsert, it might create a new session instead of updating it
       */
      queryClient.invalidateQueries({ queryKey: ["program", programId] });
      // navigation.goBack();
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

export default ProgramFormScreen;
