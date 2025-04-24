import { VStack, Box, Spinner, Text, Center } from "@chakra-ui/react";
import { TransactionItem } from "@/components/DashboardComponents/TransactionItem";
import type { TransactionItemProps } from "@/components/DashboardComponents/TransactionItem";
import { useOrders } from "@/hooks/useOrders";


const mapPaymentTypeToTransactionType = (paymentName: string): TransactionItemProps['type'] => {
  switch (paymentName.toUpperCase()) {
    case 'CARD':
      return 'Tarjeta de crédito';
    case 'CASH':
      return 'Efectivo';
    default:
      return 'Transferencia';
  }
};

export default function TransactionsList() {
  const { data: orders, isLoading, error } = useOrders();

  if (isLoading) {
    return (
      <Box bg="white" p={{ base: 3 }} borderRadius="xl" boxShadow="sm">
        <VStack gap={2} p={4} justify="center" align="center">
          <Spinner color="green.500" />
          <Text>Loading orders...</Text>
        </VStack>
      </Box>
    );
  }

  if (error) {
    return (
      <Box bg="white" p={{ base: 3 }} borderRadius="xl" boxShadow="sm">
        <VStack gap={2} p={4}>
          <Text color="red.500">Error loading orders</Text>
        </VStack>
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Box bg="white" p={6} borderRadius="2xl" boxShadow="sm" width="100%">
        <Center>
          <Text color="gray.500">Todavía no hay órdenes</Text>
        </Center>
      </Box>
    );
  }

  return (
    <Box bg="white" p={{ base: 3 }} borderRadius="xl" boxShadow="sm">
      <VStack gap={2} p={4}>
        {Array.isArray(orders) && orders.map((order) => (
          <TransactionItem
            key={order.id}
            type={mapPaymentTypeToTransactionType(order.payment?.name ?? 'CARD')}
            method="Ventas"
            amount={order.totalAmount}
            date={new Date().toLocaleDateString('es-AR', {
              day: '2-digit',
              month: '2-digit'
            })}
          />
        ))}
      </VStack>
    </Box>
  );
}