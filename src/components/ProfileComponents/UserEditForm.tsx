import { UserDataForm, userDataFormSchema } from "@/schemas/profileSchemas";
import useProfileStore from "@/store/useProfileStore";
import { UserData } from "@/types/authType";
import { Button, DataList, Field, HStack, Input, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { dateBirthDateFormatter, dateFormatter } from "@/utils/dateFormatter";

type UserEditFormProps = {
    setIsEditingUser: React.Dispatch<React.SetStateAction<boolean>>;
    mutateUser: (variables: { updatedUser: Partial<UserData> }) => void;
}

const UserEditForm = ({ setIsEditingUser, mutateUser }: UserEditFormProps) => {
    const { profile } = useProfileStore();

    const { register, handleSubmit, formState: { errors } } =
        useForm<UserDataForm>({
            resolver: zodResolver(userDataFormSchema),
            defaultValues: {
                name: profile?.name ?? '',
                last_name: profile?.last_name ?? '',
                email: profile?.email ?? '',
            }
        });

    const onUserSubmit = (data: Partial<UserData>) => {
        mutateUser({ updatedUser: data });
        setIsEditingUser(false);
    }

    return (
        <form onSubmit={handleSubmit(onUserSubmit)} style={{ width: "100%", height: "100%" }}>
            <VStack gap={4} align="stretch" height={"full"}>
                <Field.Root invalid={!!errors.name} required>
                    <Field.Label>
                        Nombre
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input {...register("name")} />
                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.last_name} required>
                    <Field.Label>
                        Apellidos
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input {...register("last_name")} />
                    <Field.ErrorText>{errors.last_name?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.email} required>
                    <Field.Label>
                        Email
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input {...register("email")} />
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                    <Field.HelperText>
                        Recuerde que si cambia la dirección de correo eletrónico, deberá usar la nueva dirección para el inicio de sesión.
                    </Field.HelperText>
                </Field.Root>

                <DataList.Root>
                    <DataList.Item>
                        <DataList.ItemLabel fontWeight={"bold"}>Fecha de nacimiento</DataList.ItemLabel>
                        <DataList.ItemValue wordBreak={"break-word"} whiteSpace={"normal"}>{dateBirthDateFormatter(profile?.birthdate)}</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel fontWeight={"bold"}>Fecha de creación</DataList.ItemLabel>
                        <DataList.ItemValue wordBreak={"break-word"} whiteSpace={"normal"}>{dateFormatter(profile?.createdAt)}</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel fontWeight={"bold"}>Última actualización del usuario</DataList.ItemLabel>
                        <DataList.ItemValue wordBreak={"break-word"} whiteSpace={"normal"}>{dateFormatter(profile?.updatedAt)}</DataList.ItemValue>
                    </DataList.Item>
                </DataList.Root>

                <HStack justify="end" mt={"auto"}>
                    <Button variant="ghost" onClick={() => setIsEditingUser(false)}>Cancelar</Button>
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

export default UserEditForm;