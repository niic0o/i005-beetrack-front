import { Field, Input, Stack,  } from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "./registerSchema";

type EmailStepProps = {
  formMethods: UseFormReturn<RegisterFormData>;
};

export const EmailStep = ({ formMethods }: EmailStepProps) => {
  const {
    register,
    formState: { errors },
  } = formMethods;

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
          <Field.ErrorText>{errors.email.message}</Field.ErrorText>
        )}
      </Field.Root>
    </Stack>
  );
};