import { client } from "../lib/supabase";

export const fetchCategories = async () => {
  const { data, error } = await client
    .from("categories")
    .select("id, name");

  if (error) throw new Error(error.message);

  return data;
};
