import {
  addFavExercise,
  addFavProgram,
  deleteFavExercise,
  deleteFavProgram,
} from "./favorites";
import { addFollowing, deleteFolowing } from "./followings";

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
    console.error(error);
    throw new Error((error as Error).message);
  }
};

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
    console.error(error);
    throw new Error((error as Error).message);
  }
};

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
    console.error(error);
    throw new Error((error as Error).message);
  }
};
