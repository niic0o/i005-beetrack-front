import { Field, Input, Stack, Text } from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RegisterFormData } from "./registerSchema";

type PersonalInfoStepProps = {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
};

export const PersonalInfoStep = ({ register, errors }: PersonalInfoStepProps) => {
  console.log("Personal info errors:", errors.name, errors.lastName, errors.dateOfBirth); 
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
          <Text>{errors.name.message as string}</Text>
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
          <Field.ErrorText>{errors.lastName.message as string}</Field.ErrorText>
        )}
      </Field.Root>
      <Field.Root>
        <Field.Label>Fecha de nacimiento</Field.Label>
        <Input
          type="date"
          {...register("dateOfBirth")}
        />
        {errors.dateOfBirth && (
          <Field.ErrorText>{errors.dateOfBirth.message as string}</Field.ErrorText>
        )}
      </Field.Root>
    </Stack>
  );
};