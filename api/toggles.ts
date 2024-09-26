import {
  addFavExercise,
  addFavProgram,
  deleteFavExercise,
  deleteFavProgram,
} from "./favorites";
import { addFollowing, deleteFolowing } from "./followings";

/**
 * Toggles the favorite status of an exercise.
 *
 * @param {Object} params - The parameters for toggling the favorite status.
 * @param {number} params.id - The ID of the exercise.
 * @param {boolean} params.isFav - The current favorite status of the exercise.
 * @returns {Promise<{ id: number; isFav: boolean }>} - The updated favorite status.
 * @throws {Error} - Throws an error if the operation fails.
 */

export const handleToggleFavoriteExercise = async (
  { id, isFav }: { id: number; isFav: boolean },
) => {
  try {
    if (isFav) {
      await deleteFavExercise(id);
      return { id, isFav: false };
    }
    await addFavExercise(id);
    return { id, isFav: true };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

/**
 * Toggles the favorite status of a program.
 *
 * @param {Object} params - The parameters for toggling the favorite status.
 * @param {number} params.id - The ID of the program.
 * @param {boolean} params.isFav - The current favorite status of the program.
 * @returns {Promise<{ id: number; isFav: boolean }>} - The updated favorite status.
 * @throws {Error} - Throws an error if the operation fails.
 */

export const handleToggleFavoriteProgram = async (
  { id, isFav }: { id: number; isFav: boolean },
) => {
  try {
    if (isFav) {
      await deleteFavProgram(id);
      return { id, isFav: false };
    }
    await addFavProgram(id);
    return { id, isFav: true };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

/**
 * Toggles the follow status of a user.
 *
 * @param {Object} params - The parameters for toggling the follow status.
 * @param {number} params.id - The ID of the user to follow/unfollow.
 * @param {boolean} params.isFollowed - The current follow status of the user.
 * @returns {Promise<{ id: number; isFollowed: boolean }>} - The updated follow status.
 * @throws {Error} - Throws an error if the operation fails.
 */

export const handleToggleFollow = async (
  { id, isFollowed }: { id: number; isFollowed: boolean },
) => {
  try {
    if (isFollowed) {
      await deleteFolowing(id);
      return { id, isFollowed: false };
    }
    await addFollowing(id);
    return { id, isFollowed: true };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
