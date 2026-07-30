import { create } from "zustand";

interface ActiveScreenState {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
}

export const useActiveScreenStore = create<ActiveScreenState>((set) => ({
  activeIndex: 0,
  setActiveIndex: (index) => set({ activeIndex: index }),
  bgColor: "#FBF6EC",
  setBgColor: (color) => set({ bgColor: color }),
}));
