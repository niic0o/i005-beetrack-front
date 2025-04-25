import { useMonthlyReport } from '@/hooks/useReport';
import useReportStore from '@/store/useReportStore';
import { Center, Flex, Float, FormatNumber, HStack, IconButton, Separator, Skeleton, VStack, Box, Icon, Text, Stack } from '@chakra-ui/react';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaShoppingCart } from 'react-icons/fa';
import { FaMoneyBills } from 'react-icons/fa6';
import { MdCalendarMonth, MdCreditCard, MdInventory, MdSyncAlt, MdTrendingUp } from 'react-icons/md';

const getStartAndEndOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return { firstDay, lastDay };
};

const MonthlyReport = () => {
    const { monthReport } = useReportStore(); // TODO: cambiar

    const [selectedMonth, setSelectedMonth] = useState<{ firstDay: Date, lastDay: Date } | null>(() => getStartAndEndOfMonth(new Date()));
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

    const { isLoading } = useMonthlyReport(selectedMonth);

    const handleMonthSelection = () => {
        setIsCalendarOpen(!isCalendarOpen);
    }

    const handleMonthChange = (date: Date | null) => {
        if (!date) return;

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0); // Día 0 del siguiente mes = último del actual

        setSelectedMonth({ firstDay, lastDay });
        setIsCalendarOpen(false);
    };
    return (
        <>
            <HStack position={"relative"}>
                <IconButton
                    colorPalette={"navItem"}
                    color={"colorPalette.fg"}
                    rounded={"8px"}
                    onClick={handleMonthSelection}>
                    <MdCalendarMonth />
                </IconButton>
                <Text fontWeight={"bold"}>{selectedMonth.firstDay.toLocaleDateString("en-GB", { month: "2-digit", year: "numeric" })}</Text>
                <Float placement={"bottom-center"} offsetY={"-76px"} w={"250px"}>
                    {isCalendarOpen &&
                        <DatePicker
                            inline
                            showMonthYearPicker
                            dateFormat="I/R"
                            locale={es}
                            shouldCloseOnSelect={true}
                            selected={selectedMonth.firstDay ?? null}
                            onChange={handleMonthChange}
                        />
                    }
                </Float>
            </HStack>
            <Skeleton asChild loading={isLoading} w={"full"}>
                {!monthReport
                    ? <Center>No hay contenido que mostrar para este mes</Center>
                    : (
                        <VStack gap={4}>
                            <VStack
                                w={"full"}
                                alignItems={"start"}
                                gap={4}
                                p={4}
                                bg="white"
                                flexGrow={1}
                                fontSize={"medium"}
                                borderRadius="3xl"
                                boxShadow="md">
                                <Flex
                                    align="center"
                                    gap={4}
                                    borderRadius="lg"
                                    w={"full"}
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
                                    <Text fontWeight="bold">Total de ingresos</Text>
                                    <Text color="green.500" fontWeight="semibold" ml={"auto"}>
                                        <FormatNumber value={monthReport?.totalProfit} style="currency" currency="USD" />
                                    </Text>
                                </Flex>
                                <Separator variant={"solid"} colorPalette={"black"} w={"full"} />
                                <Flex
                                    w={"full"}
                                    align="center"
                                    gap={4}
                                    borderRadius="lg">
                                    <Icon as={MdSyncAlt} boxSize={6} color="blue.400" />
                                    <Stack w={"full"} justifyContent={{ base: "center", md: "space-between" }} flexDir={{ base: "column", md: "row" }} gap={0}>
                                        <Text fontWeight="bold">Transferencias</Text>
                                        <Text color="green.500" fontWeight="semibold">
                                            <FormatNumber value={monthReport?.byPaymentMethod.digital} style="currency" currency="USD" />
                                        </Text>
                                    </Stack>
                                </Flex>
                                <Separator variant={"solid"} colorPalette={"black"} w={"full"} />
                                <Flex
                                    w={"full"}
                                    align="center"
                                    gap={4}
                                    borderRadius="lg">
                                    <Icon as={MdCreditCard} boxSize={6} color="blue.400" />
                                    <Stack w={"full"} justifyContent={{ base: "center", md: "space-between" }} flexDir={{ base: "column", md: "row" }} gap={0}>
                                        <Text fontWeight="bold">Tarjeta de crédito y débito</Text>
                                        <Text color="green.500" fontWeight="semibold">
                                            <FormatNumber value={monthReport?.byPaymentMethod.card} style="currency" currency="USD" />
                                        </Text>
                                    </Stack>
                                </Flex>
                                <Separator variant={"solid"} colorPalette={"black"} w={"full"} />
                                <Flex
                                    w={"full"}
                                    align="center"
                                    gap={4}
                                    borderRadius="lg">
                                    <Icon as={FaMoneyBills} boxSize={6} color="blue.400" />
                                    <Stack w={"full"} justifyContent={{ base: "center", md: "space-between" }} flexDir={{ base: "column", md: "row" }} gap={0}>
                                        <Text fontWeight="bold">Efectivo</Text>
                                        <Text color="green.500" fontWeight="semibold">
                                            <FormatNumber value={monthReport?.byPaymentMethod.cash} style="currency" currency="USD" />
                                        </Text>
                                    </Stack>
                                </Flex>
                            </VStack>
                            <Stack flexDir={{ base: "column", xl: "row" }} w={"full"} gap={4}>
                                <Box
                                    as={VStack}
                                    flexBasis={"1/2"}
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
                                            <Icon as={MdInventory} boxSize={6} color="blue.400" />
                                        </Flex>
                                        <VStack align="start" gap={0}>
                                            <Text fontWeight="bold">Productos vendidos</Text>
                                            <Text color="green.500" fontWeight="semibold">
                                                {monthReport?.totalProductsSold}
                                            </Text>
                                        </VStack>
                                    </Flex>
                                </Box>
                                <Box
                                    as={VStack}
                                    flexBasis={"1/2"}
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
                                            <Icon as={FaShoppingCart} boxSize={6} color="blue.400" />
                                        </Flex>
                                        <VStack align="start" gap={0}>
                                            <Text fontWeight="bold">Ventas registradas</Text>
                                            <Text color="green.500" fontWeight="semibold">
                                                {monthReport?.totalOrders}
                                            </Text>
                                        </VStack>
                                    </Flex>
                                </Box>
                            </Stack>
                        </VStack>
                    )
                }
            </Skeleton>
        </>
    )
}

export default MonthlyReport;