import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { getRange } from "../lib/helpers";
import { client } from "../lib/supabase";
import { TablesInsert } from "../types/database.types";

export const fetchGoalById = async (id: number) => {
  const { data, error } = await client.from("goals")
    .select("*, steps(*)").eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const fetchGoals = async (
  page: number = 1,
) => {
  const [start, end] = getRange(page, NB_ELTS_PER_PAGE);
  const { data, error } = await client
    .from("goals")
    .select("*")
    .range(start, end);

  if (error) throw new Error(error.message);

  return data;
};

export const upsertGoal = async (
  body: TablesInsert<"goals">,
) => {
  const { data, error } = await client
    .from("goals")
    .upsert(body).select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteGoal = async (
  id: number,
) => {
  const { error } = await client
    .from("goals")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
};

export const upsertStep = async (
  body: TablesInsert<"goals">,
) => {
  const { data, error } = await client
    .from("goals")
    .upsert(body).select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteStep = async (
  id: number,
) => {
  const { error } = await client
    .from("steps")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
};
