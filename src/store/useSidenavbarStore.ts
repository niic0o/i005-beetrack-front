import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SidenavbarState {
    isOpen: boolean;
    itemSelected: string;
    setIsOpen: (status: boolean) => void;
}

const useSidenavbarStore = create<SidenavbarState>()(
    devtools(
        (set) => ({
            isOpen: false,
            itemSelected: "home",
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