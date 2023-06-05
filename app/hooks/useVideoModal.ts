import { create } from "zustand";

interface VideoModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useVideoModal = create<VideoModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useVideoModal;
