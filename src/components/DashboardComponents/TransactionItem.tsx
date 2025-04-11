import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";
import { FiCreditCard, FiDollarSign, FiRepeat } from "react-icons/fi";
import { IconType } from "react-icons";

type TransactionType = "Transferencia" | "Tarjeta de crédito" | "Ventas";
export type TransactionItemProps = {
  type: TransactionType;
  method: string;
  amount: string;
  date: string;
};

const iconMap: Record<TransactionType, IconType> = {
  Transferencia: FiRepeat,
  "Tarjeta de crédito": FiCreditCard,
  Ventas: FiDollarSign,
};

export const TransactionItem = ({ type, method, amount, date }: TransactionItemProps) => {
  const IconComponent = iconMap[type];

  return (
    <HStack
      justify="space-between"
      p={4}
      borderRadius="2xl"
      w="full"
      bg="white"
      boxShadow="sm"
      _hover={{ boxShadow: "md", cursor: "pointer" }}
    >
      <HStack gap={3}>
        <Icon as={IconComponent} boxSize={5} />
        <VStack align="start" gap={0}>
          <Text fontWeight="semibold">{type}</Text>
          <Text fontSize="sm" color="gray.500">
            {method}
          </Text>
        </VStack>
      </HStack>

      <HStack gap={3}>
        <VStack align="end" gap={0}>
          <Text fontWeight="semibold" color="green.500">
            +${amount}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {date}
          </Text>
        </VStack>
        <Icon as={FiChevronRight} boxSize={5} color="gray.400" />
      </HStack>
    </HStack>
  );
};
