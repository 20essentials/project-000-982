import { create } from "zustand";

type ScrollinState = {
  isDown: boolean;
  startX: number;
  scrollLeft: number;
  setIsDown: (value: boolean) => void;
  setStartX: (value: number) => void;
  setScrollLeft: (value: number) => void;
};

export const useScrollinStore = create<ScrollinState>((set) => ({
  isDown: false,
  startX: 0,
  scrollLeft: 0,
  setIsDown: (value) => set({ isDown: value }),
  setStartX: (value) => set({ startX: value }),
  setScrollLeft: (value) => set({ scrollLeft: value }),
}));
