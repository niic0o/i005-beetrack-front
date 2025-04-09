import { Field, Input, Stack, Text } from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RegisterFormData } from "./registerSchema";

type PasswordStepProps = {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
};

export const PasswordStep = ({ register, errors }: PasswordStepProps) => {
  console.log("Password errors:", errors.password, errors.confirmPassword); 
  
  return (
    <Stack gap="4" w="full">
      <Field.Root>
        <Field.Label>Contraseña</Field.Label>
        <Input
          type="password"
          placeholder="Crear contraseña"
          {...register("password")}
        />
        <Field.HelperText>
          La contraseña debe tener al menos 6 caracteres
        </Field.HelperText>
        {errors.password && (
          <Field.ErrorText>{errors.password.message as string}</Field.ErrorText>
        )}
      </Field.Root>
      <Field.Root>
        <Field.Label>Confirmar contraseña</Field.Label>
        <Input
          type="password"
          placeholder="Confirmar contraseña"
          {...register("confirmPassword")}
        />
        <Field.HelperText>
          Las contraseñas deben coincidir
        </Field.HelperText>
        {errors.confirmPassword && (
          <Field.ErrorText>{errors.confirmPassword.message as string}</Field.ErrorText>
        )}
      </Field.Root>
            
      {/* Alternative error display for debugging */}
      {errors.password && (
        <Text color="red.500">
           {errors.password?.message as string}
        </Text>
      )}
    </Stack>
  );
};