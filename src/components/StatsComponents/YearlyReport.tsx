import { useYearlyReport } from '@/hooks/useReport';
import useReportStore from '@/store/useReportStore';
import { Center, Flex, Float, FormatNumber, HStack, IconButton, Separator, Skeleton, VStack, Box, Icon, Text, Stack } from '@chakra-ui/react';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaShoppingCart } from 'react-icons/fa';
import { FaMoneyBills } from 'react-icons/fa6';
import { MdCalendarMonth, MdCreditCard, MdInventory, MdSyncAlt, MdTrendingUp } from 'react-icons/md';

const getStartAndEndOfYear = (date: Date) => {
    const first = new Date(date.getFullYear(), 0, 1); // 1 de enero
    const last = new Date(date.getFullYear(), 11, 31); // 31 de diciembre
    return { first, last };
};

const YearlyReport = () => {
    const { yearReport } = useReportStore();

    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
    const [selectedYear, setSelectedYear] = useState<{ first: Date, last: Date } | null>(() => getStartAndEndOfYear(new Date()));

    const { isLoading } = useYearlyReport(selectedYear.first.getFullYear());

    const handleYearSelection = () => {
        setIsCalendarOpen(!isCalendarOpen);
    }

    const handleYearChange = (date: Date | null) => {
        if (!date) return;

        const year = date.getFullYear();

        const first = new Date(year, 0, 1); // 1 de enero
        const last = new Date(year, 11, 31); // 31 de diciembre

        setSelectedYear({ first, last });
        setIsCalendarOpen(false);
    };

    return (
        <>
            <HStack position={"relative"}>
                <IconButton
                    colorPalette={"navItem"}
                    color={"colorPalette.fg"}
                    rounded={"8px"}
                    onClick={handleYearSelection}>
                    <MdCalendarMonth />
                </IconButton>
                <Text fontWeight={"bold"}>{selectedYear.first.getFullYear()}</Text>
                <Float placement={"bottom-center"} offsetY={"-24"} w={"200px"}>
                    {isCalendarOpen &&
                        <DatePicker
                            inline
                            showYearPicker
                            showWeekNumbers
                            dateFormat="I/R"
                            locale={es}
                            shouldCloseOnSelect={true}
                            selected={selectedYear.first ?? null}
                            onChange={handleYearChange}
                        />
                    }
                </Float>
            </HStack>
            <Skeleton asChild loading={isLoading} w={"full"}>
                {!yearReport
                    ? <Center>No hay contenido que mostrar para esta semana</Center>
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
                                        <FormatNumber value={yearReport?.totalProfit} style="currency" currency="USD" />
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
                                            <FormatNumber value={yearReport?.byPaymentMethod.digital} style="currency" currency="USD" />
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
                                            <FormatNumber value={yearReport?.byPaymentMethod.card} style="currency" currency="USD" />
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
                                            <FormatNumber value={yearReport?.byPaymentMethod.cash} style="currency" currency="USD" />
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
                                                {yearReport?.totalProductsSold}
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
                                                {yearReport?.totalOrders}
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

export default YearlyReport;