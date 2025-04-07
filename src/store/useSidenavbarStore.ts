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
            setIsOpen: (status) => {

                set({ isOpen: status })

                status
                    ? document.body.style.overflow = "hidden"
                    : document.body.style.overflow = "auto";
            },
        }),
{ name: "SidenavbarStore" }
    )
)

export default useSidenavbarStore;