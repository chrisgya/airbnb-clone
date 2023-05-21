import useRentModal from "@/app/hooks/useRentModal";
import { renderHook, act } from "@testing-library/react";

describe("useRentModal", () => {
  it("should initialize with isOpen set to false", () => {
    const { result } = renderHook(() => useRentModal());
    expect(result.current.isOpen).toBe(false);
  });

  it("should set isOpen to true when onOpen is called", () => {
    const { result } = renderHook(() => useRentModal());
    act(() => {
      result.current.onOpen();
    });
    expect(result.current.isOpen).toBe(true);
  });

  it("should set isOpen to false when onClose is called", () => {
    const { result } = renderHook(() => useRentModal());
    act(() => {
      result.current.onOpen();
      result.current.onClose();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
