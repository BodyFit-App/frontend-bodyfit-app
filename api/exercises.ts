import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { client } from "../lib/supabase";
import { TablesInsert } from "../types/database.types";

export const fetchExerciseById = async (
  id: number,
) => {
  const { data, error } = await client
    .from("exercises")
    .select("*,categories(*)")
    .eq("exercise_id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const fetchExercises = async (
  page: number = 1,
) => {
  const { data, error } = await client
    .from("exercises")
    .select("*,categories(*)")
    .range(page * NB_ELTS_PER_PAGE, page * NB_ELTS_PER_PAGE + NB_ELTS_PER_PAGE);

  if (error) throw new Error(error.message);

  return data;
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

  addExerciseCategories(
    categories.map(
      (catId) => ({ exercise_id: data[0].id, category_id: catId }),
    ),
  );

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
