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
    .select("*,categories(*),profiles(id,pseudo,avatar_url,firstname,lastname)")
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

export const fetchDropdownExercises = async () => {
  const { data: session, error: sessionError } = await client.auth.getSession();

  if (sessionError) throw new Error(sessionError.message);
  const user = session?.session?.user;
  const profile_id = user?.user_metadata.profile_id;

  const { data, error } = await client.from("exercises")
    .select("id, title, profile_id, favorite_exercises(*)")
    .eq("visible", true);

  if (error) throw new Error(error.message);

  const filteredExercises = data.filter((exercise) =>
    exercise.profile_id === profile_id ||
    (exercise.favorite_exercises &&
      exercise.favorite_exercises.some((fav) => fav.profile_id === profile_id))
  );

  return filteredExercises;
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
) => {
  const { data, error } = await client
    .from("exercises")
    .upsert(body)
    .select().single();

  if (error) throw new Error(error.message);

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

export const resetExerciseCategories = async (
  exerciseId: number,
) => {
  const { error } = await client
    .from("categories_exercises")
    .delete()
    .eq("exercise_id", exerciseId);

  if (error) throw new Error(error.message);
};
