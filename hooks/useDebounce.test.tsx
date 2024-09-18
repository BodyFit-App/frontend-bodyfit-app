import { renderHook, act } from "@testing-library/react-native";
import { useDebounce } from "./useDebounce";

jest.useFakeTimers();
describe("useDebounce", () => {
  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("test", 500));

    expect(result.current).toBe("test");
  });

  it("should return the updated value after the delay", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: "initial" },
    });

    expect(result.current).toBe("initial");

    rerender({ value: "updated" });

    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated");
  });

  it("should debounce multiple updates within the delay", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: "initial" },
    });

    expect(result.current).toBe("initial");

    rerender({ value: "update1" });
    rerender({ value: "update2" });

    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("initial");

    rerender({ value: "final-update" });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("final-update");
  });

  it("should cancel the debounce if unmounted", () => {
    const { result, unmount, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: "initial" },
    });

    expect(result.current).toBe("initial");

    rerender({ value: "updated" });

    expect(result.current).toBe("initial");

    unmount();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("initial");
  });
});
