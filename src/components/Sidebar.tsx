import { Box, Flex, HStack, Image, List, Separator, Text } from "@chakra-ui/react";
import Logo from '@/assets/logo.svg';
import { LuChartNoAxesColumn, LuCircleDollarSign, LuHistory, LuHouse, LuStore } from 'react-icons/lu';

const Sidebar = () => {
	return (
		<Flex direction={"column"} alignItems={"center"}>
			<HStack color={"blue.500"} gap={4}>
				<Image
					src={Logo} alt="Logo Beetrack" maxWidth={"50px"} />
				<Box>
					<Text as={"p"} fontWeight={"bold"}>BEETRACK</Text>
					<Text as={"p"} fontSize={"2xs"}>SALES & MINORY MANAGER</Text>
				</Box>
			</HStack>
			<Separator my={"10px"} />
			<List.Root listStyle={"none"} gap={4} alignItems={"start"} w={"full"}>
				<List.Item>
					<List.Indicator>
						<LuHouse />
					</List.Indicator>
					Dashboard
				</List.Item>
				<List.Item>
					<List.Indicator>
						<LuStore />
					</List.Indicator>
					Inventario
				</List.Item>
				<List.Item>
					<List.Indicator>
						<LuCircleDollarSign />
					</List.Indicator>
					Ventas
				</List.Item>
				<List.Item>
					<List.Indicator>
						<LuChartNoAxesColumn />
					</List.Indicator>
					Estadísticas
				</List.Item>
				<List.Item>
					<List.Indicator>
						<LuHistory />
					</List.Indicator>
					Historial
				</List.Item>
			</List.Root>
		</Flex>
	)
}

export default Sidebar;