import { AUTH_ENDPOINT } from "@/const/api";
import { authService } from "@/services/authService";
import useAuthStore from "@/store/useAuthStore";
import { Credentials, NewUserData, User } from "@/types/authType";
import { buildUrl } from "@/utils/buildUrl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; 
import { useEffect } from "react";

interface AppError {
  message: string;
  details: string;
}

export const useCheckAuthStatus = () => {
  const { setUser, setIsAuthenticated, queryParams } = useAuthStore();
  const url = buildUrl(AUTH_ENDPOINT, {
    ...queryParams,
    resource: "checkAuthStatus",
  });

  const query = useQuery<User, AppError>({
    queryKey: [url],
    queryFn: () => authService.checkAuthStatus(),
    staleTime: 5 * 60 * 1000 // 5 minutos
  });

  // Manejamos la lógica de onSuccess usando useEffect
  useEffect(() => {
    if (query.data) {
      setUser(query.data);
      setIsAuthenticated(true);
    }
    staleTime: 5 * 60 * 1000 // lo puse porque esta en products tmb ^^'
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setUser, setIsAuthenticated, queryParams } = useAuthStore();
  const url = buildUrl(AUTH_ENDPOINT, queryParams);

  return useMutation<User, AppError, Credentials>({
    mutationFn: authService.loginUser,
    onSuccess: (data) => {
      setUser(data);
      setIsAuthenticated(true);
      queryClient.invalidateQueries({ queryKey: [url] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { resetState, queryParams } = useAuthStore();
  const url = buildUrl(AUTH_ENDPOINT, queryParams);

  return useMutation<void, AppError>({
    mutationFn: authService.logoutUser,
    onSuccess: () => {
      resetState();
      localStorage.clear();
      // localStorage.removeItem("profile")
      // localStorage.removeItem("auth")
      queryClient.invalidateQueries({ queryKey: [url] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const { setUser, queryParams } = useAuthStore();
  const url = buildUrl(AUTH_ENDPOINT, queryParams);

  return useMutation<User, AppError, NewUserData>({
    mutationFn: authService.registerUser,
    onSuccess: (data) => {
      setUser(data);
      queryClient.invalidateQueries({ queryKey: [url] });
    },
  });
};

export const useCheckEmailExists = () => {
  return useMutation<boolean, AppError, string>({
    mutationFn: authService.checkEmailExists,
  });
};