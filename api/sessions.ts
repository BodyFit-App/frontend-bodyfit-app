import { client } from "../lib/supabase";
import { TablesInsert } from "../types/database.types";

export const upsertSession = async (
  body: TablesInsert<"sessions">,
) => {
  const { error } = await client
    .from("sessions")
    .upsert(body);

  if (error) throw new Error(error.message);
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
  id: number,
) => {
  const { error } = await client
    .from("exercises_sessions")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
};
