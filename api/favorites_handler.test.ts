const { handleToggleFavoriteExercise, handleToggleFavoriteProgram } = jest
  .requireActual("./favorites");

import { waitFor } from "@testing-library/react-native";
import {
  addFavExercise,
  addFavProgram,
  deleteFavExercise,
  deleteFavProgram,
} from "./favorites";

jest.mock("./favorites", () => ({
  deleteFavExercise: jest.fn(),
  addFavExercise: jest.fn(),
  deleteFavProgram: jest.fn(),
  addFavProgram: jest.fn(),
}));

describe("handleToggleFavoriteExercise", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should remove favorite exercise if isFav is true", async () => {
    (deleteFavExercise as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await handleToggleFavoriteExercise({ id: 1, isFav: true });

    waitFor(() => {
      expect(deleteFavExercise).toHaveBeenCalledWith(1);
      expect(result).toEqual({ id: 1, isFav: false });
    });
  });

  it("should add favorite exercise if isFav is false", async () => {
    (addFavExercise as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await handleToggleFavoriteExercise({ id: 1, isFav: false });

    waitFor(() => {
      expect(addFavExercise).toHaveBeenCalledWith(1);
      expect(result).toEqual({ id: 1, isFav: true });
    });
  });

  it("should throw an error if deleteFavExercise fails", async () => {
    waitFor(async () => {
      (deleteFavExercise as jest.Mock).mockRejectedValueOnce(
        new Error("Delete failed"),
      );

      await expect(handleToggleFavoriteExercise({ id: 1, isFav: true })).rejects
        .toThrow(
          "Delete failed",
        );
    });
  });

  it("should throw an error if addFavExercise fails", async () => {
    waitFor(async () => {
      (addFavExercise as jest.Mock).mockRejectedValueOnce(
        new Error("Add failed"),
      );

      await expect(handleToggleFavoriteExercise({ id: 1, isFav: false }))
        .rejects
        .toThrow(
          "Add failed",
        );
    });
  });
});

describe("handleToggleFavoriteProgram", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mock call history before each test
  });

  it("should remove favorite program if isFav is true", async () => {
    (deleteFavProgram as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await handleToggleFavoriteProgram({ id: 1, isFav: true });
    waitFor(() => {
      expect(deleteFavProgram).toHaveBeenCalledWith(1);
      expect(result).toEqual({ id: 1, isFav: false });
    });
  });

  it("should add favorite program if isFav is false", async () => {
    (addFavProgram as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await handleToggleFavoriteProgram({ id: 1, isFav: false });
    waitFor(() => {
      expect(addFavProgram).toHaveBeenCalledWith(1);
      expect(result).toEqual({ id: 1, isFav: true });
    });
  });

  it("should throw an error if deleteFavProgram fails", async () => {
    waitFor(async () => {
      (deleteFavProgram as jest.Mock).mockRejectedValueOnce(
        new Error("Delete failed"),
      );

      await expect(handleToggleFavoriteProgram({ id: 1, isFav: true })).rejects
        .toThrow(
          "Delete failed",
        );
    });
  });

  it("should throw an error if addFavProgram fails", async () => {
    waitFor(async () => {
      (addFavProgram as jest.Mock).mockRejectedValueOnce(
        new Error("Add failed"),
      );

      await expect(handleToggleFavoriteProgram({ id: 1, isFav: false })).rejects
        .toThrow(
          "Add failed",
        );
    });
  });
});
