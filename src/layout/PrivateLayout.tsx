import { ReactNode } from "react";
import Topbar from "@/components/DashboardComponents/Topbar";
import Sidenavbar from "@/components/Sidenavbar/Sidenavbar";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import useSidenavbarStore from "@/store/useSidenavbarStore";
// import { ColorModeButton } from "@/components/ui/color-mode";

type PrivateLayoutProps = {
  children?: ReactNode;
  showTopbar?: boolean;
  showSidebar?: boolean;
  contentPadding?: string | object;
};

const PrivateLayout = ({
  children,
  showTopbar = true,
  showSidebar = true,
  contentPadding = "0"
}: PrivateLayoutProps) => {

  const { isOpen } = useSidenavbarStore();

  return (
    <>
      {/* El botón del modo es para visualizar light/dark y es una demo */}
      {/* <ColorModeButton pos={"fixed"} bottom={"10px"} left={"10px"} zIndex={1000} border={"md"} borderColor={{ base: "black", _dark: "white" }} /> */}

      <Grid templateColumns={"repeat(6, 1fr)"} bg={"gray.50"} minH={"100vh"}>
        {showSidebar && (
          <GridItem
            as={"aside"}
            colSpan={{ base: 6, md: 1 }}
            position={{ base: "fixed", md: "initial" }}
            w={{ base: "100%" }}
            h={{ base: "fit", md: "auto" }}
            p={{ base: "20px", lg: "30px" }}
            bg={{ base: "sidenavbar.light", _dark: "sidenavbar.dark" }}
            shadow={{ base: "2px 0px 4px rgba(0, 0, 0, 0.1)", _dark: "2px 0px 4px rgba(255, 255, 255, 0.1)" }}
            zIndex={100}>
            <Sidenavbar />
          </GridItem>
        )}
        <GridItem
          as={"main"}
          colSpan={{ base: 6, md: 5 }}
          mt={{ base: "100px", md: 0 }} // De momento para que en el modo móvil el topbar siga viéndose
          p={contentPadding}
          bg={{ base: "content.light", _dark: "content.dark" }}
        >
          {showTopbar && <Topbar />}
          {children || <Outlet />}
        </GridItem>
      </Grid>
      <Box id="overlay"
        display={isOpen ? "block" : "none"}
        position={"absolute"}
        top={0}
        right={0}
        bottom={0}
        left={0}
        bg={"rgba(0, 0, 0, 0.5)"}
        backdropFilter={"blur(10px)"}
        zIndex={"1"} />
    </>
  );
};

export default PrivateLayout;