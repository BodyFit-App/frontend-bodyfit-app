import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { getRange } from "../lib/helpers";
import { client } from "../lib/supabase";
import { TablesInsert } from "../types/database.types";

export const fetchExerciseById = async (
  id: number,
) => {
  const { data, error } = await client
    .from("exercises")
    .select("*,categories(*),profiles(id,pseudo,avatar)")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const fetchExercises = async (
  page: number = 1,
) => {
  const [start, end] = getRange(page, NB_ELTS_PER_PAGE);
  const { data, error } = await client
    .from("exercises")
    .select("*,categories(*),profiles(id,pseudo,avatar)")
    .range(start, end);

  if (error) throw new Error(error.message);

  return data;
};

export const deleteExercise = async (
  id: number,
) => {
  const { error } = await client
    .from("exercises")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
};

export const upsertExercise = async (
  body: TablesInsert<"exercises">,
  categories: number[] = [],
) => {
  const { data, error } = await client
    .from("exercises")
    .upsert(body)
    .select();

  if (error) throw new Error(error.message);

  const exerciceCategories = categories.map(
    (catId) => ({ exercise_id: data[0].id, category_id: catId }),
  );
  addExerciseCategories(exerciceCategories);
};

export const addExerciseCategories = async (
  categories: TablesInsert<"categories_exercises">[],
) => {
  const { error } = await client
    .from("categories_exercises")
    .insert(categories);

  if (error) throw new Error(error.message);
};

export const deleteExerciseCategories = async (
  exerciseId: number,
  catId: number,
) => {
  const { error } = await client
    .from("categories_exercises")
    .delete()
    .eq("category_id", catId).eq("exercise_id", exerciseId);

  if (error) throw new Error(error.message);
};
