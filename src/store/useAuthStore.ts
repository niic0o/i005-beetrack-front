import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;

  setLoading: (isLoading: boolean) => void;
  checkAuthStatus: () => Promise<void>;
  loginUser: (credentials: Credentials) => Promise<void>;
  logoutUser: () => Promise<void>;
  registerUser: (userData: UserData) => Promise<void>;
}

const useAuthStore = create<AuthState>((set, _get) => ({
  user: null,
  loading: false,
  isAuthenticated: false,

  //las acciones:

  setLoading: (isLoading: boolean) => set({ loading: isLoading }),

  checkAuthStatus: async () => {
    set({ loading: true });

    try {
      // implementar la api cuando este lista
      //const res = await api.get
      //set ({ user: res.data.user, isAuthenticated: true});
    } catch (error) {
      console.error("Error checking auth status", error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ loading: false });
    }
  },

  loginUser: async (_credentials: Credentials) => {
    set({ loading: true });
    try {
      //API
      //const res = await api.post
      //set ({user: res.data.user, isAuthenticated: true});
    } catch (error) {
      console.error("Loging error", error);
    } finally {
      set({ loading: false });
    }
  },

  logoutUser: async () => {
    set({ loading: true });
    try {
      //api
      // localStorage.removeItem('authToken');
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      set({ loading: false });
    }
  },
  registerUser: async (_userData: UserData) => {
    set({ loading: true });
    try {
      //api
      //const res = await api.post(userData);
      //set({ user: null, isAuthenticated: true})
    } catch (error) {
      console.error("Register error", error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
