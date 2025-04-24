import { Box, GridItem, Tabs, Text, VStack } from "@chakra-ui/react";
import MonthlyReport from "./MonthlyReport";
import YearlyReport from "./YearlyReport";
import DailyReport from "./DailyReport";
import WeeklyReport from "./WeeklyReport";

// const getStartAndEndOfWeek = (date: Date) => {
//     const day = date.getDay();
//     const diff = (day === 0 ? -6 : 1 - day);
//     const monday = new Date(date);
//     monday.setDate(date.getDate() + diff);
//     const sunday = new Date(monday);
//     sunday.setDate(monday.getDate() + 6);
//     return { monday, sunday };
// };

const SalesStats = () => {
    return (
        <GridItem as={VStack} alignItems={"stretch"} gap={"12px"} w={"full"} colSpan={12}>
            <Text fontWeight="bold" fontSize="lg">
                Estadísticas de ventas
            </Text>
            <Box
                as={VStack}
                p={4}
                pt={2}
                alignItems={"start"}
                gap={4}
                bg="white"
                flexGrow={1}
                borderRadius="3xl"
                boxShadow="md">
                <Tabs.Root defaultValue="daily" w={"full"}>
                    <Tabs.List justifyContent={"space-evenly"}>
                        <Tabs.Trigger value="daily">
                            Día
                        </Tabs.Trigger>
                        <Tabs.Trigger value="weekly">
                            Semana
                        </Tabs.Trigger>
                        <Tabs.Trigger value="monthly">
                            Mes
                        </Tabs.Trigger>
                        <Tabs.Trigger value="yearly">
                            Año
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="daily" as={VStack} gap={4}>
                        <DailyReport />
                    </Tabs.Content>
                    <Tabs.Content value="weekly" as={VStack} gap={4}>
                        <WeeklyReport />
                    </Tabs.Content>
                    <Tabs.Content value="monthly" as={VStack} gap={4}>
                        <MonthlyReport />
                    </Tabs.Content>
                    <Tabs.Content value="yearly" as={VStack} gap={4}>
                        <YearlyReport />
                    </Tabs.Content>
                </Tabs.Root>
            </Box>
        </GridItem>
    );
}

export default SalesStats;