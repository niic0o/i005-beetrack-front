import { create } from "zustand";
import { devtools } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}
//TODO: añadir el AUTH_ENDPONT a la api una vez merge, y mover las interfaces a la carpeta types.
interface Credentials {
  email: string;
  password: string;
}

interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface AppError {
  message: string;         
  code?: string;           
  status?: number;         
  details?: unknown; 
}

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: AppError | string | null;

  setLoading: (isLoading: boolean) => void;
  checkAuthStatus: () => Promise<void>;
  loginUser: (credentials: Credentials) => Promise<void>;
  logoutUser: () => Promise<void>;
  registerUser: (userData: UserData) => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      isAuthenticated: false,

      setLoading: (isLoading: boolean) => set({ loading: isLoading }),

      checkAuthStatus: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${AUTH_ENDPOINT}/check-status`, {
            credentials: 'include' // Para cookies
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          const data: User = await response.json();
          set({ user: data, isAuthenticated: true, loading: false });
        } catch (error) {
          const appError: AppError = {
            message: 'Error al verificar autenticación',
            status: error instanceof Error && 'status' in error ? (error as any).status : undefined,
            details: error instanceof Error ? error.message : String(error),
          };
          set({ user: null, isAuthenticated: false, error: appError, loading: false });
        }
      },

      loginUser: async (credentials: Credentials) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${AUTH_ENDPOINT}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include'
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
          }

          const data: User = await response.json();
          set({ user: data, isAuthenticated: true, loading: false });
        } catch (error) {
          const appError: AppError = {
            message: 'Error al iniciar sesión',
            status: error instanceof Error && 'status' in error ? (error as any).status : undefined,
            details: error instanceof Error ? error.message : String(error),
          };
          set({ error: appError, loading: false });
        }
      },

      logoutUser: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${AUTH_ENDPOINT}/logout`, {
            method: 'POST',
            credentials: 'include'
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          set({ user: null, isAuthenticated: false, loading: false });
        } catch (error) {
          const appError: AppError = {
            message: 'Error al cerrar sesión',
            status: error instanceof Error && 'status' in error ? (error as any).status : undefined,
            details: error instanceof Error ? error.message : String(error),
          };
          set({ error: appError, loading: false });
        }
      },

      registerUser: async (userData: UserData) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${AUTH_ENDPOINT}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
          }

          const data: User = await response.json();
          set({ user: data, isAuthenticated: true, loading: false });
        } catch (error) {
          const appError: AppError = {
            message: 'Error al registrar usuario',
            status: error instanceof Error && 'status' in error ? (error as any).status : undefined,
            details: error instanceof Error ? error.message : String(error),
          };
          set({ error: appError, loading: false });
        }
      },
    }),
    { name: 'AuthStore' }
  )
);

export default useAuthStore;
