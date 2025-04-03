import { Box, Tabs, Icon, Text, SimpleGrid, Flex } from "@chakra-ui/react";
import { FaShoppingCart, FaWallet, FaMoneyBillWave } from "react-icons/fa";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ComposedChart,
  Bar,
} from "recharts";
import { useToken } from "@chakra-ui/react";

const data = [
  { name: "Ene", value: 300 },
  { name: "Feb", value: 200 },
  { name: "Mar", value: 100 },
  { name: "Abr", value: 400 },
  { name: "May", value: 500 },
  { name: "Jun", value: 450 },
  { name: "Jul", value: 300 },
  { name: "Ago", value: 150 },
];

const FinanceGraph = () => {
  const [gradientToken] = useToken("chart", ["gradient"]);
  const gradient = gradientToken;

  return (
    <Box
      bg="white"
      color="gray.900"
      p={2}
      borderRadius="2xl"
      w="full"
      maxW="600px"
      mx="auto"
    >
      <Tabs.Root defaultValue="mensual">
        <Tabs.List
          justifyContent="center"
          mb={4}
          borderBottom="1px solid #e5e7eb"
        >
          {["semanal", "mensual", "anual"].map((key) => (
            <Tabs.Trigger
              key={key}
              value={key}
              fontWeight="semibold"
              textTransform="capitalize"
              px={4}
              pb={2}
              _selected={{
                color: "black",
                borderBottom: "2px solid #3CCF91",
              }}
            >
              {key}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content value="mensual">
          <Box bg="blue.400" p={4} borderRadius="lg" minHeight="250px">
            <Flex justify="center">
              <Box w="100%" maxW="500px">
                <ResponsiveContainer width="100%" height={250}>
                  <ComposedChart data={data}>
                    <CartesianGrid stroke="#CBD5E0" strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#CBD5E0" tick={{ style: { fontSize: "12px"}}} />
                    <YAxis
                      stroke="#CBD5E0"
                      tick={{ style: { fontSize: "12px" } }}
                    />
                    <Tooltip />

                    <Bar
                      dataKey="value"
                      fill="white"
                      radius={[4, 4, 0, 0]}
                      barSize={8}
                    />

                    <Line
                      dataKey="value"
                      type="monotone"
                      stroke="#3CCF91"
                      strokeWidth={3}
                      dot={true}
                      isAnimationActive={true}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </Box>
            </Flex>
          </Box>
        </Tabs.Content>
      </Tabs.Root>

      <SimpleGrid columns={[1, 3]} gap={4}>
        <SummaryCard icon={FaShoppingCart} label="ventas" value="32,984$" />
        <SummaryCard icon={FaWallet} label="Gastos" value="2,42$" />
        <SummaryCard icon={FaMoneyBillWave} label="Balance" value="30,400$" />
      </SimpleGrid>
    </Box>
  );
};

type SummaryCardProps = {
  icon: React.ElementType;
  label: string;
  value: string;
};

const SummaryCard = ({ icon, label, value }: SummaryCardProps) => (
  <Flex
    direction="column"
    bg="gray.50"
    borderRadius="lg"
    p={4}
    align="center"
    boxShadow="soft"
    border="1px solid #f1f1f1"
  >
    <Icon as={icon} boxSize={6} mb={2} color="#3CCF91" />
    <Text fontSize="sm" color="gray.500" mb={1} textTransform="capitalize">
      {label}
    </Text>
    <Text fontSize="xl" fontWeight="bold" color="gray.900">
      {value}
    </Text>
    <Box w="100%" h="2px" bg="gray.200" mt={2} position="relative">
      <Box w="60%" h="2px" bg="#3CCF91" position="absolute" />
    </Box>
  </Flex>
);

export default FinanceGraph;
