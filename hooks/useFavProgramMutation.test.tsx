import { renderHook, act } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { addFavProgram, deleteFavProgram } from "../api/favorites";
import { useFavProgramMutation } from "./useFavProgramMutation";

// Mock API functions
jest.mock("../api/favorites", () => ({
  addFavProgram: jest.fn(),
  deleteFavProgram: jest.fn(),
}));

// Initialize QueryClient
const queryClient = new QueryClient();

const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useFavProgramMutation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call addFavProgram when isFav is false", async () => {
    (addFavProgram as jest.Mock).mockResolvedValue({ id: 1, isFav: true });

    const queryKey = ["programs", "testFilter"];
    queryClient.setQueryData(queryKey, {
      pages: [
        {
          programs: [{ id: 1, isFav: false }],
        },
      ],
    });

    const { result } = renderHook(() => useFavProgramMutation(queryKey), {
      wrapper,
    });

    act(() => {
      result.current.handleMutationFav(1, false);
    });

    await new Promise(setImmediate);

    expect(addFavProgram).toHaveBeenCalledWith(1);
    expect(deleteFavProgram).not.toHaveBeenCalled();

    expect(queryClient.getQueryData(queryKey)).toEqual({
      pages: [
        {
          programs: [{ id: 1, isFav: true }],
        },
      ],
    });
  });

  it("should call deleteFavExercise when isFav is true", async () => {
    (deleteFavProgram as jest.Mock).mockResolvedValue({ id: 1, isFav: false });

    const queryKey = ["programs", "testFilter"];
    queryClient.setQueryData(queryKey, {
      pages: [
        {
          programs: [{ id: 1, isFav: true }],
        },
      ],
    });

    const { result } = renderHook(() => useFavProgramMutation(queryKey), {
      wrapper,
    });

    act(() => {
      result.current.handleMutationFav(1, true);
    });

    await new Promise(setImmediate);

    expect(deleteFavProgram).toHaveBeenCalledWith(1);
    expect(addFavProgram).not.toHaveBeenCalled();

    expect(queryClient.getQueryData(queryKey)).toEqual({
      pages: [
        {
          programs: [{ id: 1, isFav: false }],
        },
      ],
    });
  });
});
