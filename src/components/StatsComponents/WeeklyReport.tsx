import { useRangeReport } from '@/hooks/useReport';
import useReportStore from '@/store/useReportStore';
import { Center, Flex, Float, FormatNumber, HStack, IconButton, Separator, Skeleton, VStack, Box, Icon, Text, Stack } from '@chakra-ui/react';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaShoppingCart } from 'react-icons/fa';
import { FaMoneyBills } from 'react-icons/fa6';
import { MdCalendarMonth, MdCreditCard, MdInventory, MdSyncAlt, MdTrendingUp } from 'react-icons/md';

const getStartAndEndOfWeek = (date: Date) => {
    const day = date.getDay();
    const diff = (day === 0 ? -6 : 1 - day);
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return { monday, sunday };
};

const WeeklyReport = () => {
    const { rangeReport } = useReportStore();

    const [selectedWeek, setSelectedWeek] = useState<{ monday: Date, sunday: Date } | null>(() => getStartAndEndOfWeek(new Date()));
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

    const { isLoading } = useRangeReport(selectedWeek);


    const handleWeekSelection = () => {
        setIsCalendarOpen(!isCalendarOpen);
    }

    const handleWeekChange = (date: Date | null) => {
        const selectedDate = new Date(date);
        const day = selectedDate.getDay();

        // Calculamos el lunes de esa semana
        const diff = (day === 0 ? -6 : 1 - day); // Si es domingo, el lunes anterior es -6, si es lunes, es 0
        const monday = new Date(selectedDate);
        monday.setDate(selectedDate.getDate() + diff);

        // Calculamos el domingo (6 días después del lunes)
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        setSelectedWeek({ monday, sunday });
        setIsCalendarOpen(false);
    };
    return (
        <>
            <HStack position={"relative"}>
                <IconButton
                    colorPalette={"navItem"}
                    color={"colorPalette.fg"}
                    rounded={"8px"}
                    onClick={handleWeekSelection}>
                    <MdCalendarMonth />
                    <Float placement={"bottom-center"} offsetY={"-32"} w={"full"}>
                        {isCalendarOpen &&
                            <DatePicker
                                inline
                                showWeekPicker
                                showWeekNumbers
                                dateFormat="I/R"
                                locale={es}
                                shouldCloseOnSelect={true}
                                selected={selectedWeek.monday ?? null}
                                onChange={handleWeekChange}
                            />
                        }
                    </Float>
                </IconButton>
                <Text fontWeight={"bold"}>{selectedWeek.monday.toLocaleDateString('en-GB')} - {selectedWeek.sunday.toLocaleDateString('en-GB')}</Text>
            </HStack>
            <Skeleton asChild loading={isLoading} w={"full"}>
                {!rangeReport
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
                                        <FormatNumber value={rangeReport?.totalProfit} style="currency" currency="USD" />
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
                                            <FormatNumber value={rangeReport?.byPaymentMethod.digital} style="currency" currency="USD" />
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
                                            <FormatNumber value={rangeReport?.byPaymentMethod.card} style="currency" currency="USD" />
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
                                            <FormatNumber value={rangeReport?.byPaymentMethod.cash} style="currency" currency="USD" />
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
                                                {rangeReport?.totalProductsSold}
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
                                                {rangeReport?.totalOrders}
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

export default WeeklyReport;