import { client } from "../lib/supabase";

export const deleteSession = async (
  id: number,
) => {
  const { error } = await client
    .from("sessions")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
};

export const addExerciseSession = async (
  sessionId: number,
  exerciseIds: number[],
) => {
  const { error } = await client
    .from("exercises_sessions")
    .upsert(
      exerciseIds.map((exercise_id) => ({
        exercise_id,
        session_id: sessionId,
      })),
    );

  if (error) throw new Error(error.message);
};

export const resetExerciseSession = async (
  session_id: number,
) => {
  const { error } = await client
    .from("exercises_sessions")
    .delete()
    .eq("session_id", session_id);

  if (error) throw new Error(error.message);
};
