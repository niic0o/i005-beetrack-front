import { Field, Input, Stack } from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RegisterFormData } from "./registerSchema";

type StoreInfoStepProps = {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
};

export const StoreInfoStep = ({ register, errors }: StoreInfoStepProps) => {
  console.log("Store info errors:", errors.storeName, errors.storePhone, errors.storeAddress); // Add debugging
  
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
          <Field.ErrorText>{errors.storeName.message as string}</Field.ErrorText>
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
          <Field.ErrorText>{errors.storePhone.message as string}</Field.ErrorText>
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
          <Field.ErrorText>{errors.storeAddress.message as string}</Field.ErrorText>
        )}
      </Field.Root>
    </Stack>
  );
};