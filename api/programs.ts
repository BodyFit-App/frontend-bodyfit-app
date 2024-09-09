import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { getRange } from "../lib/helpers";
import { client } from "../lib/supabase";
import { TablesInsert } from "../types/database.types";
import { ProgramFilter } from "../types/filters.types";

export const fetchProgramById = async (
  id: number,
) => {
  const { data, error } = await client
    .from("programs")
    .select(
      "*,sessions(*,exercises(*,categories(*),profiles(id,pseudo,avatar))),profiles(*)",
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const fetchPrograms = async (
  page: number = 1,
  filter?: ProgramFilter,
) => {
  const [start, end] = getRange(page, NB_ELTS_PER_PAGE);

  let query = client
    .from("programs")
    .select(
      "*,sessions(exercises(*,categories(*),profiles(id,pseudo,avatar))),profiles(*)",
      { count: "exact" },
    )
    .range(start, end);

  if (filter?.category) {
    query = query.contains("sessions.exercises.categories.name", [
      filter.category,
    ]);
  }

  if (filter?.author) {
    query = query.eq("profiles.pseudo", filter.author);
  }

  if (filter?.title) {
    query = query.ilike("title", `%${filter.title}%`);
  }

  const { data, count, error } = await query;

  if (error) throw new Error(error.message);

  const totalPages = count ? Math.ceil(count! / NB_ELTS_PER_PAGE) : 0;
  const nextPage = page + 1;
  const nextCursor = nextPage > totalPages ? null : nextPage;

  return { data, nextCursor, count };
};

export const getFavoriteStatusForPrograms = async (programIds: number[]) => {
  const { data, error } = await client
    .from("favorite_programs")
    .select("program_id")
    .in("program_id", programIds);

  if (error) throw new Error(error.message);

  return data.map(({ program_id }) => program_id);
};

export const deleteProgram = async (
  id: number,
) => {
  const { error } = await client
    .from("programs")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
};

export const upsertProgram = async (
  body: TablesInsert<"programs">,
) => {
  const { error } = await client
    .from("programs")
    .upsert(body);

  if (error) throw new Error(error.message);
};
