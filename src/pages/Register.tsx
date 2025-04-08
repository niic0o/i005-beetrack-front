import {
  Button,
  Field,
  Input,
  Card,
  Stack,
  Box,
  Text,
  Image,
  Flex,
  Container,
  Progress,
  HStack,
  
} from "@chakra-ui/react";
import Logo from "@/assets/logo.svg";

import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import { useState } from "react";

const Register = () => {
  const [step, setStep] = useState(1);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    //step 1
    email: "",
    //step 2
    password: "",
    //step 3
    name: "",
    lastName: "",
    dateOfBirth: "",
    //step 4
    storeName: "",
    storePhone: "",
    storeAddress: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const registerUser = useAuthStore((state) => state.registerUser);
  const checkEmailExists = useAuthStore((state) => state.checkEmailExists);
  const loading = useAuthStore((state) => state.loading);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    if (errorMessage) setErrorMessage("");
  };

  const validateEmail = async () => {
    if (!userData.email) {
      setErrorMessage("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      setErrorMessage("Invalid email format");
      return false;
    }
    setIsCheckingEmail(true);

    try {
      const emailExists = await checkEmailExists(userData.email);
      if (emailExists) {
        setErrorMessage("Email already exists");
        setIsCheckingEmail(false);
        return false;
      }
      setIsCheckingEmail(false);
      return true;
    } catch (error) {
      setErrorMessage(
        "Error comprobando el email. Por favor intentolo de nuevo"
      );
      setIsCheckingEmail(false);
      return false;
    }
  };

  const validatePassword = () => {
    if (!userData.password) {
      setErrorMessage("Contraseña requerida");
      return false;
    }
    if (userData.password.length < 6) {
      setErrorMessage("Contraseña debe tener al menos 6 caracteres");
      return false;
    }
    return true;
  };

  const validatePersonalInfo = () => {
    if (!userData.name || !userData.lastName) {
      setErrorMessage("Nombre y apellido requeridos");
      return false;
    }
    if (!userData.dateOfBirth) {
      setErrorMessage("Fecha de nacimiento requerida");
      return false;
    }
    return true;
  };

  const validateStoreInfo = () => {
    if (!userData.storeName) {
      setErrorMessage("Nombre de la tienda requerido");
      return false;
    }
    if (!userData.storePhone) {
      setErrorMessage("Teléfono de la tienda requerido");
      return false;
    }
    return true;
  };

  const handleNextStep = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    let isValid = false;
    switch (step) {
      case 1:
isValid = (await validateEmail()) ?? false;
        break;
      case 2:
        isValid = validatePassword();
        break;
      case 3:
isValid = validatePersonalInfo() || false;
        break;
      case 4:
        isValid = validateStoreInfo() || false;
        break;
    }
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

  const handleRegisterSubmit = async () => {
    try {
      const formattedData = {
        ...userData,
        dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth) : undefined,

        storePhone: userData.storePhone ? Number (userData.storePhone) : undefined, 
      }
      await registerUser(formattedData);
      console.log("Registration successful!");
      navigate('/login')
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      console.error("Registration error:", error);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Stack gap="4" w="full">
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input
                type="email"
                name="email"
                value={userData.email}
                placeholder="Enter your email"
                onChange={handleInputChange}
              />
              <Field.HelperText>
                Comprobaremos si este email ya está registrado
              </Field.HelperText>
            </Field.Root>
          </Stack>
        );
      case 2:
        return (
          <Stack gap="4" w="full">
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input
                type="password"
                name="password"
                value={userData.password}
                placeholder="Crear contraseña"
                onChange={handleInputChange}
              />
              <Field.HelperText>
                La contraseña debe tener al menos 6 caracteres
              </Field.HelperText>
            </Field.Root>
          </Stack>
        );
      case 3:
        return (
          <Stack gap="4" w="full">
            <Field.Root>
              <Field.Label>Nombre</Field.Label>
              <Input
                type="text"
                name="name"
                value={userData.name}
                placeholder="Introduce tu nombre"
                onChange={handleInputChange}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Apellido</Field.Label>
              <Input
                type="text"
                name="lastName"
                value={userData.lastName}
                placeholder="Introduce tu apellido"
                onChange={handleInputChange}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Date of Birth</Field.Label>
              <Input
                type="date"
                name="dateOfBirth"
                value={userData.dateOfBirth || ""}
                onChange={handleInputChange}
              />
            </Field.Root>
          </Stack>
        );
      case 4:
        return (
          <Stack gap="4" w="full">
            <Field.Root>
              <Field.Label>Nombre del establecimiento</Field.Label>
              <Input
                type="text"
                name="storeName"
                value={userData.storeName}
                onChange={handleInputChange}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Número de telefono</Field.Label>
              <Input
                type="tel"
                name="storePhone"
                value={userData.storePhone || ""}
                onChange={handleInputChange}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Dirección de la tienda</Field.Label>
              <Input
                type="text"
                name="storeAddress"
                value={userData.storeAddress}
                onChange={handleInputChange}
              />
            </Field.Root>
          </Stack>
        );
      default:
        return null;
    }
  };

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
            <Flex position="relative" align="center" mb={3}>
              <Image
                position="absolute"
                left={0}
                src={Logo}
                alt="Logo Beetrack"
                maxWidth="50px"
              />
              <Card.Title w="100%" textAlign="center">
                {getStepTitle()}
              </Card.Title>
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
            {/* <Card.Description>
              Create a new account to access the platform
            </Card.Description> */}
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
              loading={isCheckingEmail || loading}
              loadingText={isCheckingEmail ? "Checking Email" : "Registering"}
            >
              {step < 4 ? "Next" : "Register"}
            </Button>
          </Card.Footer>
        </Card.Root>
      </Container>
    </Box>
  );
};

export default Register;
