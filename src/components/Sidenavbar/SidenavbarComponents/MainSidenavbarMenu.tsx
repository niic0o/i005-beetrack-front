import { Box, Button, Flex, HStack, IconButton, Image, Separator, SystemStyleObject, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import { MdBarChart, MdHistory, MdHomeFilled, MdInventory, MdOutlinePersonPin, MdOutlineVerifiedUser, MdPointOfSale } from 'react-icons/md';
import Logo from '@/assets/logo.svg';
import useSidenavbarStore from '@/store/useSidenavbarStore';
import useAutocloseSidenavbar from '@/hooks/useAutocloseSidenavbar';
import NavItem from './NavItem';

const MainSidenavbarMenu = () => {

    const { isOpen, setIsOpen } = useSidenavbarStore()
    const isMobile = useBreakpointValue({ base: true, md: false })
    useAutocloseSidenavbar(isMobile ? isMobile : false);

    const sidenavabarStyles: SystemStyleObject = {
        "& a, & button": {
            w: "full",
            px: "16px", py: "14px",
            display: "flex",
            alignItems: "center",
            gap: 3,
            fontWeight: "bold",
            fontSize: "14px",
            borderRadius: "16px"
        },
        "& a.active": { bg: "yellow.amarillo" },
        "& a:hover": { bg: "yellow.400" },
    }

    return (
        <Box
            h={{ base: "100vh", md: "auto" }}
            p={{ base: "20px", md: "0" }}
            bg={{ base: "sidenavbar.light", _dark: "sidenavbar.dark" }}
            position={{ base: "absolute", md: "relative" }}
            transform={isMobile && !isOpen ? 'translateX(-100%)' : 'translateX(0)'}
            transition={"transform 0.3s ease-in-out"}
            shadow={{ base: "lg", md: "none" }}
            top={0} left={0}
            css={sidenavabarStyles}>
            <HStack gap={4}>
                <Image
                    src={Logo} alt="Logo Beetrack" maxWidth={"50px"} />
                <Box>
                    <Text as={"p"} fontWeight={"bold"}>BEETRACK</Text>
                    <Text as={"p"} fontSize={"2xs"}>SALES & MINORY MANAGER</Text>
                </Box>
                {/* <IconButton variant={"ghost"} onClick={() => setIsOpen(false)} display={{ base: "inline-flex", md: "none" }} position={{ base: "absolute", xs: "relative" }} bottom={{ base: "30px", xs: "auto" }} left={{ base: "20px", xs: "auto" }}>
                    <MdClose />
                </IconButton> */}
            </HStack>
            <Separator my={"10px"} />
            <Flex direction={"column"} justifyContent={"space-between"} h={"100vh"}>
                <VStack gap={"24px"} alignItems={"start"} w={"full"}>
                    <NavItem to="/">
                        <MdHomeFilled />
                        Inicio
                    </NavItem>
                    <NavItem to={"/inventory"}>
                        <MdInventory />
                        Inventario
                    </NavItem>
                    <NavItem to={"/ventas"}>
                        <MdPointOfSale />
                        Ventas
                    </NavItem>
                    <NavItem to={"/estadisticas"}>
                        <MdBarChart />
                        Estadísticas
                    </NavItem>
                    <Button variant={"solid"} colorPalette={"red"} textAlign={"left"} onClick={() => setIsOpen(false)} display={{ base: "inline-flex", md: "none!" }}>
                        {/* <MdClose /> */}
                        Cerrar menú
                    </Button>
                </VStack>
                <NavItem to={"/perfil"}>
                    <MdOutlinePersonPin />
                    Perfil
                </NavItem>
            </Flex>
        </Box>
    )
}

export default MainSidenavbarMenu