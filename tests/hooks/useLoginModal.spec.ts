import useLoginModal from "@/app/hooks/useLoginModal";
import { renderHook, act } from "@testing-library/react";

describe("useLoginModal", () => {
  it("should initialize with isOpen set to false", () => {
    const { result } = renderHook(() => useLoginModal());
    expect(result.current.isOpen).toBe(false);
  });

  it("should set isOpen to true when onOpen is called", () => {
    const { result } = renderHook(() => useLoginModal());
    act(() => {
      result.current.onOpen();
    });
    expect(result.current.isOpen).toBe(true);
  });

  it("should set isOpen to false when onClose is called", () => {
    const { result } = renderHook(() => useLoginModal());
    act(() => {
      result.current.onOpen();
      result.current.onClose();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
