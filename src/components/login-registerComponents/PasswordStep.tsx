import { Field, Input, Stack } from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "./registerSchema";

type PasswordStepProps = {
  formMethods: UseFormReturn<RegisterFormData>;
};

export const PasswordStep = ({ formMethods }: PasswordStepProps) => {
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <Stack gap="4" w="full">
      <Field.Root>
        <Field.Label>Password</Field.Label>
        <Input
          type="password"
          placeholder="Crear contraseña"
          {...register("password")}
        />
        <Field.HelperText>
          La contraseña debe tener al menos 6 caracteres
        </Field.HelperText>
        {errors.password && (
          <Field.ErrorText>{errors.password.message}</Field.ErrorText>
        )}
      </Field.Root>
    </Stack>
  );
};