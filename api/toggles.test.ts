import {
  handleToggleFavoriteExercise,
  handleToggleFavoriteProgram,
  handleToggleFollow,
} from "./toggles";
import {
  addFavExercise,
  addFavProgram,
  deleteFavExercise,
  deleteFavProgram,
} from "./favorites";
import { addFollowing, deleteFolowing } from "./followings";

// Mock the imported functions
jest.mock("./favorites", () => ({
  addFavExercise: jest.fn(),
  addFavProgram: jest.fn(),
  deleteFavExercise: jest.fn(),
  deleteFavProgram: jest.fn(),
}));

jest.mock("./followings", () => ({
  addFollowing: jest.fn(),
  deleteFolowing: jest.fn(),
}));

describe("handleToggleFavoriteExercise", () => {
  it("should call deleteFavExercise and return isFav false when isFav is true", async () => {
    const id = 1;
    (deleteFavExercise as jest.Mock).mockResolvedValueOnce(null);

    const result = await handleToggleFavoriteExercise({ id, isFav: true });

    expect(deleteFavExercise).toHaveBeenCalledWith(id);
    expect(result).toEqual({ id, isFav: false });
  });

  it("should call addFavExercise and return isFav true when isFav is false", async () => {
    const id = 1;
    (addFavExercise as jest.Mock).mockResolvedValueOnce(null);

    const result = await handleToggleFavoriteExercise({ id, isFav: false });

    expect(addFavExercise).toHaveBeenCalledWith(id);
    expect(result).toEqual({ id, isFav: true });
  });

  it("should throw an error if deleteFavExercise fails", async () => {
    const id = 1;
    const errorMessage = "Delete failed";
    (deleteFavExercise as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage),
    );

    await expect(handleToggleFavoriteExercise({ id, isFav: true }))
      .rejects
      .toThrow(errorMessage);
  });

  it("should throw an error if addFavExercise fails", async () => {
    const id = 1;
    const errorMessage = "Add failed";
    (addFavExercise as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage),
    );

    await expect(handleToggleFavoriteExercise({ id, isFav: false }))
      .rejects
      .toThrow(errorMessage);
  });
});

describe("handleToggleFavoriteProgram", () => {
  it("should call deleteFavProgram and return isFav false when isFav is true", async () => {
    const id = 1;
    (deleteFavProgram as jest.Mock).mockResolvedValueOnce(null);

    const result = await handleToggleFavoriteProgram({ id, isFav: true });

    expect(deleteFavProgram).toHaveBeenCalledWith(id);
    expect(result).toEqual({ id, isFav: false });
  });

  it("should call addFavProgram and return isFav true when isFav is false", async () => {
    const id = 1;
    (addFavProgram as jest.Mock).mockResolvedValueOnce(null);

    const result = await handleToggleFavoriteProgram({ id, isFav: false });

    expect(addFavProgram).toHaveBeenCalledWith(id);
    expect(result).toEqual({ id, isFav: true });
  });

  it("should throw an error if deleteFavProgram fails", async () => {
    const id = 1;
    const errorMessage = "Delete program failed";
    (deleteFavProgram as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage),
    );

    await expect(handleToggleFavoriteProgram({ id, isFav: true }))
      .rejects
      .toThrow(errorMessage);
  });

  it("should throw an error if addFavProgram fails", async () => {
    const id = 1;
    const errorMessage = "Add program failed";
    (addFavProgram as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(handleToggleFavoriteProgram({ id, isFav: false }))
      .rejects
      .toThrow(errorMessage);
  });
});

describe("handleToggleFollow", () => {
  it("should call deleteFolowing and return isFollowed false when isFollowed is true", async () => {
    const id = 1;
    (deleteFolowing as jest.Mock).mockResolvedValueOnce(null);

    const result = await handleToggleFollow({ id, isFollowed: true });

    expect(deleteFolowing).toHaveBeenCalledWith(id);
    expect(result).toEqual({ id, isFollowed: false });
  });

  it("should call addFollowing and return isFollowed true when isFollowed is false", async () => {
    const id = 1;
    (addFollowing as jest.Mock).mockResolvedValueOnce(null);

    const result = await handleToggleFollow({ id, isFollowed: false });

    expect(addFollowing).toHaveBeenCalledWith(id);
    expect(result).toEqual({ id, isFollowed: true });
  });

  it("should throw an error if deleteFolowing fails", async () => {
    const id = 1;
    const errorMessage = "Unfollow failed";
    (deleteFolowing as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage),
    );

    await expect(handleToggleFollow({ id, isFollowed: true }))
      .rejects
      .toThrow(errorMessage);
  });

  it("should throw an error if addFollowing fails", async () => {
    const id = 1;
    const errorMessage = "Follow failed";
    (addFollowing as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(handleToggleFollow({ id, isFollowed: false }))
      .rejects
      .toThrow(errorMessage);
  });
});
