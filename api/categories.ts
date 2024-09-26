import { client } from "../lib/supabase";

/**
 * Fetches all categories from the Supabase database.
 *
 * @returns {Promise<Array<{id: number, name: string}>>} - Returns a promise that resolves to an array of category objects with `id` and `name` fields.
 * @throws {Error} - Throws an error if the fetch request fails.
 *
 * @example
 * fetchCategories()
 *   .then(categories => console.log("Categories:", categories))
 *   .catch(err => console.error("Error fetching categories:", err));
 */

export const fetchCategories = async () => {
  const { data, error } = await client
    .from("categories")
    .select("id, name");

  if (error) throw new Error(error.message);

  return data;
};
