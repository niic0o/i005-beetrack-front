import {
  SimpleGrid,
  GridItem,
  useBreakpointValue,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode"
import { Card } from "@/components/DashboardComponents/Card";
import { FaMoneyBills } from "react-icons/fa6";
import { IoWallet } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { FaCashRegister } from "react-icons/fa";
import { InventoryList } from "@/components/DashboardComponents/InventoryList";
import FinanceGraph from "@/components/DashboardComponents/FinanceGraph";
import SalesTable from "@/components/DashboardComponents/SalesTable";

export const DashboardContent = () => {
  const colSpan = useBreakpointValue({ base: 12, md: 6, lg: 3 });
  const { toggleColorMode } = useColorMode();
  const color = useColorModeValue("blue.400", "white")

  const cards = [
    {
      label: "Efectivo",
      amount: "$60.000,45",
      icon: <FaMoneyBills size={20} color="white"/>,
    },
    {
      label: "Billetera digital",
      amount: "$60.000,45",
      icon: <IoWallet size={20} color="white"/>,
    },
    {
      label: "Otros Medios",
      amount: "$60.000,45",
      icon: <MdPayment size={20} color="white"/>,
    },
    {
      label: "Saldo Total",
      amount: "53.382,01",
      icon: <FaCashRegister size={20} color="white"/>,
    },
  ];

  return (
    <Flex direction="column" overflow="hidden" margin="0" padding="0">
      <Box p={6}  >
        <SimpleGrid columns={12} gap={6}>
          {cards.map((card, i) => (
            <GridItem key={i} colSpan={colSpan}>
              <Card label={card.label} amount={card.amount} icon={card.icon} />
            </GridItem>
          ))}

          <GridItem colSpan={{ base: 12, lg: 6 }}>
            <Text fontWeight="bold" fontSize="lg" mb={4} color={color}>
              Stock del inventario
            </Text>
            <Box bg="white" p={4} borderRadius="3xl" boxShadow="md" h="100%">
              <InventoryList />
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 12, lg: 6 }}>
            <Text fontWeight="bold" fontSize="lg" mb={4} color={color}>
              Estadísticas
            </Text>
            <Box bg="white" p={4} borderRadius="3xl" boxShadow="md" h="100%">
              <FinanceGraph />
            </Box>
          </GridItem>

          <GridItem colSpan={12}>
            <Text fontWeight="bold" fontSize="lg" mt={12} mb={4} color={color}>
              Pedidos de compra
            </Text>
            <Box bg="white" p={4} borderRadius="3xl" boxShadow="md">
              <Box fontWeight="bold" color="blue.400" mb={4}>
                <SalesTable />
              </Box>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Flex>
  );
};
