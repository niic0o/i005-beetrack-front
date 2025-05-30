import useProfileStore from "@/store/useProfileStore";
import { dateBirthDateFormatter, dateFormatter } from "@/utils/dateFormatter";
import { Button, DataList, Spinner, Text, VStack } from "@chakra-ui/react";
import { MdOutlineEdit } from "react-icons/md";

type UserProfileCardProps = {
    setIsEditingUser: React.Dispatch<React.SetStateAction<boolean>>;
    isPending: boolean;
}

const UserProfileCard = ({ setIsEditingUser, isPending }: UserProfileCardProps) => {
    const { profile } = useProfileStore();

    if (isPending) {
        return (
            <VStack colorPalette="gray" w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"}>
                <Spinner color="colorPalette.600" />
                <Text color="colorPalette.600">Editando...</Text>
            </VStack>
        )
    }

    return (
        <>
            <DataList.Root size="lg">
                <DataList.Item>
                    <DataList.ItemLabel fontWeight={"bold"}>Nombre</DataList.ItemLabel>
                    <DataList.ItemValue wordBreak={"break-word"} whiteSpace={"normal"}>{profile?.name}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                    <DataList.ItemLabel fontWeight={"bold"}>Apellidos</DataList.ItemLabel>
                    <DataList.ItemValue wordBreak={"break-word"} whiteSpace={"normal"}>{profile?.last_name}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                    <DataList.ItemLabel fontWeight={"bold"}>Email</DataList.ItemLabel>
                    <DataList.ItemValue wordBreak={"break-word"} whiteSpace={"normal"}>{profile?.email}</DataList.ItemValue>
                </DataList.Item>
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
            <Button
                mt={"auto"}
                colorPalette="navItem"
                color={"colorPalette.fg"}
                fontWeight={"bold"}
                variant="solid"
                rounded={"16px"}
                onClick={() => setIsEditingUser(true)}>
                <MdOutlineEdit /> Editar
            </Button>
        </>
    )
}

export default UserProfileCard;