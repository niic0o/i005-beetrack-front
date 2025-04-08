import { Field, Input, Stack } from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "./registerSchema";

type StoreInfoStepProps = {
  formMethods: UseFormReturn<RegisterFormData>;
};

export const StoreInfoStep = ({ formMethods }: StoreInfoStepProps) => {
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <Stack gap="4" w="full">
      <Field.Root>
        <Field.Label>Nombre del establecimiento</Field.Label>
        <Input
          type="text"
          placeholder="Introduce el nombre de tu establecimiento"
          {...register("storeName")}
        />
        {errors.storeName && (
          <Field.ErrorText>{errors.storeName.message}</Field.ErrorText>
        )}
      </Field.Root>
      <Field.Root>
        <Field.Label>Teléfono del establecimiento</Field.Label>
        <Input
          type="tel"
          placeholder="Introduce el teléfono del establecimiento"
          {...register("storePhone")}
        />
        {errors.storePhone && (
          <Field.ErrorText>{errors.storePhone.message}</Field.ErrorText>
        )}
      </Field.Root>
      <Field.Root>
        <Field.Label>Dirección del establecimiento</Field.Label>
        <Input
          type="text"
          placeholder="Introduce la dirección del establecimiento"
          {...register("storeAddress")}
        />
        {errors.storeAddress && (
          <Field.ErrorText>{errors.storeAddress.message}</Field.ErrorText>
        )}
      </Field.Root>
    </Stack>
  );
};