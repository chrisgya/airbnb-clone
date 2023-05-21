import useSearchModal from "@/app/hooks/useSearchModal";
import { renderHook, act } from "@testing-library/react";

describe("useSearchModal", () => {
  it("should initialize with isOpen set to false", () => {
    const { result } = renderHook(() => useSearchModal());
    expect(result.current.isOpen).toBe(false);
  });

  it("should set isOpen to true when onOpen is called", () => {
    const { result } = renderHook(() => useSearchModal());
    act(() => {
      result.current.onOpen();
    });
    expect(result.current.isOpen).toBe(true);
  });

  it("should set isOpen to false when onClose is called", () => {
    const { result } = renderHook(() => useSearchModal());
    act(() => {
      result.current.onOpen();
      result.current.onClose();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
