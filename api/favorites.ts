import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { getRange } from "../lib/helpers";
import { client } from "../lib/supabase";

export const fetchFavExercises = async (page: number) => {
  const [start, end] = getRange(page, NB_ELTS_PER_PAGE);

  const { data, error } = await client.from("favorite_exercises").select(
    "*,exercises(*,categories(*),profiles(id,pseudo,avatar))",
  ).range(start, end);

  if (error) throw new Error(error.message);
  return data;
};

export const fetchDropdownExercises = async () => {
  const { data, error } = await client.from("favorite_exercises").select(
    "exercises(id, title)",
  );

  if (error) throw new Error(error.message);
  return data;
};

export const addFavExercise = async (exerciseId: number) => {
  const { error } = await client.from("favorite_exercises").insert({
    exercise_id: exerciseId,
  });
  if (error) throw new Error(error.message);
};

export const deleteFavExercise = async (id: number) => {
  const { error } = await client.from("favorite_exercises").delete().eq(
    "id",
    id,
  );
  if (error) throw new Error(error.message);
};

export const fetchFavPrograms = async (page: number) => {
  const [start, end] = getRange(page, NB_ELTS_PER_PAGE);

  const { data, error } = await client.from("favorite_programs").select(
    "*,programs(*,sessions(exercises(*,categories(*),profiles(id,pseudo,avatar))),profiles(*))",
  ).range(start, end);

  if (error) throw new Error(error.message);
  return data;
};

export const addFavProgram = async (programId: number) => {
  const { error } = await client.from("favorite_programs").insert({
    program_id: programId,
  });
  if (error) throw new Error(error.message);
};

export const deleteFavProgram = async (id: number) => {
  const { error } = await client.from("favorite_programs").delete().eq(
    "id",
    id,
  );
  if (error) throw new Error(error.message);
};
