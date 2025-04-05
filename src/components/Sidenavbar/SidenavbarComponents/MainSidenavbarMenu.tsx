import { Box, HStack, IconButton, Image, Separator, SystemStyleObject, Text, VStack } from "@chakra-ui/react"
import { MdBarChart, MdClose, MdHistory, MdHomeFilled, MdInventory, MdPointOfSale } from "react-icons/md"
import Logo from '@/assets/logo.svg';
import { NavLink } from "react-router-dom";

type MainSidenavbarMenu = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainSidenavbarMenu = ({ isOpen, setIsOpen }: MainSidenavbarMenu) => {

    const sidenavabarStyles: SystemStyleObject = {
        "& > a": { w: "full", p: 2, display: "flex", alignItems: "center", gap: 3, fontWeight: "bold", fontSize: "14px", borderRadius: "md" },
        "& > a:hover": {
            bg: { base: "#57a182", _dark: "sidenavbar.light" },
            color: { base: "sidenavbar.light", _dark: "sidenavbar.dark" },
        },
    }

    return (
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
                <IconButton variant={"plain"} onClick={() => setIsOpen(false)} display={{ base: "block", md: "none" }}>
                    <MdClose />
                </IconButton>
            </HStack>
            <Separator my={"10px"} />
            <Box>
                <VStack gap={4} alignItems={"start"} w={"full"} css={sidenavabarStyles}>
                    <NavLink to={"/"}>
                        <MdHomeFilled />
                        Inicio
                    </NavLink>
                    <NavLink to={"/inventario"}>
                        <MdInventory />
                        Inventario
                    </NavLink>
                    <NavLink to={"/ventas"}>
                        <MdPointOfSale />
                        Ventas
                    </NavLink>
                    <NavLink to={"/estadisticas"}>
                        <MdBarChart />
                        Estadísticas
                    </NavLink>
                    <NavLink to={"/historial"}>
                        <MdHistory />
                        Historial
                    </NavLink>
                </VStack>
            </Box>
        </Box>
    )
}

export default MainSidenavbarMenu