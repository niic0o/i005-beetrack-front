import { useDailyReport } from "@/hooks/useReport";
import useReportStore from "@/store/useReportStore";
import { RangeReport } from "@/types/statsTypes";
import { Center, Flex, Float, FormatNumber, HStack, Separator, Skeleton, VStack, Box, Icon, Text, Stack, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaShoppingCart } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";
import { MdCalendarMonth, MdCreditCard, MdInventory, MdSyncAlt, MdTrendingUp } from "react-icons/md";

const DEFAULT_DAILY_REPORT = {
    totalSales: 0,
    totalCost: 0,
    totalProfit: 0,
    totalOrders: 0,
    totalProductsSold: 0,
    byPaymentMethod: {
        cash: 0,
        card: 0,
        digital: 0
    }
};

const getCorrectReport = (selectedDate: Date, todayResume : RangeReport, dailyReport : RangeReport): RangeReport => {
    const reportData = selectedDate.toDateString() === new Date().toDateString() ? todayResume : dailyReport;

    const reportToShow = reportData ?? DEFAULT_DAILY_REPORT;

    return { ...reportToShow };
}

const DailyReport = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

    const { dailyReport } = useReportStore();
    const { todayResume } = useReportStore();

    const reportData = getCorrectReport(selectedDate, todayResume, dailyReport);

    const { isLoading } = useDailyReport(selectedDate);

    const handleDateSelection = () => {
        setIsCalendarOpen(!isCalendarOpen);
    }

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        setIsCalendarOpen(false);
    };

    return (
        <>
            <HStack position={"relative"}>
                <IconButton
                    colorPalette={"navItem"}
                    color={"colorPalette.fg"}
                    rounded={"8px"}
                    onClick={handleDateSelection}>
                    <MdCalendarMonth />
                </IconButton>
                <Text fontWeight={"bold"}>{selectedDate.toLocaleDateString('en-GB')}</Text>
                <Float placement={"bottom-center"} offsetY={"-32"} w={"full"}>
                    {isCalendarOpen &&
                        <DatePicker
                            inline
                            shouldCloseOnSelect={true}
                            selected={selectedDate}
                            onChange={handleDateChange}
                        />
                    }
                </Float>
            </HStack>
            <Skeleton asChild loading={isLoading} w={"full"}>
                {!reportData
                    ? <Center>No hay contenido que mostrar para este día</Center>
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
                                    w={"full"}>
                                    <Flex
                                        bg="green.500"
                                        borderRadius="lg"
                                        p={3}
                                        align="center"
                                        justify="center">
                                        <Icon as={MdTrendingUp} boxSize={6} color="blue.400" />
                                    </Flex>
                                    <Stack w={"full"} justifyContent={"space-between"} flexDir={{ base: "column", md: "row" }}>
                                        <Text fontWeight="bold">Total de ingresos</Text>
                                        <Text color="green.500" fontWeight="semibold">
                                            <FormatNumber value={reportData?.totalProfit} style="currency" currency="USD" />
                                        </Text>
                                    </Stack>
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
                                            <FormatNumber value={reportData?.byPaymentMethod.digital} style="currency" currency="USD" />
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
                                            <FormatNumber value={reportData?.byPaymentMethod.card} style="currency" currency="USD" />
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
                                            <FormatNumber value={reportData?.byPaymentMethod.cash} style="currency" currency="USD" />
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
                                        p={4}>
                                        <Flex
                                            bg="green.500"
                                            borderRadius="lg"
                                            p={3}
                                            align="center"
                                            justify="center">
                                            <Icon as={MdInventory} boxSize={6} color="blue.400" />
                                        </Flex>
                                        <VStack align="start" gap={0}>
                                            <Text fontWeight="bold">Productos vendidos</Text>
                                            <Text color="green.500" fontWeight="semibold">
                                                {reportData?.totalProductsSold}
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
                                        p={4}>
                                        <Flex
                                            bg="green.500"
                                            borderRadius="lg"
                                            p={3}
                                            align="center"
                                            justify="center">
                                            <Icon as={FaShoppingCart} boxSize={6} color="blue.400" />
                                        </Flex>
                                        <VStack align="start" gap={0}>
                                            <Text fontWeight="bold">Ventas registradas</Text>
                                            <Text color="green.500" fontWeight="semibold">
                                                {reportData?.totalOrders}
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

export default DailyReport;