import {
  Box,
  Text,
  Heading,
  Input,
  Button,
  Flex,
  VStack,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import {
  FiPlus,
  FiEdit,
  FiChevronRight,
  FiMinus,
  FiPlus as FiPlusStock,
} from "react-icons/fi";
import { FaBarcode } from "react-icons/fa";

const ProductEditPage = () => {
  return (
    <Box p={6} bg="gray.50">
      <Heading size="md" mb={4}>
        Inventario &gt;{" "}
        <Text as="span" fontWeight="medium">
          Manteca 250 gr
        </Text>
      </Heading>

      <Flex
        gap={6}
        align="flex-start"
        direction={{ base: "column", md: "row" }}
        width="100%"
      >
        {/* Izquierda */}
        <Box flex="1">
          <SimpleGrid columns={[2, null, 3]} gap={4} mb={4}>
            <Image
              src="/product-placeholder.webp"
              alt="ProductImage"
              borderRadius="lg"
              aspectRatio="1/1"
              objectFit="cover"
              width="100%"
            />
            <Image
              src="/product-placeholder.webp"
              alt="ProductImage"
              borderRadius="lg"
              aspectRatio="1/1"
              objectFit="cover"
              width="100%"
            />
            <Flex
              direction="column"
              align="center"
              justify="center"
              borderRadius="lg"
              bg="gray.700"
              color="white"
              h={{ base: "100px", md: "auto" }}
              aspectRatio="1/1"
              cursor="pointer"
              _hover={{ opacity: 0.8 }}
            >
              <FiPlus size={24} />
              <Text fontSize="sm" mt={2}>Imagen del producto</Text>
            </Flex>
          </SimpleGrid>

          <VStack
            gap={4}
            bg="white"
            p={4}
            borderRadius="lg"
            boxShadow="sm"
            align="stretch"
          >
            <InputGroup>
              <Input
                placeholder="Código de barras"
                defaultValue="927301748593"
              />
              <InputRightElement 
                pointerEvents="none" 
                h="full" 
                display="flex" 
                alignItems="center" 
                pr={10}
                pt={10}
              >
                <FaBarcode size={18} color="#718096" />
              </InputRightElement>
            </InputGroup>
            <Input
              placeholder="Nombre del producto"
              defaultValue="Manteca 250 gr"
            />
            <Input placeholder="Precio" defaultValue="$2.120,00" />

            <Text fontSize="xs" color="gray.500" pl={1}>
              Costo por item: $1750
            </Text>
          </VStack>

          <HStack mt={6} gap={4}>
            <Button variant="outline" flex="1">
              Cancelar
            </Button>
            <Button
              bg="black"
              color="white"
              _hover={{ bg: "gray.800" }}
              flex="1"
            >
              Guardar
            </Button>
          </HStack>
        </Box>

        {/* Derecha */}
        <Box w={{ base: "100%", md: "50%" }}>
          <VStack gap={4} align="stretch">
            <Box bg="white" p={4} borderRadius="lg" boxShadow="sm">
              <Text fontWeight="medium" mb={2}>
                Detalles
              </Text>

              <Flex
                direction="column"
                py={2}
                borderBottom="1px solid #eee"
                width="100%"
              >
                <Text fontSize="sm" color="gray.500" mb={1}>
                  Descripción
                </Text>
                <Flex width="100%" align="center">
                  <Input
                    placeholder="Ingrese una descripción del producto"
                    size="sm"
                    fontSize="sm"
                    flex="1"
                    mr={3}
                    borderRadius="xl"
                  />
                </Flex>
              </Flex>

              <Flex justify="space-between" align="center" pt={2}>
                <Box width="100%">
                  <Text fontSize="sm" color="gray.500" mb={1}>
                    Unidad de venta
                  </Text>
                  <Box as="select" 
                    fontSize="sm"
                    defaultValue="Kilogramos"
                    width="100%"
                    p={2}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.400" }}
                    _focus={{ borderColor: "black", boxShadow: "outline" }}
                    style={{ maxWidth: "100%" }}
                  >
                    <option value="Kilogramos">Kilogramo</option>
                    <option value="Gramos">Gramo</option>
                    <option value="Litros">Litro</option>
                    <option value="Mililitros">Mililitro</option>
                    <option value="Unidades">Unidad</option>
                  </Box>
                </Box>
              </Flex>
            </Box>

            <Box bg="white" p={4} borderRadius="lg" boxShadow="sm">
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontWeight="medium">Stock</Text>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<FiEdit />}
                  fontWeight="normal"
                >
                  Editar
                </Button>
              </Flex>

              <HStack spacing={3} justify="space-between">
                <Text fontSize="sm" color="gray.600">
                  Stock disponible
                </Text>
                <HStack>
                  <IconButton
                    size="sm"
                    icon={<FiMinus />}
                    aria-label="decrement"
                    variant="outline"
                  />
                  <Text fontWeight="bold">5</Text>
                  <IconButton
                    size="sm"
                    icon={<FiPlusStock />}
                    aria-label="increment"
                    variant="outline"
                  />
                </HStack>
              </HStack>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductEditPage;
