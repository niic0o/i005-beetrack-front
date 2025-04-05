import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import MobileTopBar from "./SidenavbarComponents/MobileTopBar";
import MainSidenavbarMenu from "./SidenavbarComponents/MainSidenavbarMenu";

const Sidenavbar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<Flex direction={"column"} position={{ md: "sticky" }} top={{ md: "30px" }}>
			<MobileTopBar setIsOpen={setIsOpen} />
			<MainSidenavbarMenu isOpen={isOpen} setIsOpen={setIsOpen} />
		</Flex >
	)
}
export default Sidenavbar;