import { ReactNode } from "react";
import Topbar from "@/components/DashboardComponents/Topbar";
import Sidebar from "../Sidebar";
import { Grid, GridItem } from "@chakra-ui/react";

type PrivateLayoutProps = {
  children: ReactNode;
};

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  return (
    <Grid templateColumns={"repeat(6, 1fr)"} bg={"gray.50"} minH={{ lg: "100vh" }}>
      <GridItem
        as={"aside"}
        colSpan={1}
        bg={"#f2f0eb"}
        minH={{ xl: "100vh" }}
        p={{ base: "20px", lg: "30px" }}>
        <Sidebar />
      </GridItem>
      <GridItem as={"main"} colSpan={5} p={"0"}>
        <Topbar />
        {children}
      </GridItem>
    </Grid>
  );
};

export default PrivateLayout;