import { Field, Input, Stack } from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "./registerSchema";

type PersonalInfoStepProps = {
  formMethods: UseFormReturn<RegisterFormData>;
};

export const PersonalInfoStep = ({ formMethods }: PersonalInfoStepProps) => {
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <Stack gap="4" w="full">
      <Field.Root>
        <Field.Label>Nombre</Field.Label>
        <Input
          type="text"
          placeholder="Introduce tu nombre"
          {...register("name")}
        />
        {errors.name && (
          <Field.ErrorText>{errors.name.message}</Field.ErrorText>
        )}
      </Field.Root>
      <Field.Root>
        <Field.Label>Apellido</Field.Label>
        <Input
          type="text"
          placeholder="Introduce tu apellido"
          {...register("lastName")}
        />
        {errors.lastName && (
          <Field.ErrorText>{errors.lastName.message}</Field.ErrorText>
        )}
      </Field.Root>
      <Field.Root>
        <Field.Label>Date of Birth</Field.Label>
        <Input
          type="date"
          {...register("dateOfBirth")}
        />
        {errors.dateOfBirth && (
          <Field.ErrorText>{errors.dateOfBirth.message}</Field.ErrorText>
        )}
      </Field.Root>
    </Stack>
  );
};