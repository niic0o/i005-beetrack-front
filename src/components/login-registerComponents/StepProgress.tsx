import { Box, Flex, HStack, Image, Progress, Text } from "@chakra-ui/react";
import Logo from "@/assets/logo.svg";

type StepProgressProps = {
  step: number;
  title: string;
};

export const StepProgress = ({ step, title }: StepProgressProps) => {
  return (
    <>
      <Flex position="relative" align="center" mb={3}>
        <Image
          position="absolute"
          left={0}
          src={Logo}
          alt="Logo Beetrack"
          maxWidth="50px"
        />
        <Text w="100%" textAlign="center" fontWeight="bold" fontSize="xl">
          {title}
        </Text>
      </Flex>
      <Progress.Root
        value={(step / 4) * 100}
        size="sm"
        colorScheme="blue"
        mb={4}
        borderRadius="md"
      />
      <HStack gap={2} justifyContent="center" marginBottom={2}>
        {[1, 2, 3, 4].map((s) => (
          <Box
            key={s}
            w="8px"
            h="8px"
            borderRadius="full"
            bg={s <= step ? "blue.500" : "gray.200"}
          />
        ))}
      </HStack>
    </>
  );
};