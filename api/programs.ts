import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { getRange } from "../lib/helpers";
import { client } from "../lib/supabase";
import { TablesInsert } from "../types/database.types";
import { ProgramFilter } from "../types/filters.types";
import { ProgramOrder } from "../types/orders.types";

export const fetchProgramById = async (
  id: number,
  profileIdForFavorites?: number,
) => {
  let query = client
    .from("programs")
    .select(
      "*,sessions(*,exercises(*,categories(*),profiles(id,pseudo,avatar_url))),profiles(*),favorite_programs!left(profile_id)",
    )
    .eq("id", id);

  if (profileIdForFavorites) {
    query = query.eq("favorite_programs.profile_id", profileIdForFavorites);
  }

  const { data, error } = await query.single();

  if (error) throw new Error(error.message);

  return data;
};

export const fetchPrograms = async (
  page: number = 1,
  filter?: ProgramFilter,
  order: ProgramOrder = { field: "created_at", asc: false },
  profileIdForFavorites?: number,
) => {
  const [start, end] = getRange(page, NB_ELTS_PER_PAGE);

  let query = client
    .from("programs")
    .select(
      "*,sessions(exercises(*,categories(*),profiles(id,pseudo,avatar_url))),profiles(*),favorite_programs!left(profile_id)",
      { count: "exact" },
    )
    .range(start, end);

  if (profileIdForFavorites) {
    query = query.eq("favorite_programs.profile_id", profileIdForFavorites);
  }

  if (filter?.category) {
    query = query.contains("sessions.exercises.categories.name", [
      filter.category,
    ]);
  }

  if (filter?.profile_id) {
    query = query.eq("profiles.id", filter.profile_id);
  }

  if (filter?.title) {
    query = query.ilike("title", `%${filter.title}%`);
  }

  if (filter?.profile_pseudo) {
    query = query.ilike("profiles.pseudo", `%${filter.profile_pseudo}%`);
  }

  query = query.order(order.field, { ascending: order.asc });

  const { data, count, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const totalPages = count ? Math.ceil(count! / NB_ELTS_PER_PAGE) : 0;
  const nextPage = page + 1;
  const nextCursor = nextPage > totalPages ? null : nextPage;

  return { data, nextCursor, count };
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
  const { data, error } = await client
    .from("programs")
    .upsert(body).select().single();

  if (error) throw new Error(error.message);

  return data;
};

export const addProgramSession = async (
  programId: number,
  session: { id?: number; title: string; description: string },
) => {
  const { data, error } = await client
    .from("sessions")
    .upsert({ ...session, program_id: programId }).select().single();

  if (error) throw new Error(error.message);

  return data;
};

export const fetchDropdownPrograms = async () => {
  const { data: session, error: sessionError } = await client.auth.getSession();

  if (sessionError) throw new Error(sessionError.message);
  const user = session?.session?.user;
  const profile_id = user?.user_metadata.profile_id;

  const { data, error } = await client.from("programs")
    .select("id, title, profile_id, favorite_programs(*)")
    .eq("visible", true);

  if (error) throw new Error(error.message);

  const filteredPrograms = data.filter((program) =>
    program.profile_id === profile_id ||
    (program.favorite_programs &&
      program.favorite_programs.some((fav) => fav.profile_id === profile_id))
  );

  return filteredPrograms;
};
