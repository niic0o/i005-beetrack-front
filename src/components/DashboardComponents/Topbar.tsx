import { Flex, Text, InputGroup, Input, IconButton } from "@chakra-ui/react";
import { FaSearch, FaBell } from "react-icons/fa";
import { useColorModeValue } from "@/components/ui/color-mode"

const Topbar = () => {

  const bg = useColorModeValue("white", "sidenavbar.dark")
  const color = useColorModeValue("black", "white")
  return (
    <Flex
      as="header"
      w="100%"
      py={4}
      px={6}
      align="center"
      justify="space-between"
      bg={bg}
      boxShadow="soft"
      height="24"
    >
      <Text fontSize="lg" fontWeight="bold" color={color}>
        ¡Bienvenido Carlos!
      </Text>

      <Flex align="center" gap={4}>
        <InputGroup flex="1" startElement={<FaSearch />}>
          <Input
            placeholder="Buscar"
            borderRadius="full"
            variant="outline"
            borderColor="gray.300"
            _hover={{ borderColor: "gray.400" }}
            color={color}
          />
        </InputGroup>

        <IconButton aria-label="Notificaciones">
          <FaBell />
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default Topbar;
