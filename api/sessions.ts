import { client } from "../lib/supabase";
import { TablesInsert } from "../types/database.types";

export const upsertSession = async (
  exercise_id: number,
  body: TablesInsert<"sessions">,
) => {
  const { data, error } = await client
    .from("sessions")
    .upsert(body).select();

  if (error) throw new Error(error.message);

  addExerciseSession({ exercise_id, session_id: data[0].id });

  return data;
};

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
  body: TablesInsert<"exercises_sessions">,
) => {
  const { error } = await client
    .from("exercises_sessions")
    .insert(body);

  if (error) throw new Error(error.message);
};

export const deleteExerciseSession = async (
  exercise_id: number,
  session_id: number,
) => {
  const { error } = await client
    .from("exercises_sessions")
    .delete()
    .eq("exercise_id", exercise_id)
    .eq("session_id", session_id);

  if (error) throw new Error(error.message);
};
