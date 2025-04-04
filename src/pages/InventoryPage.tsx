import {
  Box,
  Heading,
  Text,
  Badge,
  IconButton,
  Image,
  SimpleGrid,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { FiSearch, FiPlus } from "react-icons/fi";

const products = [
  {
    name: "Manteca 200 G",
    price: "$2.000 c/u",
    stock: 5,
    image: "/product-placeholder.webp",
  },
  {
    name: "Lavandina 1 L",
    price: "$1.750 c/u",
    stock: 10,
    image: "/product-placeholder.webp",
  },
  {
    name: "Azúcar 1 Kg",
    price: "$1.750 c/u",
    stock: 20,
    image: "/product-placeholder.webp",
  },
  {
    name: "Manteca 200 G",
    price: "$2.000 c/u",
    stock: 5,
    image: "/product-placeholder.webp",
  },
  {
    name: "Lavandina 1 L",
    price: "$1.750 c/u",
    stock: 10,
    image: "/product-placeholder.webp",
  },
  {
    name: "Azúcar 1 Kg",
    price: "$1.750 c/u",
    stock: 20,
    image: "/product-placeholder.webp",
  },
  {
    name: "Manteca 200 G",
    price: "$2.000 c/u",
    stock: 5,
    image: "/product-placeholder.webp",
  },
  {
    name: "Lavandina 1 L",
    price: "$1.750 c/u",
    stock: 10,
    image: "/product-placeholder.webp",
  },
  {
    name: "Azúcar 1 Kg",
    price: "$1.750 c/u",
    stock: 20,
    image: "/product-placeholder.webp",
  },
  {
    name: "Manteca 200 G",
    price: "$2.000 c/u",
    stock: 5,
    image: "/product-placeholder.webp",
  },
  {
    name: "Lavandina 1 L",
    price: "$1.750 c/u",
    stock: 10,
    image: "/product-placeholder.webp",
  },
  {
    name: "Azúcar 1 Kg",
    price: "$1.750 c/u",
    stock: 20,
    image: "/product-placeholder.webp",
  },
];

const InventoryPage = () => {
  return (
    <Box p={6}>
      <Heading size="md" mb={4}>
        Inventario
      </Heading>

      <InputGroup mb={6} maxW="300px" startElement={<FiSearch />}>
        <Input
          type="text"
          placeholder="Buscar"
          borderRadius="full"
          bg="gray.50"
        />
      </InputGroup>

      <SimpleGrid columns={[2, 2, 4, 6]} gap={4}>
        {products.map((product, idx) => (
          <Box
            key={idx}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            position="relative"
            bg="white"
          >
            <Badge
              position="absolute"
              top={2}
              right={2}
              colorScheme={
                product.stock <= 5
                  ? "red"
                  : product.stock >= 30
                  ? "green"
                  : "orange"
              }
              borderRadius="full"
              px={2}
            >
              {product.stock} Unidades
            </Badge>
            <Image
              src={product.image}
              alt={product.name}
              boxSize="100px"
              objectFit="contain"
              mx="auto"
              mt={4}
            />
            <Box p={4} pt={2}>
              <Text fontWeight="semibold">{product.name}</Text>
              <Text fontSize="sm" color="gray.600">
                {product.price}
              </Text>
            </Box>
          </Box>
        ))}

        {/* Placeholder para agregar producto */}
        <Box
          borderWidth="2px"
          borderColor="gray.200"
          borderRadius="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="150px"
          flexDir="column"
          cursor="pointer"
          _hover={{ bg: "gray.50" }}
        >
          <FiPlus size={20} style={{ marginBottom: 8, color: "gray" }} />
          <Text fontSize="sm" color="gray.500">
            Agregar producto
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default InventoryPage;
