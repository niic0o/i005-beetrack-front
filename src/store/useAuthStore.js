import { create } from 'zustand';


const useAuthStore = create((set, get) => ({
    user: null,
    loading: false,
    isAuthenticated: false,


    //las acciones:

    setLoading: (isLoading) => set({ loading: isLoading }),

    checkAuthStatus: async () => {
        set({ loading: true });

        try {
            // implementar la api cuando este lista

            //const res = await api.get
            //set ({ user: res.data.user, isAuthenticated: true});
        } catch (error) {
            console.error('Error checking auth status', error);
            set({ user: null, isAuthenticated: false })
        } finally {
            set({ loading: false })
        }
    },

    loginUser: async (credentials) => {
        set({ loading: true });
        try {
            //API
            //const res = await api.post
            //set ({user: res.data.user, isAuthenticated: true});
        } catch (error) {
            console.error('Loging error', error);
        } finally {
            set({ loading: false });
        }
    },

    logoutUser: async () => {
        set({ loading: true });
        try {
            //api
            set({ user: null, isAuthenticated: false })

        } catch (error) {
            console.error('Logout error', error)
        } finally {
            set({ loading: false });
        }
    },
    registerUser: async (userData) => {
        set({ loading: true });
        try {
            //api
            //const res = await api.post(userData);
            //set({ user: res.data.user, isAthenticated: true}) no se is dejar el authenticated false, asi despues de registrarse tiene que logearse

        } catch (error) {
            console.error('Register error', error);
        } finally {
            set({ loading: false });
        }
    }
}));

export default useAuthStore;