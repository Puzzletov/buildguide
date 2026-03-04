"use client";

import { create } from "zustand";

import type { Priorities } from "@/lib/data/types";

export type ScreenId =
  | "s0"
  | "s-priorities"
  | "s-carousel"
  | "s-summary"
  | "s-steps"
  | "s-done"
  | "s-ide-editor"
  | "s-ide-agent"
  | "s-ide-goal";

interface GuideState {
  path: string | null;
  priorities: Priorities;
  carouselIndex: number;
  chosenTool: string | null;
  selectedIde: string | null;
  selectedAgent: string | null;
  ideGoal: string | null;
  stepIndex: number;
  history: ScreenId[];
  activeScreen: ScreenId;
  setPath: (path: string | null) => void;
  setPriority: <K extends keyof Priorities>(key: K, value: Priorities[K]) => void;
  setCarouselIndex: (index: number) => void;
  setChosenTool: (toolId: string | null) => void;
  setSelectedIde: (ideId: string | null) => void;
  setSelectedAgent: (agentId: string | null) => void;
  setIdeGoal: (goalPath: string | null) => void;
  setStepIndex: (index: number) => void;
  setHistory: (history: ScreenId[]) => void;
  setActiveScreen: (screen: ScreenId) => void;
  pushScreen: (id: ScreenId) => void;
  goBack: () => void;
  restart: () => void;
  resetPriorities: () => void;
}

export const useGuideStore = create<GuideState>((set) => ({
  path: null,
  priorities: { cost: null, speed: null, quality: null },
  carouselIndex: 0,
  chosenTool: null,
  selectedIde: null,
  selectedAgent: null,
  ideGoal: null,
  stepIndex: 0,
  history: [],
  activeScreen: "s0",
  setPath: (path) => set({ path }),
  setPriority: (key, value) =>
    set((state) => ({ priorities: { ...state.priorities, [key]: value } })),
  setCarouselIndex: (carouselIndex) => set({ carouselIndex }),
  setChosenTool: (chosenTool) => set({ chosenTool }),
  setSelectedIde: (selectedIde) => set({ selectedIde }),
  setSelectedAgent: (selectedAgent) => set({ selectedAgent }),
  setIdeGoal: (ideGoal) => set({ ideGoal }),
  setStepIndex: (stepIndex) => set({ stepIndex }),
  setHistory: (history) => set({ history }),
  setActiveScreen: (activeScreen) => set({ activeScreen }),
  pushScreen: (id) =>
    set((state) => ({
      history: [...state.history, state.activeScreen],
      activeScreen: id,
    })),
  goBack: () =>
    set((state) => {
      if (state.history.length === 0) {
        return { activeScreen: "s0" as ScreenId };
      }
      const prev = state.history[state.history.length - 1];
      return {
        history: state.history.slice(0, -1),
        activeScreen: prev,
      };
    }),
  restart: () =>
    set({
      path: null,
      priorities: { cost: null, speed: null, quality: null },
      carouselIndex: 0,
      chosenTool: null,
      selectedIde: null,
      selectedAgent: null,
      ideGoal: null,
      stepIndex: 0,
      history: [],
      activeScreen: "s0",
    }),
  resetPriorities: () => set({ priorities: { cost: null, speed: null, quality: null } }),
}));


