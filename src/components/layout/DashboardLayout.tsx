import {
  SimpleGrid,
  GridItem,
  useBreakpointValue,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Card } from "@/components/DashboardComponents/Card";
import { FaMoneyBills } from "react-icons/fa6";
import { IoWallet } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { FaCashRegister } from "react-icons/fa";
import Topbar from "@/components/DashboardComponents/Topbar";
import { InventoryList } from "../DashboardComponents/InventoryList";

export const DashboardContent = () => {
  const colSpan = useBreakpointValue({ base: 12, md: 6, lg: 3 });

  const cards = [
    {
      label: "Efectivo",
      amount: "$60.000,45",
      icon: <FaMoneyBills size={20} />,
    },
    {
      label: "Billetera digital",
      amount: "$60.000,45",
      icon: <IoWallet size={20} />,
    },
    {
      label: "Otros Medios",
      amount: "$60.000,45",
      icon: <MdPayment size={20} />,
    },
    {
      label: "Saldo Total",
      amount: "53.382,01",
      icon: <FaCashRegister size={20} />,
    },
  ];

  return (
    <Flex direction="column" overflow="hidden" margin="0" padding="0">
      <Box
        position="sticky"
        top="0"
        zIndex="10"
        left="0"
        right="0"
        margin="0"
        padding="0"
        width="100%"
      >
        <Topbar />
      </Box>
      <Box p={6} bg={"background.25"}>
        <SimpleGrid columns={12} gap={6}>
          {cards.map((card, i) => (
            <GridItem key={i} colSpan={colSpan}>
              <Card label={card.label} amount={card.amount} icon={card.icon} />
            </GridItem>
          ))}

          <GridItem colSpan={{ base: 12, lg: 6 }}>
            <Text fontWeight="bold" fontSize="lg" mb={4} color="blue.500">
              Stock del inventario
            </Text>
            <Box bg="white" p={4} borderRadius="3xl" boxShadow="soft" h="100%">
              <InventoryList />
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 12, lg: 6 }}>
          <Text fontWeight="bold" fontSize="lg" mb={4} color="blue.500">
              Estadísticas
            </Text>
            <Box bg="white" p={4} borderRadius="3xl" boxShadow="soft" h="100%">
              <Text fontWeight="bold" color="blue.400" mb={4}>
                {/* Component */}
              </Text>
            </Box>
          </GridItem>

          <GridItem colSpan={12}>
          <Text fontWeight="bold" fontSize="lg" mb={4} color="blue.500">
              Pedidos de compra
            </Text>
            <Box bg="white" p={4} borderRadius="3xl" boxShadow="soft">
              <Text fontWeight="bold" color="blue.400" mb={4}>
                {/* Component */}
              </Text>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Flex>
  );
};
