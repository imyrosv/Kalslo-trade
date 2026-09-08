import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OnboardingStep = "state" | "corridors" | "tradeStates" | "signals";

interface OnboardingState {
  completed: Record<OnboardingStep, boolean>;
  hasSeenModal: boolean;
  markVisited: (step: OnboardingStep) => void;
  dismissModal: () => void;
  reopenModal: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      completed: {
        state: false,
        corridors: false,
        tradeStates: false,
        signals: false,
      },
      hasSeenModal: false,
      markVisited: (step) =>
        set((s) => ({ completed: { ...s.completed, [step]: true } })),
      dismissModal: () => set({ hasSeenModal: true }),
      reopenModal: () => set({ hasSeenModal: false }),
    }),
    { name: "kalslo-onboarding" }
  )
);