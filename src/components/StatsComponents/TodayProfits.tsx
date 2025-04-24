import useReportStore from "@/store/useReportStore";
import { Box, Flex, FormatNumber, GridItem, Icon, Text, VStack } from "@chakra-ui/react";
import { MdTrendingUp } from "react-icons/md";

// interface CashTotalProps {

// }

const TodayProfits = () => {
  const { todayResume } = useReportStore();

    return (
        <GridItem as={VStack} alignItems={"stretch"} gap={"12px"} w={"full"} colSpan={12}>
            {/* Renderizar condicionalmente para poder usar */}
            {/* <Text fontWeight="bold" fontSize="lg">
                Total de Ingresos hoy
            </Text> */}
            <Box
                as={VStack}
                alignItems={"start"}
                gap={4}
                bg="white"
                flexGrow={1}
                borderRadius="3xl"
                boxShadow="md">
                <Flex
                    align="center"
                    gap={4}
                    borderRadius="lg"
                    p={4}
                >
                    <Flex
                        bg="green.500"
                        borderRadius="lg"
                        p={3}
                        align="center"
                        justify="center"
                    >
                        <Icon as={MdTrendingUp} boxSize={6} color="blue.400" />
                    </Flex>
                    <VStack align="start" gap={0}>
                        <Text fontWeight="bold">Total</Text>
                        <Text color="green.500" fontSize="xl" fontWeight="semibold">
                            <FormatNumber value={todayResume?.totalProfit} style="currency" currency="USD" />
                        </Text>
                    </VStack>
                </Flex>
            </Box>
        </GridItem>
    );
}

export default TodayProfits;