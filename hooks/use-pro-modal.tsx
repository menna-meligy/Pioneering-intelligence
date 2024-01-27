import { create } from 'zustand';

interface useProModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProModal = create<useProModalStore>((set) => ({
  isOpen: false,
  onOpen: () => {
    console.log("Opening modal");
    set({ isOpen: true });
  },
  onClose: () => {
    console.log("Closing modal");
    set({ isOpen: false });
  },
}));