import CashTotal from '@/components/StatsComponents/CashTotal';
import SalesStats from '@/components/StatsComponents/SalesStats';
import TopBestSellings from '@/components/StatsComponents/TopBestSellings';
import { Box, GridItem, SimpleGrid } from '@chakra-ui/react';

const StatsPage = () => {

  return (
    <Box>
      <SimpleGrid columns={12} gap={6}>
        <GridItem colSpan={{ base: 12, lg: 6 }}>
          <SimpleGrid columns={12} gap={6}>
            <CashTotal />
            <TopBestSellings />
          </SimpleGrid>
        </GridItem>
        <GridItem colSpan={{ base: 12, lg: 6 }}>
          <SimpleGrid columns={12} gap={6}>
            {/* <TodayProfits /> */}
            <SalesStats />
          </SimpleGrid>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default StatsPage;
