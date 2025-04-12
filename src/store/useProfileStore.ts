import { Profile } from '@/services/profileService';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ProfileState {
    profile: Profile;
    fetchProfile: (profile: Profile) => Promise<void>;
    editProfile: (profile: Profile) => Promise<void>;
}

const useProfileStore = create<ProfileState>()(
    devtools(
        (set) => ({
            profile: null,
            fetchProfile: (profile: Profile) => set({ profile }),
            editProfile: (profile: Profile) => set({ profile })
        })
    )
)

export default useProfileStore;