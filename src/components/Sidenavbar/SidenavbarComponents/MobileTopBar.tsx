import { HStack, IconButton, Image, Text } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import Logo from '@/assets/logo.svg';

type MobileTopBarProps = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileTopBar = ({ setIsOpen } : MobileTopBarProps) => {

    return (
        <HStack display={{ base: "flex", md: "none" }} gap={4}>
            <IconButton variant={"ghost"} onClick={() => setIsOpen(true)}>
                <MdMenu />
            </IconButton>
            <Image
                src={Logo} alt="Logo Beetrack" maxWidth={"30px"} />
            <Text as={"p"} fontWeight={"bold"}>BEETRACK</Text>
        </HStack>
    )

}

export default MobileTopBar;