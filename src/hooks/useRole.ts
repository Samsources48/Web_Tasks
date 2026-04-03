import { useUser } from '@clerk/clerk-react';

export type UserRole = 'admin' | 'user';
const ADMIN = 'admin';
const USER = 'user';

interface useMetaData {
    role: UserRole;
    isAdmin: boolean;
    isLoaded: boolean;
}

export const useRole = (): useMetaData => {

    const { user, isLoaded } = useUser();
    const role = (user?.publicMetadata?.role as UserRole) ?? USER;
    console.log("role", role);
    return {
        role,
        isAdmin: role === ADMIN,
        isLoaded,
    };
};
