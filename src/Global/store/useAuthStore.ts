import { create } from 'zustand';
import type { UserJwt } from '../interfaces/auth.interface';

interface AuthState {
    user: UserJwt | null;
    token: string | null;
    isAuthenticated: boolean;
    setAuth: (user: UserJwt, token: string) => void;
    setCredentials: (user: UserJwt) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,

        setAuth: (userProps: UserJwt, tokenProps: string) => {
            set({ user: userProps, token: tokenProps, isAuthenticated: true });
        },

        setCredentials: (userProps: UserJwt) => {
            set({ user: userProps })
        },

        logout: () => {
            set({ user: null, token: null, isAuthenticated: false });
        },
    })
);
