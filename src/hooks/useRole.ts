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
    
    return {
        role,
        isAdmin: role === ADMIN,
        isLoaded,
    };
};
