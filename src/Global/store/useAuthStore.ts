import type { User } from '@/Api/auth/interfaces/auth.models';
import { create } from 'zustand';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,

        setAuth: (userProps: User, tokenProps: string) => {
            set({ user: userProps, token: tokenProps, isAuthenticated: true });
        },

        logout: () => {
            set({ user: null, token: null, isAuthenticated: false });
        },
    })
);
