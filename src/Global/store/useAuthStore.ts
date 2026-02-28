import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '../../Api/auth/interfaces/auth.models';
import { AUTH_TOKEN } from '../../Api/client';


interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist((set) => ({
        user: null,
        token: null,
        isAuthenticated: false,

        setAuth: (userProps: User, tokenProps: string) => {
            localStorage.setItem(AUTH_TOKEN, tokenProps);
            set({ user: userProps, token: tokenProps, isAuthenticated: true });
        },

        logout: () => {
            localStorage.removeItem(AUTH_TOKEN);
            set({ user: null, token: null, isAuthenticated: false });
        },

    }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
