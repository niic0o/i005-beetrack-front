import { Grid, GridItem} from '@chakra-ui/react'
import './App.css'
import Sidebar from '@/components/Sidebar'
// import PrivateRoutes from "./utils/PrivateRoutes"
import { Outlet } from 'react-router-dom'

function App() {
  // para utilizar el privateRoute solo tienes que ponerlo como element del route ej:
  // <Route element={<PrivateRoutes />}>
  //   <Route path="/" element={<Home />} />
  // </Route>

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
      <GridItem as={"main"} colSpan={5} p={"40px"}>
        {/* <Navbar /> */}
        <Outlet />
      </GridItem>
    </Grid>
  )
}

export default App
