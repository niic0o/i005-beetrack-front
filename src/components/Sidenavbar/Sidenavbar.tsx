import { Flex, useBreakpointValue } from "@chakra-ui/react";
import MobileTopBar from "./SidenavbarComponents/MobileTopBar";
import MainSidenavbarMenu from "./SidenavbarComponents/MainSidenavbarMenu";
import { useRef } from "react";
import useSidenavbarStore from "@/store/useSidenavbarStore";

const Sidenavbar = () => {
	return (
		<Flex
			direction={"column"}
			position={{ md: "sticky" }}
			top={{ md: "30px" }}>
			<MobileTopBar />
			<MainSidenavbarMenu />
		</Flex >
	)
}
export default Sidenavbar;