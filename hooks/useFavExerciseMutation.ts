import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavExercise, deleteFavExercise } from "../api/favorites";

export const handleToggleFavorites = async (
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
    throw error;
  }
};

export const useFavExerciseMutation = (queryKey: any) => {
  const queryClient = useQueryClient();

  const mutationFav = useMutation({
    mutationFn: handleToggleFavorites,
    onSuccess: ({ id, isFav }) => {
      const cachedData = queryClient.getQueryData(queryKey);

      if (!cachedData) {
        console.log(
          "Données non trouvées dans le cache pour la clé :",
          queryKey,
        );
        return;
      }

      queryClient.setQueryData(queryKey, (oldData: any) => ({
        ...oldData,
        pages: oldData.pages.map((page: any) => ({
          ...page,
          exercises: page.exercises.map((exercise: any) =>
            exercise.id === id ? { ...exercise, isFav } : exercise
          ),
        })),
      }));
    },
    onError: (error) => {
      console.error("Erreur lors de la mutation :", error);
    },
  });

  const handleMutationFav = (id: number, isFav: boolean) => {
    mutationFav.mutate({ id, isFav });
  };

  return { handleMutationFav, ...mutationFav };
};
