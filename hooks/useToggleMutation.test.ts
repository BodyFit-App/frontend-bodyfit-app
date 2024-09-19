import { act, renderHook } from "@testing-library/react-native";
import { useToggleMutation } from "../hooks/useToggleMutation"; // Adjust the path to your file
import { useMutation } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

jest.mock("../api/favorites", () => ({
  addFavExercise: jest.fn(),
  deleteFavExercise: jest.fn(),
  addFavProgram: jest.fn(),
  deleteFavProgram: jest.fn(),
}));

describe("useToggleMutation", () => {
  const mockOnSuccess = jest.fn();
  const mockHandleToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call addFavExercise when toggling exercise to favorite", async () => {
    const mockMutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });

    const { result } = renderHook(() =>
      useToggleMutation(mockOnSuccess, mockHandleToggle)
    );

    const data = { id: 1, isFav: false };

    await act(async () => {
      result.current.handleMutation(data);
    });

    expect(mockMutate).toHaveBeenCalledWith(data);
  });

  it("should call deleteFavExercise when toggling exercise from favorite", async () => {
    const mockMutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });

    const { result } = renderHook(() =>
      useToggleMutation(mockOnSuccess, mockHandleToggle)
    );

    const data = { id: 2, isFav: true };

    await act(async () => {
      result.current.handleMutation(data);
    });

    expect(mockMutate).toHaveBeenCalledWith(data);
  });

  it("should handle success callback correctly", async () => {
    const mockMutate = jest.fn((data) => {
      mockOnSuccess(data);
    });

    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });

    const { result } = renderHook(() =>
      useToggleMutation(mockOnSuccess, mockHandleToggle)
    );

    const data = { id: 3, isFav: false };

    await act(async () => {
      result.current.handleMutation(data);
    });

    expect(mockOnSuccess).toHaveBeenCalledWith(data);
    expect(mockMutate).toHaveBeenCalledWith(data);
  });
});
