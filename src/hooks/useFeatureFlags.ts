import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FeatureFlag = 'ENTERPRISE';

interface FeatureFlagsStore {
  flags: Record<FeatureFlag, boolean>;
  isEnabled: (flag: FeatureFlag) => boolean;
  setFlag: (flag: FeatureFlag, enabled: boolean) => void;
}

export const useFeatureFlags = create<FeatureFlagsStore>()(
  persist(
    (set, get) => ({
      flags: {
        ENTERPRISE: false,
      },
      isEnabled: (flag: FeatureFlag) => !!get().flags[flag],
      setFlag: (flag: FeatureFlag, enabled: boolean) =>
        set((state) => ({
          flags: {
            ...state.flags,
            [flag]: enabled,
          },
        })),
    }),
    {
      name: 'feature-flags',
    },
  ),
);
