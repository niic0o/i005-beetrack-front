import { ReactNode } from "react";
import Topbar from "@/components/DashboardComponents/Topbar";
import Sidebar from "@/components/Sidebar";
import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

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
  return (
    <Grid templateColumns={"repeat(6, 1fr)"} bg={"gray.50"} minH={{ lg: "100vh" }}>
      {showSidebar && (
        <GridItem
          as={"aside"}
          colSpan={1}
          bg={"#f2f0eb"}
          minH={{ xl: "100vh" }}
          p={{ base: "20px", lg: "30px" }}>
          <Sidebar />
        </GridItem>
      )}
      <GridItem 
        as={"main"} 
        colSpan={showSidebar ? 5 : 6} 
        p={contentPadding}
      >
        {showTopbar && <Topbar />}
        {children || <Outlet />}
      </GridItem>
    </Grid>
  );
};

export default PrivateLayout;