import {Outlet, Navigate} from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { Flex, Spinner } from "@chakra-ui/react";

const PrivateRoutes = () => {
    const user = useAuthStore(state => state.user)
    const loading = useAuthStore(state => state.loading)

    if(loading) {
        return (
            <Flex justify={'center'} align={'center'} height={'100vh'}>
                <Spinner
                    borderWidth={'4px'}
                    size={'xl'}
                />
            </Flex>
        )
    }
    return user ? <Outlet /> : <Navigate to={'/login'} />
};

export default PrivateRoutes;