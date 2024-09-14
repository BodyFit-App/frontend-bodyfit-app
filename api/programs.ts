import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { getRange } from "../lib/helpers";
import { client } from "../lib/supabase";
import { TablesInsert } from "../types/database.types";
import { ProgramFilter } from "../types/filters.types";
import { ProgramOrder } from "../types/orders.types";
import { addExerciseSession } from "./sessions";

export const fetchProgramById = async (
  id: number,
) => {
  const { data, error } = await client
    .from("programs")
    .select(
      "*,sessions(*,exercises(*,categories(*),profiles(id,pseudo,avatar_url))),profiles(*)",
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const fetchPrograms = async (
  page: number = 1,
  filter?: ProgramFilter,
  order: ProgramOrder = { field: "created_at", asc: false },
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
  sessions: {
    id?: number;
    title: string;
    description: string;
    exerciseIds: number[];
  }[] = [],
) => {
  const { data, error } = await client
    .from("programs")
    .upsert(body).select().single();

  if (error) throw new Error(error.message);

  sessions.forEach(async ({ id, title, description, exerciseIds }) => {
    const { id: sessionId } = await addProgramSession(data.id, {
      id,
      title,
      description,
    });
    addExerciseSession(sessionId, exerciseIds);
  });
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
