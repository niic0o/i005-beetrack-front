import { Box, Button, HStack } from "@chakra-ui/react";
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
  handlePrevStep,
}: StepNavigationProps) => {
  return (
    <>
      <Box w={{ base: "full", sm: "auto" }}>
        {step > 1 ? (
          <Button
            variant="outline"
            onClick={handlePrevStep}
            w={{ base: "full", sm: "auto" }}
          >
            Back
          </Button>
        ) : (
          <Link to="/login" style={{ width: "100%" }}>
            <Button variant="outline" w={{ base: "full", sm: "auto" }}>
              Back to Login
            </Button>
          </Link>
        )}
      </Box>
      <Button
        type="submit"
        variant="solid"
        w={{ base: "full", sm: "auto" }}
        loading={isLoading}
        loadingText={
          isCheckingEmail
            ? "Checking Email"
            : isRegistering
            ? "Registering"
            : "Processing"
        }
      >
        {step < 4 ? "Next" : "Register"}
      </Button>
    </>
  );
};
