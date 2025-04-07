import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SidenavbarState {
    isOpen: boolean;
    setIsOpen: (status: boolean) => void;
}

const useSidenavbarStore = create<SidenavbarState>()(
    devtools(
        (set) => ({
            isOpen: false,
            setIsOpen: (status) => set({ isOpen: status })
        }),
        { name: "SidenavbarStore" }
    )
)

export default useSidenavbarStore;