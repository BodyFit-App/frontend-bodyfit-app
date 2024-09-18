import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFavExerciseMutation } from "../hooks/useFavExerciseMutation";
import { addFavExercise, deleteFavExercise } from "../api/favorites";

// Mock API functions
jest.mock("../api/favorites", () => ({
  addFavExercise: jest.fn(),
  deleteFavExercise: jest.fn(),
}));

// Initialize QueryClient
const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useFavExerciseMutation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call addFavExercise when isFav is false", async () => {
    // Mock implementation for addFavExercise
    addFavExercise.mockResolvedValue({ id: 1, isFav: true });

    const { result, waitForNextUpdate } = renderHook(
      () => useFavExerciseMutation("testFilter"),
      { wrapper }
    );

    act(() => {
      result.current.handleMutationFav(1, false); // Trigger the mutation with isFav as false
    });

    await waitForNextUpdate(); // Wait for the mutation to complete

    expect(addFavExercise).toHaveBeenCalledWith(1);
    expect(deleteFavExercise).not.toHaveBeenCalled();
  });

  it("should call deleteFavExercise when isFav is true", async () => {
    // Mock implementation for deleteFavExercise
    deleteFavExercise.mockResolvedValue({ id: 1, isFav: false });

    const { result, waitForNextUpdate } = renderHook(
      () => useFavExerciseMutation("testFilter"),
      { wrapper }
    );

    act(() => {
      result.current.handleMutationFav(1, true); // Trigger the mutation with isFav as true
    });

    await waitForNextUpdate(); // Wait for the mutation to complete

    expect(deleteFavExercise).toHaveBeenCalledWith(1);
    expect(addFavExercise).not.toHaveBeenCalled();
  });
});
