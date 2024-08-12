import { create } from "zustand";

interface ZapStore {
  trigger: string;
  actions: string[];
  setTrigger: (triggerId: string) => void;
  addAction: (actionId: string) => void;
  removeAction: (actionId: string) => void;
}

export const useZapStore = create<ZapStore>((set) => ({
  trigger: "",
  actions: [],
  setTrigger: (triggerId) => {
    set({ trigger: triggerId });
  },
  addAction: (actionId) => {
    set((state) => ({ actions: [...state.actions, actionId] }));
  },
  removeAction: (actionId) => {
    set((state) => ({
      actions: state.actions.filter((id) => id !== actionId),
    }));
  },
}));
