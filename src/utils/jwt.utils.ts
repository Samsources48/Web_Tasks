import type { JwtPayload, UserJwt } from '@/Global/interfaces/auth.interface';
import { jwtDecode } from 'jwt-decode'

export const decodeJwt = (token: string): JwtPayload | null => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
};

export const extractUserFromJwt = (token: string): UserJwt | null => {
    const payload = decodeJwt(token);
    if (!payload) return null;

    const datauser: UserJwt = {
        email: payload.email || '',
        name: payload.name || '',
        sub: payload.sub || payload.identifier || '',
        // idRol: payload.RoleId || '',
        // roleName: payload.RoleName || '',
    }

    return datauser;
};