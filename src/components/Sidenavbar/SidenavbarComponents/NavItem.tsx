import useSidenavbarStore from "@/store/useSidenavbarStore";
import { ReactNode } from "react";
import { IconType } from "react-icons/lib";
import { NavLink } from "react-router-dom";

type NavItemProps = {
    to: string;
    children: ReactNode;
    icon?: IconType;
}

const NavItem = ({ to, children, icon }: NavItemProps) => {
    
    const { setIsOpen } = useSidenavbarStore();
    
    return (
        <NavLink
            to={to}
            onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "active" : "pending"}>
                { children }
        </NavLink>
    )
}

export default NavItem;