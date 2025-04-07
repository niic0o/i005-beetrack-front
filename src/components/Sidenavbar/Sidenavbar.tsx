import { Flex } from "@chakra-ui/react";
import MobileTopBar from "./SidenavbarComponents/MobileTopBar";
import MainSidenavbarMenu from "./SidenavbarComponents/MainSidenavbarMenu";

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