import { Box, SimpleGrid, useBreakpointValue, Text, GridItem } from '@chakra-ui/react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductCard } from '@/components/DashboardComponents/ProductCard';
import useReportStore from '@/store/useReportStore';

const TopBestSellings = () => {
    const isMobile = useBreakpointValue({ base: true, sm: true, md: false })

    const { topBestSellingsReport } = useReportStore();
    // const { isPending } = useTopBestSellingsStatus();

    const topProducts = topBestSellingsReport
        ? topBestSellingsReport.topProducts
        : null;

    const limitedProducts = topProducts
        ? topProducts.slice(0, 4)
        : null

    const settings = {
        dots: true,
        infinite: false,
        speed: 400,
        slidesToShow: 1.6,
        slidesToScroll: 1,
        arrows: false,
        centerMode: false,
        centerPadding: '0',
        cssEase: 'ease-out',
        swipeToSlide: true,
        touchMove: true,
        accessibility: true,
    }

    const content = isMobile ? (
        <Box className="mobile-slider">
            <Slider {...settings}>
                {limitedProducts.map((product) => (
                    <Box key={product.id} px={1}>
                        <ProductCard {...product} />
                    </Box>
                ))}
            </Slider>
        </Box>
    ) : (
        <SimpleGrid columns={2} gap={{ base: 1, xl: 4 }} width="100%">
            {limitedProducts &&
                limitedProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
        </SimpleGrid>
    )

    return (
        <GridItem colSpan={12}>
            <Box width="100%">
                <Text fontWeight="bold" fontSize="lg" mb={4}>
                    Productos más vendidos este mes
                </Text>
                <Box css={!isMobile && { overflowX: "auto", width: "100%" }}>
                        {content}
                </Box>
            </Box>
        </GridItem>
    )
}

export default TopBestSellings;