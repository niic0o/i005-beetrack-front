import { Field, Input, Stack, Text } from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RegisterFormData } from "./registerSchema";

type EmailStepProps = {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
};

export const EmailStep = ({ register, errors }: EmailStepProps) => {
  console.log("Email errors:", errors.email); // Add this for debugging
  
  return (
    <Stack gap="4" w="full">
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        <Field.HelperText>
          Comprobaremos si este email ya está registrado
        </Field.HelperText>
        {errors.email && (
          <Field.ErrorText>{errors.email.message as string}</Field.ErrorText>
        )}
      </Field.Root>
      
      {/* Alternative error display for debugging */}
      {errors.email && (
        <Text color="red.500">
           {errors.email.message as string}
        </Text>
      )}
    </Stack>
  );
};