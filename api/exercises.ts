import { client } from "../lib/supabase";
import { Tables } from "../types/database.types";

export const fetchExerciseById = async (
  id: number,
): Promise<Partial<Tables<"exercises">>> => {
  const { data, error } = await client
    .from("exercises")
    .select("*,categories(*)")
    .eq("exercise_id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};
