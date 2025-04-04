import { Flex, Text, InputGroup, Input, IconButton } from "@chakra-ui/react";
import { FaSearch, FaBell } from "react-icons/fa";

const Topbar = () => {
  return (
    <Flex
      as="header"
      w="100%"
      py={4}
      px={6}
      align="center"
      justify="space-between"
      bg="white"
      boxShadow="soft"
    >
      <Text fontSize="lg" fontWeight="bold" color={"black"}>
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
            color="black"
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
