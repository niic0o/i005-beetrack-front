import { Box, Button, Flex, HStack, Image, List, Separator, Text } from "@chakra-ui/react";
import Logo from '@/assets/logo.svg';
import { MdBarChart, MdClose, MdHistory, MdHomeFilled, MdInventory, MdMenu, MdPointOfSale } from "react-icons/md";
import { useState } from "react";

const Sidenavbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Flex direction={"column"}>
			<HStack display={{ base: "flex", md: "none" }} gap={4}>
				<Button onClick={() => setIsOpen(true)}>
					<MdMenu />
				</Button>
				<Image
					src={Logo} alt="Logo Beetrack" maxWidth={"30px"} />
				<Text as={"p"} fontWeight={"bold"}>BEETRACK</Text>
			</HStack>
			<Box
				display={{ base: isOpen ? "block" : "none", md: "block" }}
				h={{ base: "100vh", md: "auto" }}
				p={{ base: "20px", md: "0" }}
				bg={{ base: "sidenavbar.light", _dark: "sidenavbar.dark" }}
				position={{ base: "absolute", md: "relative" }}
				shadow={{ base: "lg", md: "none" }}
				top={0} left={0}>
				<HStack gap={4}>
					<Image
						src={Logo} alt="Logo Beetrack" maxWidth={"50px"} />
					<Box>
						<Text as={"p"} fontWeight={"bold"}>BEETRACK</Text>
						<Text as={"p"} fontSize={"2xs"}>SALES & MINORY MANAGER</Text>
					</Box>
					<Button onClick={() => setIsOpen(false)} display={{ base: "block", md: "none" }}>
						<MdClose />
					</Button>
				</HStack>
				<Separator my={"10px"} />
				<List.Root listStyle={"none"} gap={4} alignItems={"start"} w={"full"}>
					<List.Item>
						<List.Indicator>
							<MdHomeFilled />
						</List.Indicator>
						Inicio
					</List.Item>
					<List.Item>
						<List.Indicator>
							<MdInventory />
						</List.Indicator>
						Inventario
					</List.Item>
					<List.Item>
						<List.Indicator>
							<MdPointOfSale />
						</List.Indicator>
						Ventas
					</List.Item>
					<List.Item>
						<List.Indicator>
							<MdBarChart />
						</List.Indicator>
						Estadísticas
					</List.Item>
					<List.Item>
						<List.Indicator>
							<MdHistory />
						</List.Indicator>
						Historial
					</List.Item>
				</List.Root>
			</Box>
		</Flex>
	)
}
export default Sidenavbar;