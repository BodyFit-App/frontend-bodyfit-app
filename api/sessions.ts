import { client } from "../lib/supabase";

/**
 * Deletes a session by its ID.
 *
 * @param {number} id - The ID of the session to delete.
 * @throws {Error} - Throws an error if deleting the session fails.
 */

export const deleteSession = async (
  id: number,
) => {
  const { error } = await client
    .from("sessions")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
};

/**
 * Adds exercises to a session by upserting the relationship between exercises and the session.
 *
 * @param {number} sessionId - The ID of the session to which exercises will be added.
 * @param {number[]} exerciseIds - An array of exercise IDs to associate with the session.
 * @throws {Error} - Throws an error if adding exercises to the session fails.
 */

export const addExerciseSession = async (
  sessionId: number,
  exerciseIds: number[],
) => {
  const { error } = await client
    .from("exercises_sessions")
    .upsert(
      exerciseIds.map((exercise_id) => ({
        exercise_id,
        session_id: sessionId,
      })),
    );

  if (error) throw new Error(error.message);
};

/**
 * Resets the exercises associated with a session by deleting them.
 *
 * @param {number} session_id - The ID of the session for which exercises will be reset.
 * @throws {Error} - Throws an error if resetting the exercise session fails.
 */

export const resetExerciseSession = async (
  session_id: number,
) => {
  const { error } = await client
    .from("exercises_sessions")
    .delete()
    .eq("session_id", session_id);

  if (error) throw new Error(error.message);
};
