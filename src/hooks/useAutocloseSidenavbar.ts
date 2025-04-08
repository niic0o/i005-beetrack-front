import useSidenavbarStore from "@/store/useSidenavbarStore";
import { useEffect } from "react";

const useAutocloseSidenavbar = (isMobile: boolean) => {
    const { setIsOpen } = useSidenavbarStore();

    useEffect(() => {
        console.log("Cambio: ", isMobile)
        if(!isMobile) setIsOpen(false);
    }, [isMobile]);
}

export default useAutocloseSidenavbar;