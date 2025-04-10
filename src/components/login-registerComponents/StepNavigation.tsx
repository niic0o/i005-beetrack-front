import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type StepNavigationProps = {
  step: number;
  isLoading: boolean;
  isCheckingEmail: boolean;
  isRegistering: boolean;
  handlePrevStep: () => void;
};

export const StepNavigation = ({
  step,
  isLoading,
  isCheckingEmail,
  isRegistering,
}: StepNavigationProps) => {
  return (
    <Button
      type="submit"
      variant="solid"
      w="full"
      colorScheme="yellow"
      loading={isLoading}
      loadingText={
        isCheckingEmail
          ? "Checking Email"
          : isRegistering
          ? "Registering"
          : "Processing"
      }
      borderRadius="md"
      py={6}
    >
      {step < 4 ? "Siguiente" : "Registrar"}
    </Button>
  );
};
