import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { getRange } from "../lib/helpers";
import { client } from "../lib/supabase";
import { TablesInsert } from "../types/database.types";
import { ExerciseFilter } from "../types/filters.types";

export const fetchExerciseById = async (
  id: number,
) => {
  const { data, error } = await client
    .from("exercises")
    .select("*,categories(*),profiles(id,pseudo,avatar_url)")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const fetchExercises = async (
  page: number = 1,
  filter?: ExerciseFilter,
) => {
  const [start, end] = getRange(page, NB_ELTS_PER_PAGE);

  let query = client
    .from("exercises")
    .select("*,categories(*),profiles(id,pseudo,avatar_url)")
    .range(start, end);

  if (filter?.category) {
    query = query.eq("categories.name", filter.category);
  }

  if (filter?.author) {
    query = query.eq("profiles.pseudo", filter.author);
  }

  if (filter?.title) {
    query = query.ilike("title", `%${filter.title}%`);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  let queryFav = client.from("favorite_exercises").select("exercise_id").in(
    "exercise_id",
    data.map(({ id }) => id),
  );

  const { data: dataFav, error: errorFav } = await queryFav;

  if (errorFav) throw new Error(errorFav.message);

  return data.map((row) => ({
    ...row,
    isFav: dataFav.some((fav) => fav.exercise_id === row.id),
  }));
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

  return data;
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
