import { create } from "zustand";

type TRentModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useRentModal = create<TRentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentModal;
