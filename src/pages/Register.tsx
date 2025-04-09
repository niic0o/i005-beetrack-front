import {
  Card,
  Box,
  Text,
  Container,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useCheckEmailExists, useRegister } from "@/hooks/useAuth";
import { useEmailCheck } from "@/hooks/useEmailCheck";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  registerSchema, 
  emailSchema, 
  passwordSchema, 
  personalInfoSchema, 
  storeInfoSchema, 
  RegisterFormData 
} from "@/components/login-registerComponents/registerSchema";
import { EmailStep } from "@/components/login-registerComponents/EmailStep";
import { PasswordStep } from "@/components/login-registerComponents/PasswordStep";
import { PersonalInfoStep } from "@/components/login-registerComponents/PersonalInfoStep";
import { StoreInfoStep } from "@/components/login-registerComponents/StoreInfoStep";
import { StepProgress } from "@/components/login-registerComponents/StepProgress";
import { StepNavigation } from "@/components/login-registerComponents/StepNavigation";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [step, setStep] = useState(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  
  const registerMutation = useRegister();
  const emailCheckMutation = useCheckEmailExists();
  
  const { isCheckingEmail, checkEmailExists } = useEmailCheck(emailCheckMutation);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      lastName: "",
      dateOfBirth: "",
      storeName: "",
      storePhone: "",
      storeAddress: "",
    },
  });
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form errors:", errors);
    }
  }, [errors]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsRegistering(true);
      
      const formattedData = {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        storePhone: data.storePhone ? Number(data.storePhone) : undefined,
      };
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      //TODO: DESCOMENTAR UNA VEZ TENGAMOS EL BACKEND
      // await registerMutation.mutateAsync(formattedData);
      
      console.log("Registration successful!", formattedData);
      setIsRegistering(false);
      navigate("/login");
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      console.error("Registration error:", error);
      setIsRegistering(false);
    }
  };

  const validateCurrentStep = async () => {
    let isValid = false;
    
    switch (step) {
      case 1:
        isValid = await trigger("email");
        if (isValid) {
          isValid = await checkEmailExists(getValues("email"), setErrorMessage);
        }
        break;
      case 2:
        isValid = await trigger(["password", "confirmPassword"]);
        break;
      case 3:
        isValid = await trigger(["name", "lastName", "dateOfBirth"]);
        break;
      case 4:
        isValid = await trigger(["storeName", "storePhone", "storeAddress"]);
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
        handleSubmit(onSubmit)();
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Verificacion de Email";
      case 2: return "Crear contraseña";
      case 3: return "Información personal";
      case 4: return "Detalles del establecimiento";
      default: return "Registro";
    }
  };

  const isLoading = isCheckingEmail || isRegistering || isSubmitting;

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
            
            {step === 1 && (
              <EmailStep register={register} errors={errors} />
            )}
            
            {step === 2 && (
              <PasswordStep register={register} errors={errors} />
            )}
            
            {step === 3 && (
              <PersonalInfoStep register={register} errors={errors} />
            )}
            
            {step === 4 && (
              <StoreInfoStep register={register} errors={errors} />
            )}
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