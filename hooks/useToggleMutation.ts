import { useMutation } from "@tanstack/react-query";
import {
  addFavExercise,
  addFavProgram,
  deleteFavExercise,
  deleteFavProgram,
} from "../api/favorites";

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

export const useToggleMutation = (
  onSuccess: (...args: any[]) => void,
  handleToggle: (data: any) => Promise<any>,
) => {
  const mutation = useMutation({
    mutationFn: handleToggle,
    onSuccess: onSuccess,
    onError: (error) => {
      console.error("Erreur lors de la mutation :", error);
    },
  });

  const handleMutation = (data: any) => {
    mutation.mutate(data);
  };

  return { handleMutation, ...mutation };
};
