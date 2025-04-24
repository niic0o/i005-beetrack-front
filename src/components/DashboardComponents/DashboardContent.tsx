import {
  SimpleGrid,
  GridItem,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import QuickAccess from "@/components/DashboardComponents/QuickAccess";
import BalanceCard from "@/components/DashboardComponents/BalanceCard";
import IncomeCard from "@/components/DashboardComponents/IncomeCard";
import ProductList from "@/components/DashboardComponents/ProductList";
import TransactionsList from "@/components/DashboardComponents/TransactionsList";
import { useTopBestSellings } from "@/hooks/useReport";

export const DashboardContent = () => {
  useTopBestSellings();  
  // console.log(topBestSellingsReport);

  const color = useColorModeValue("blue.400", "white");
  return (
    <Flex direction="column" overflow="hidden" margin="0" padding="0">
      <Box p={6}>
        <SimpleGrid columns={12} gap={6}>
          <GridItem colSpan={12}>
            <QuickAccess />
          </GridItem>
          <GridItem colSpan={{ base: 12, lg: 6 }}>
            <Text fontWeight="bold" fontSize="lg" mt={2} color={color} mb={2}>
              Saldo total en caja
            </Text>
            <BalanceCard />
          </GridItem>
          <GridItem colSpan={{ base: 12, lg: 6 }}>
            <Flex justify="space-between" align="center" mt={2} mb={2}>
              <Text fontWeight="bold" fontSize="lg" color={color}>
                Resumen de hoy
              </Text>
            </Flex>
            <IncomeCard />
          </GridItem>

          <GridItem colSpan={{ base: 12, lg: 6 }}>
            <Text fontWeight="bold" fontSize="lg" mt={2} mb={2} color={color}>
              Productos más vendidos este mes
            </Text>
            <ProductList />
          </GridItem>
          <GridItem colSpan={{ base: 12, lg: 6 }}>
            <Flex justify="space-between" align="center" mt={2} mb={2}>
              <Text fontWeight="bold" fontSize="lg" color={color}>
                Historial reciente
              </Text>
              {/* <Text fontSize="sm" color="gray.500" cursor="pointer" fontWeight={"bold"} mr={1}>
                Ver más &gt;
              </Text> */}
            </Flex>
            <TransactionsList />
          </GridItem>
        </SimpleGrid>
      </Box>
    </Flex>
  );
};