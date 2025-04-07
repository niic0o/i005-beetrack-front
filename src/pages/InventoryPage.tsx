import { Box, Heading, Text } from '@chakra-ui/react';

const InventoryPage = () => {
  return (
    <Box p={4}>
      <Heading mb={4}>Inventory Test Page</Heading>
      <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
        <Text mb={4} color={"black"} textAlign={"center"}>Esto es un inventario</Text>
      </Box>
    </Box>
  );
};

export default InventoryPage;