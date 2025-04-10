import { Box, HStack, IconButton, Image, Separator, SystemStyleObject, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import { MdBarChart, MdHomeFilled, MdInventory, MdPointOfSale } from 'react-icons/md';
import Logo from '@/assets/logo.svg';
import { NavLink } from 'react-router-dom';
import useSidenavbarStore from '@/store/useSidenavbarStore';
import { useEffect } from 'react';

const MainSidenavbarMenu = () => {

    const { isOpen, setIsOpen } = useSidenavbarStore()
    const isMobile = useBreakpointValue({ base: true, md: false })

    const sidenavabarStyles: SystemStyleObject = {
        "& > a, & > button": { 
            w: "full",
            px: "16px", py: "14px",
            display: "flex",
            alignItems: "center",
            gap: 3,
            fontWeight: "bold",
            fontSize: "14px",
            borderRadius: "16px" 
        },
        "& > a.active": { bg: "blue.500", color: "white" },
        "& > a:hover": { bg: "amarillo" },
    }

    const closeSidenavbar = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        console.log("Cambio: ", isMobile)
        if(!isMobile) setIsOpen(false);
    }, [isMobile])

    return (
        <Box
            h={{ base: "100vh", md: "auto" }}
            p={{ base: "20px", md: "0" }}
            bg={{ base: "sidenavbar.light", _dark: "sidenavbar.dark" }}
            position={{ base: "absolute", md: "relative" }}
            transform={isMobile && !isOpen ? 'translateX(-100%)' : 'translateX(0)'}
            transition={ "transform 0.3s ease-in-out" }
            shadow={{ base: "lg", md: "none" }}
            top={0} left={0}>
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
            <Box>
                <VStack gap={"24px"} alignItems={"start"} w={"full"} css={sidenavabarStyles}>
                    <NavLink to={"/"} onClick={closeSidenavbar} className={ ({ isActive }) => isActive ? "active" : "pending" }>
                        <MdHomeFilled />
                        Inicio
                    </NavLink>
                    <NavLink to={"/inventory"} onClick={closeSidenavbar}>
                        <MdInventory />
                        Inventario
                    </NavLink>
                    <NavLink to={"/ventas"} onClick={closeSidenavbar}>
                        <MdPointOfSale />
                        Ventas
                    </NavLink>
                    <NavLink to={"/estadisticas"} onClick={closeSidenavbar}>
                        <MdBarChart />
                        Estadísticas
                    </NavLink>
                    {/* <NavLink to={"/historial"} onClick={closeSidenavbar}>
                        <MdHistory />
                        Historial
                    </NavLink> */}
                    <IconButton variant={"solid"} colorPalette={"red"} textAlign={"left"} onClick={() => setIsOpen(false)} display={{ base: "inline-flex", md: "none!" }}>
                        {/* <MdClose /> */}
                        Cerrar menú
                    </IconButton>
                </VStack>
            </Box>
        </Box>
    )
}

export default MainSidenavbarMenu