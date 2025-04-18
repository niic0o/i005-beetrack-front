import { FaArrowLeft } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

import {
  Box,
  Button,
  Text,
  Image,
  HStack,
  VStack,
  Badge,
  Icon,
  Flex,
  Heading,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";

// import { ChevronRightIcon } from "@chakra-ui/icons";

const mockNotifications = [
  {
    id: 1,
    name: "Pepsi 2 lts.",
    price: "$5.200 c/u",
    quantity: 0,
    image: "",
  },
  {
    id: 2,
    name: "Manteca 70g",
    price: "$2.100 c/u",
    quantity: 5,
    image: "",
  },
  // Add more items...
];

const Notifications = () => {
  // Use breakpoint to determine if we're on mobile
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      direction="column"
      h="100%"
      position="relative"
      pb={{ base: "80px", md: 0 }}
    >
      <Heading>Faltante de stock</Heading>
      <Box
        bg="white"
        rounded="xl"
        p={4}
        shadow="md"
        maxW={{ base: "100%", md: "750px" }}
        mb={4}
      >
        {mockNotifications.length === 0 ? (
          <Text textAlign="center" color="gray.500">
            No hay notificaciones
          </Text>
        ) : (
          mockNotifications.map((item) => (
            <Flex
              key={item.id}
              align="center"
              justify="space-between"
              py={2}
              borderBottom="1px solid"
              borderColor="gray.100"
              _last={{ borderBottom: "none" }}
            >
              <HStack gap={3}>
                <Image
                  boxSize="40px"
                  src={item.image}
                  alt={item.name}
                  objectFit="contain"
                />
                <VStack align="start" gap={0}>
                  <Text fontWeight="semibold">{item.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {item.price}
                  </Text>
                </VStack>
              </HStack>

              <HStack gap={2}>
                <Badge
                  colorScheme="red"
                  variant="subtle"
                  px={2}
                  py={1}
                  borderRadius="md"
                >
                  <HStack gap={1}>
                    <Box w="8px" h="8px" bg="red.400" borderRadius="full" />
                    <Text fontSize="xs">{item.quantity} Unidades</Text>
                  </HStack>
                </Badge>
                <Icon as={IoIosArrowForward} boxSize={5} color="gray.600" />
              </HStack>
            </Flex>
          ))
        )}
      </Box>

      {/* Mobile-only button fixed to the bottom */}
      {isMobile && (
        <Link
          href="/inventory"
          w="full"
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          p={4}
          borderTopColor="gray.200"
          zIndex={10}
        >
          <Button
            variant="solid"
            w="full"
            bg="#ffd701"
            color="gray.900"
            fontWeight="bold"
            borderRadius="xl"
            py={6}
          >
            Ir a todo el inventario
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default Notifications;
