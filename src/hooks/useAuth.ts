import { authService } from "@/services/authService";
import useAuthStore from "@/store/useAuthStore";
import { Credentials, NewUserData, User, UserData } from "@/types/authType";
interface AppError {
  message: string;
  details: string;
}
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const createAppError = (message: string, error: unknown): AppError => ({
  message,
  details: error instanceof Error ? error.message : String(error),
});

export const useCheckAuthStatus = () => {
  const { setUser, setIsAuthenticated, setLoading, setError } = useAuthStore();

  return useQuery<User, AppError>({
    queryKey: ["checkAuthStatus"],
    queryFn: async () => {
      setLoading(true);
      try {
        const user = await authService.checkAuthStatus();
        setUser(user);
        setIsAuthenticated(true);
        setLoading(false);
        return user;
      } catch (error) {
        const appError = createAppError(
          "Error checking authentification status",
          error
        );
        setUser(null);
        setIsAuthenticated(false);
        setError(appError);
        setLoading(false);
        throw appError;
      }
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setUser, setIsAuthenticated, setLoading, setError } = useAuthStore();

  return useMutation<User, AppError, Credentials>({
    mutationFn: async (credentials: Credentials) => {
      setLoading(true);
      try {
        const user = await authService.loginUser(credentials);
        setUser(user);
        setIsAuthenticated(true);
        setLoading(false);
        return user;
      } catch (error) {
        const appError = createAppError("Error logging in", error);
        setError(appError);
        setLoading(false);
        throw appError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkAuthStatus"] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { resetState, setLoading, setError } = useAuthStore();

  return useMutation<void, AppError>({
    mutationFn: async () => {
      setLoading(true);
      try {
        await authService.logoutUser();
        resetState();
        setLoading(false);
      } catch (error) {
        const appError = createAppError("Error logging out", error);
        setError(appError);
        setLoading(false);
        throw appError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkAuthStatus"] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const { setUser, setIsAuthenticated, setLoading, setError } = useAuthStore();

  return useMutation<User, AppError, NewUserData>({
    mutationFn: async (userData: UserData) => {
      setLoading(true);
      try {
        const user = await authService.registerUser(userData as NewUserData);
        setUser(user);
        setIsAuthenticated(false);
        setLoading(false);
        return user;
      } catch (error) {
        const appError = createAppError("Error registering user", error);
        setError(appError);
        setLoading(false);
        throw appError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkAuthStatus"] });
    },
  });
};

export const checkEmailExists = () => {
  const { setLoading, setError } = useAuthStore();

  return useMutation<boolean, AppError, string>({
    mutationFn: async (email: string) => {
      setLoading(true);
      try {
        const exists = await authService.checkEmailExists(email);
        setLoading(false);
        return exists;
      } catch (error) {
        const appError = createAppError("Error checking email", error);
        setError(appError);
        setLoading(false);
        throw appError;
      }
    },
  });
};
