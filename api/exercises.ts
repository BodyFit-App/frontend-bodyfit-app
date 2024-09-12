import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { getRange } from "../lib/helpers";
import { client } from "../lib/supabase";
import { TablesInsert } from "../types/database.types";
import { ExerciseFilter } from "../types/filters.types";
import { ExerciseOrder } from "../types/orders.types";

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
  order: ExerciseOrder = { field: "created_at", asc: false },
) => {
  const [start, end] = getRange(page, NB_ELTS_PER_PAGE);

  let query = client
    .from("exercises")
    .select("*,categories(*),profiles(id,pseudo,avatar_url)", {
      count: "exact",
    })
    .range(start, end);

  if (filter?.category) {
    query = query.eq("categories.name", filter.category);
  }

  if (filter?.profile_id) {
    query = query.eq("profiles.id", filter.profile_id);
  }

  if (filter?.profile_pseudo) {
    query = query.ilike("profiles.pseudo", `%${filter.profile_pseudo}%`);
  }

  if (filter?.title) {
    query = query.ilike("title", `%${filter.title}%`);
  }

  query = query.order(order.field, { ascending: order.asc });

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  const totalPages = count ? Math.ceil(count! / NB_ELTS_PER_PAGE) : 0;
  const nextPage = page + 1;
  const nextCursor = nextPage > totalPages ? null : nextPage;

  return { data, nextCursor, count };
};

export const getFavoriteStatusForExercises = async (exerciseIds: number[]) => {
  const { data, error } = await client
    .from("favorite_exercises")
    .select("exercise_id")
    .in("exercise_id", exerciseIds);

  if (error) throw new Error(error.message);

  return data.map(({ exercise_id }) => exercise_id);
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

  console.log(data, error);

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
