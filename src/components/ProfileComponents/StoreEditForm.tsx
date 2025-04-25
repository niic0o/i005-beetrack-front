import { StoreDataForm, storeDataFormSchema } from "@/schemas/profileSchemas";
import useProfileStore from "@/store/useProfileStore";
import { Store } from "@/types/profileTypes";
import { dateFormatter } from "@/utils/dateFormatter";
import { Button, DataList, Field, HStack, Input, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

type StoreEditFormProps = {
    setIsEditingStore: React.Dispatch<React.SetStateAction<boolean>>;
    mutateStore: (variables: { updatedStore: Partial<Store> }) => void;
}

const StoreEditForm = ({ setIsEditingStore, mutateStore }: StoreEditFormProps) => {
    const { profile } = useProfileStore();


    const { register, handleSubmit, formState: { errors } } = useForm<StoreDataForm>({
        resolver: zodResolver(storeDataFormSchema),
        defaultValues: {
            name: profile?.store.name ?? '',
            address: profile?.store.address ?? '',
            tel: profile?.store.tel ?? '',
        }
    });

    const onStoreSubmit = (data: StoreDataForm) => {
        mutateStore({ updatedStore: data });
        setIsEditingStore(false);
    }

    return (
        <form onSubmit={handleSubmit(onStoreSubmit)} style={{ width: "100%", height: "100%" }}>
            <VStack gap={4} align="stretch" h={"full"}>
                <Field.Root invalid={!!errors.name} required>
                    <Field.Label>
                        Nombre
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input {...register("name")} />
                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.address}>
                    <Field.Label>
                        Dirección
                    </Field.Label>
                    <Input {...register("address")} />
                    <Field.ErrorText>{errors.address?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.tel} required>
                    <Field.Label>
                        Teléfono
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input {...register("tel")} />
                    <Field.ErrorText>{errors.tel?.message}</Field.ErrorText>
                </Field.Root>

                <DataList.Root>
                    <DataList.Item>
                        <DataList.ItemLabel fontWeight={"bold"}>Fecha de creación</DataList.ItemLabel>
                        <DataList.ItemValue wordBreak={"break-word"} whiteSpace={"normal"}>{dateFormatter(profile?.store.createdAt)}</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel fontWeight={"bold"}>Última actualización de la tienda</DataList.ItemLabel>
                        <DataList.ItemValue wordBreak={"break-word"} whiteSpace={"normal"}>{dateFormatter(profile?.store.updatedAt)}</DataList.ItemValue>
                    </DataList.Item>
                </DataList.Root>

                <HStack justify="end" mt={"auto"}>
                    <Button variant="ghost" onClick={() => setIsEditingStore(false)}>Cancelar</Button>
                    <Button
                        type="submit"
                        colorPalette="navItem"
                        color={"colorPalette.fg"}
                        fontWeight={"bold"}
                        variant="solid"
                        rounded={"16px"}>
                        Guardar</Button>
                </HStack>
            </VStack>
        </form>
    )
}

export default StoreEditForm;