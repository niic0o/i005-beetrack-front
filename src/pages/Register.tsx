import {
  Card,
  Box,
  Text,
  Container,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCheckEmailExists, useRegister } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/components/login-registerComponents/registerSchema";
import { EmailStep } from "@/components/login-registerComponents/EmailStep";
import { PasswordStep } from "@/components/login-registerComponents/PasswordStep";
import { PersonalInfoStep } from "@/components/login-registerComponents/PersonalInfoStep";
import { StoreInfoStep } from "@/components/login-registerComponents/StoreInfoStep";
import { StepProgress } from "@/components/login-registerComponents/StepProgress";
import { StepNavigation } from "@/components/login-registerComponents/StepNavigation";
import { useEmailCheck } from "@/hooks/useEmailCheck";
import { useRegisterSubmit } from "@/components/login-registerComponents/handleRegisterSubmit";

const Register = () => {
  const [step, setStep] = useState(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const registerMutation = useRegister();
  const emailCheckMutation = useCheckEmailExists();
  const { isCheckingEmail, checkEmailExists } = useEmailCheck(emailCheckMutation);

  // Setup React Hook Form with Zod resolver
  const formMethods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      name: "",
      lastName: "",
      dateOfBirth: "",
      storeName: "",
      storePhone: "",
      storeAddress: "",
    },
  });

  const { handleRegisterSubmit } = useRegisterSubmit({
    formMethods,
    registerMutation,
    setIsRegistering,
    setErrorMessage,
  });

  const validateCurrentStep = async () => {
    let isValid = false;
    
    switch (step) {
      case 1:
        isValid = await formMethods.trigger("email");
        if (isValid) {
          isValid = await checkEmailExists(formMethods.getValues("email"), setErrorMessage);
        }
        break;
      case 2:
        isValid = await formMethods.trigger("password");
        break;
      case 3:
        isValid = await formMethods.trigger(["name", "lastName", "dateOfBirth"]);
        break;
      case 4:
        isValid = await formMethods.trigger(["storeName", "storePhone", "storeAddress"]);
        break;
    }
    
    return isValid;
  };

  const handleNextStep = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const isValid = await validateCurrentStep();
    
    if (isValid) {
      if (step < 4) {
        setStep(step + 1);
      } else {
        handleRegisterSubmit();
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Render form fields based on current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <EmailStep formMethods={formMethods} />;
      case 2:
        return <PasswordStep formMethods={formMethods} />;
      case 3:
        return <PersonalInfoStep formMethods={formMethods} />;
      case 4:
        return <StoreInfoStep formMethods={formMethods} />;
      default:
        return null;
    }
  };

  // Get title for current step
  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Verificacion de Email";
      case 2:
        return "Crear contraseña";
      case 3:
        return "Información personal";
      case 4:
        return "Detalles del establecimiento";
      default:
        return "Registro";
    }
  };

  const isLoading = isCheckingEmail || isRegistering || registerMutation.isPending || emailCheckMutation.isPending;

  return (
    <Box
      minH="100vh"
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      p={4}
    >
      <Container maxW="md" p={0}>
        <Card.Root as="form" w="full" shadow="lg" onSubmit={handleNextStep}>
          <Card.Header>
            <StepProgress step={step} title={getStepTitle()} />
          </Card.Header>
          <Card.Body>
            {errorMessage && (
              <Text color="red.500" mb={4}>
                {errorMessage}
              </Text>
            )}
            {renderStepContent()}
          </Card.Body>
          <Card.Footer
            justifyContent="space-between"
            flexWrap={{ base: "wrap", sm: "nowrap" }}
            gap={2}
          >
            <StepNavigation
              step={step}
              isLoading={isLoading}
              isCheckingEmail={isCheckingEmail}
              isRegistering={isRegistering}
              handlePrevStep={handlePrevStep}
            />
          </Card.Footer>
        </Card.Root>
      </Container>
    </Box>
  );
};

export default Register;