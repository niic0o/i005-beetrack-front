import { Box, SimpleGrid, useBreakpointValue } from '@chakra-ui/react'
import Slider from 'react-slick'
import { ProductCard } from './ProductCard'

const products = [
  {
    name: 'Pepsi 2 Lts.',
    price: '$3.200',
    stock: 10,
    sold: 120,
    earnings: '$140.000',
    imageUrl: '/product-placeholder.webp',
  },
  {
    name: 'Pepsi 2 Lts.',
    price: '$3.200',
    stock: 10,
    sold: 120,
    earnings: '$140.000',
    imageUrl: '/product-placeholder.webp',
  },
  {
    name: 'Pepsi 2 Lts.',
    price: '$3.200',
    stock: 10,
    sold: 120,
    earnings: '$140.000',
    imageUrl: '/product-placeholder.webp',
  },
  {
    name: 'Pepsi 2 Lts.',
    price: '$3.200',
    stock: 10,
    sold: 120,
    earnings: '$140.000',
    imageUrl: '/product-placeholder.webp',
  },
  {
    name: 'Pepsi 2 Lts.',
    price: '$3.200',
    stock: 10,
    sold: 120,
    earnings: '$140.000',
    imageUrl: '/product-placeholder.webp',
  },
  {
    name: 'Pepsi 2 Lts.',
    price: '$3.200',
    stock: 10,
    sold: 120,
    earnings: '$140.000',
    imageUrl: '/product-placeholder.webp',
  },
]

export default function ProductList() {
  const isMobile = useBreakpointValue({ base: true, md: false, sm: true })

  const settings = {
    dots: true,
    infinite: false,
    speed: 400,
    slidesToShow: 1.65,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    centerPadding: '0',
    cssEase: 'ease-out',
  }

  return (
    <Box>
      {isMobile ? (
        <Box mx="-16px" width="calc(100% + 32px)">
          <Slider {...settings}>
            {products.map((product, idx) => (
              <Box key={idx} px={1}>
                <ProductCard {...product} />
              </Box>
            ))}
          </Slider>
        </Box>
      ) : (
        <SimpleGrid columns={[1, 2, 3, 4]} gap={4}>
          {products.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  )
}
