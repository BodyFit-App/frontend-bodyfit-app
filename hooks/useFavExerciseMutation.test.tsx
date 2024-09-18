import { renderHook, act } from "@testing-library/react-native";
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

const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useFavExerciseMutation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call addFavExercise when isFav is false", async () => {
    (addFavExercise as jest.Mock).mockResolvedValue({ id: 1, isFav: true });

    queryClient.setQueryData(["exercises", "testFilter"], {
      pages: [
        {
          exercises: [{ id: 1, isFav: false }],
        },
      ],
    });

    const { result } = renderHook(() => useFavExerciseMutation("testFilter"), {
      wrapper,
    });

    act(() => {
      result.current.handleMutationFav(1, false);
    });

    await new Promise(setImmediate);

    expect(addFavExercise).toHaveBeenCalledWith(1);
    expect(deleteFavExercise).not.toHaveBeenCalled();

    expect(queryClient.getQueryData(["exercises", "testFilter"])).toEqual({
      pages: [
        {
          exercises: [{ id: 1, isFav: true }],
        },
      ],
    });
  });

  it("should call deleteFavExercise when isFav is true", async () => {
    (deleteFavExercise as jest.Mock).mockResolvedValue({ id: 1, isFav: false });

    // Mock the query client cache
    queryClient.setQueryData(["exercises", "testFilter"], {
      pages: [
        {
          exercises: [{ id: 1, isFav: true }],
        },
      ],
    });

    const { result } = renderHook(() => useFavExerciseMutation("testFilter"), {
      wrapper,
    });

    act(() => {
      result.current.handleMutationFav(1, true);
    });

    await new Promise(setImmediate);

    expect(deleteFavExercise).toHaveBeenCalledWith(1);
    expect(addFavExercise).not.toHaveBeenCalled();

    expect(queryClient.getQueryData(["exercises", "testFilter"])).toEqual({
      pages: [
        {
          exercises: [{ id: 1, isFav: false }],
        },
      ],
    });
  });
});
