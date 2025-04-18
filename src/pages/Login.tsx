import {
  Button,
  Field,
  Input,
  Card,
  Stack,
  Text,
  Image,
  Flex,
  Box,
  Link,
  HStack,
  Heading,
} from "@chakra-ui/react";
import Logo from "@/assets/logo.svg";
import { AiFillGoogleCircle } from "react-icons/ai";
import { IoLogoFacebook } from "react-icons/io";
import HexagonPattern from "@/assets/HexagonPattern.svg";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import { useLogin } from "@/hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  LoginFormData,
} from "@/components/login-registerComponents/loginSchema";
import { PasswordInput } from "@/components/ui/password-input";

const Login = () => {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { isPending, mutate } = useLogin()


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoggingIn(true);

      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      mutate(data);

      console.log("Login successful!");
      setIsLoggingIn(false);
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
      console.error("Login error:", error);
      setIsLoggingIn(false);
    }
  };

  // const isLoading = isLoggingIn || isSubmitting;

  return (
    <Stack
      minH="100vh"
      maxW="100vw"
      bg={"gray.50"}
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        bottom="-70px"
        right="-50px"
        zIndex="0"
        pointerEvents="none"
      >
        <Image
          src={HexagonPattern}
          alt="Decorative pattern"
          width="250px"
          height="183px"
        />
      </Box>
      <Card.Root
        minH={{ base: "90vh", md: "60vh" }}
        maxW={{ base: "100%", md: "380px" }}
        variant={"subtle"}
        bg={"transparent"}
        as="form"
        w="full"
        onSubmit={handleSubmit(onSubmit)}
        position="relative"
        zIndex="1"
      >
        <Card.Header>
          <Flex direction={"column"} align="flex-start" mb={8}>
            <HStack>
              <Image src={Logo} alt="Logo Beetrack" maxWidth="50px" />
              <Box mx={3}>
                <Heading size="md" fontWeight="bold" lineHeight="1" mb={0}>
                  BEETRACK
                </Heading>
                <Text
                  as="span"
                  fontSize="xs"
                  color="gray.600"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  SALES & INVENTORY MANAGER
                </Text>
              </Box>
            </HStack>
          </Flex>
          <Box mt={5}>
            <Heading w="100%" fontWeight="bold" fontSize="xl">
              Iniciar sesión
            </Heading>
            <Text my={2} textStyle={"xs"}>
              ¿Eres nuevo?{" "}
              <Link
                textDecoration="underline"
                fontWeight={"bold"}
                href="/register"
              >
                Crear una cuenta
              </Link>
            </Text>
          </Box>
        </Card.Header>
        <Card.Body>
          <Button
            border={"1px solid"}
            variant="outline"
            mb={4}
            w="full"
            fontWeight={"bold"}
            borderRadius="xl"
            size={"lg"}
          >
            <AiFillGoogleCircle /> Registrate con Google
          </Button>
          <Button
            border={"1px solid"}
            variant="outline"
            w="full"
            fontWeight={"bold"}
            borderRadius="xl"
            size={"lg"}
          >
            <IoLogoFacebook /> Registrate con Facebook
          </Button>
          <Flex align="center" width="100%" my={4}>
            <Box flex="1" height="1px" bg="gray.300" />
            <Text mx={4} fontWeight="bold" color="gray.600" fontSize="md">
              0
            </Text>
            <Box flex="1" height="1px" bg="gray.300" />
          </Flex>
          <Stack gap="6" w="full">
            <Field.Root invalid={!!errors.email}>
              <Field.Label>Dirección de email</Field.Label>
              <Input
                type="email"
                placeholder="nombre@dominio.com"
                {...register("email")}
                borderRadius="md"
                size="lg"
              />
              {errors.email && (
                <Field.ErrorText>{errors.email.message}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root invalid={!!errors.password}>
              <Field.Label>Contraseña</Field.Label>
              <PasswordInput
                type="password"
                placeholder="**********"
                {...register("password")}
              />
              {errors.password && (
                <Field.ErrorText>{errors.password.message}</Field.ErrorText>
              )}
              <Link
                textStyle={"xs"}
                textDecoration="underline"
                fontWeight={"bold"}
                href="/forgot-password"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </Field.Root>
          </Stack>
        </Card.Body>
        <Card.Footer flexWrap={{ base: "wrap" }} gap={2}>
          <Button
            type="submit"
            variant="solid"
            w="full"
            colorPalette={"yellow"}
            color={"gray.900"}
            fontWeight={"bold"}
            loading={isPending}
            loadingText={"Iniciando sesión"}
            borderRadius="xl"
            py={6}
          >
            Iniciar sesión
          </Button>

          <Stack
            mt={10}
            gap={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
            w={"full"}
          ></Stack>
        </Card.Footer>
      </Card.Root>
    </Stack>
  );
};

export default Login;
