import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { getRange } from "../lib/helpers";
import { client } from "../lib/supabase";
import { TablesInsert } from "../types/database.types";
import { GoalFilter } from "../types/filters.types";
import { GoalOrder } from "../types/orders.types";

/**
 * Fetches a goal by its ID, including associated steps.
 *
 * @param {number} id - The ID of the goal to fetch.
 * @returns {Promise<any>} - Returns a promise resolving to the goal data.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */

export const fetchGoalById = async (id: number) => {
  const { data, error } = await client.from("goals")
    .select("*, steps(*)").eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

/**
 * Fetches goals with optional filters, pagination, and ordering.
 *
 * @param {number} [page=1] - The page number to fetch.
 * @param {GoalFilter} [filter] - Optional filters to apply to the goal search.
 * @param {GoalOrder} [order={ field: "created_at", asc: false }] - Optional ordering for the fetched goals.
 * @returns {Promise<{ data: any[], nextCursor: number | null, count: number }>} - Returns a promise resolving to the goal data and pagination info.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */

export const fetchGoals = async (
  page: number = 1,
  filter?: GoalFilter,
  order: GoalOrder = { field: "created_at", asc: false },
) => {
  const [start, end] = getRange(page, NB_ELTS_PER_PAGE);

  let query = client
    .from("goals")
    .select("*, steps(*)", { count: "exact" })
    .range(start, end).order(order.field, { ascending: order.asc });

  if (filter?.achieved) {
    query = query.eq("achieved", filter.achieved);
  }

  if (filter?.title) {
    query = query.ilike("title", `%${filter.title}%`);
  }

  if (filter?.profile_id) {
    query = query.eq("profile_id", filter.profile_id);
  }

  const { data, count, error } = await query;

  if (error) throw new Error(error.message);

  const totalPages = count ? Math.ceil(count! / NB_ELTS_PER_PAGE) : 0;
  const nextPage = page + 1;
  const nextCursor = nextPage > totalPages ? null : nextPage;

  return { data, nextCursor, count };
};

/**
 * Upserts a goal (inserts or updates if existing).
 *
 * @param {TablesInsert<"goals">} body - The goal data to insert or update.
 * @returns {Promise<any>} - Returns a promise resolving to the inserted or updated goal data.
 * @throws {Error} - Throws an error if the upsert operation fails.
 */

export const upsertGoal = async (
  body: TablesInsert<"goals">,
) => {
  const { data, error } = await client
    .from("goals")
    .upsert(body).select().single();

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Deletes a goal by its ID.
 *
 * @param {number} id - The ID of the goal to delete.
 * @returns {Promise<void>} - Returns a promise that resolves when the goal is deleted.
 * @throws {Error} - Throws an error if the delete operation fails.
 */

export const deleteGoal = async (
  id: number,
) => {
  const { error } = await client
    .from("goals")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
};

/**
 * Adds steps to a goal.
 *
 * @param {TablesInsert<"steps">[]} body - The step data to insert.
 * @returns {Promise<any[]>} - Returns a promise resolving to the inserted steps.
 * @throws {Error} - Throws an error if the insert operation fails.
 */

export const addSteps = async (
  body: TablesInsert<"steps">[],
) => {
  const { data, error } = await client
    .from("steps")
    .upsert(body).select();

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Deletes all steps associated with a specific goal.
 *
 * @param {number} goal_id - The ID of the goal whose steps are to be deleted.
 * @returns {Promise<void>} - Returns a promise that resolves when the steps are deleted.
 * @throws {Error} - Throws an error if the delete operation fails.
 */

export const resetSteps = async (
  goal_id: number,
) => {
  const { error } = await client
    .from("steps")
    .delete()
    .eq("goal_id", goal_id);

  if (error) throw new Error(error.message);
};

/**
 * Updates the achieved status of a step.
 *
 * @param {number} id - The ID of the step to update.
 * @param {boolean} isAchieved - The new achieved status of the step.
 * @returns {Promise<any>} - Returns a promise resolving to the updated step.
 * @throws {Error} - Throws an error if the update operation fails.
 */

export const updateStepStatus = async (
  id: number,
  isAchieved: boolean,
) => {
  const { data, error } = await client
    .from("steps")
    .update({ achieved: isAchieved })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data;
};
