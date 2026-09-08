import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingState {
  hasSeenModal: boolean;
  hasHydrated: boolean;
  dismissModal: () => void;
  reopenModal: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasSeenModal: false,
      hasHydrated: false,
      dismissModal: () => set({ hasSeenModal: true }),
      reopenModal: () => set({ hasSeenModal: false }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "kalslo-onboarding",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);