import {
  Text,
  Flex,
  Box,
  IconButton,
  Button,
  useBreakpointValue,
  Skeleton
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { useColorModeValue } from "@/components/ui/color-mode";
import { MdMenu } from "react-icons/md";
import useSidenavbarStore from "@/store/useSidenavbarStore";
import { useFetchProfile } from "@/hooks/useProfile";
import { NavLink } from "react-router-dom";
import useProductStore from "@/store/useProductStore";

const Topbar = () => {
  const { isLoading } = useFetchProfile();
  const { setIsOpen, titleToTopBar } = useSidenavbarStore();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const { products } = useProductStore();

  const lowStockProducts = products.filter(product => product.stock <= product.stock_min);
  const hasNotifications = lowStockProducts.length > 0;

  const bg = useColorModeValue("white", "sidenavbar.dark");
  const color = useColorModeValue("black", "white");

  return (
    <Flex
      as="header"
      w="full"
      h={"auto"}
      py={4}
      px={6}
      align="center"
      justify="space-between"
      gap={4}
      bg={bg}
      boxShadow="soft"
    >
      <Flex align={"center"} gap={2}>
        {isMobile && (
          <Button
            h={"auto"}
            p={"10px"}
            mr={"4px"}
            variant={"ghost"}
            onClick={() => setIsOpen(true)}
          >
            <MdMenu />
          </Button>
        )}
        {isLoading ? (
          <Skeleton h="24px" w="150px" />
        ) : (
          <Text
            truncate
            maxW="200px"
            fontSize="lg"
            fontWeight="bold"
            color={color}
          >
            {titleToTopBar}
          </Text>
        )}
      </Flex>

      <Flex align="center" gap={4}>
        {/* <InputGroup flex="1" startElement={<FaSearch />}>
          <Input
            placeholder="Buscar"
            borderRadius="full"
            variant="outline"
            borderColor="gray.300"
            _hover={{ borderColor: "gray.400" }}
            color={color}
          />
        </InputGroup> */}

        <Box position="relative">
          <NavLink to="/notifications">
            <IconButton
              aria-label="Notificaciones"
              variant="plain"
              color={hasNotifications ? "red.500" : color}
            >
              {" "}
              {hasNotifications ? (
                <Box position="relative" display="inline-block">
                  <FaBell color={color} />
                  <Box
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    w="8px"
                    h="8px"
                    bg="red.500"
                    borderRadius="full"
                  />
                </Box>
              ) : (
                <FaBell />
              )}{" "}
            </IconButton>
          </NavLink>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Topbar;
