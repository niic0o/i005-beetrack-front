import { Grid, GridItem, Heading } from '@chakra-ui/react'
import './App.css'
import Sidebar from '@/components/Sidebar'
import { Outlet } from 'react-router-dom'
import DashboardPage from '@/pages/DashboardPage'

function App() {
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
      <GridItem as={"main"} colSpan={5}>
        {/* <Navbar /> */}
        {/* <Outlet /> */}
        <DashboardPage />
      </GridItem>
    </Grid>
  )
}

export default App
