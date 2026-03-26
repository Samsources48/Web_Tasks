import { jwtDecode } from 'jwt-decode'

export interface UserJwt {
    id?: string;
    email: string;
    sub: string;
    name: string;
    roleName?: string;
    idRol?: string;
}

export interface JwtPayload {
    sub?: string;
    identifier?: string;
    email?: string;
    name?: string;
    role?: string | string[];
    roles?: string[];
    exp?: number;
    iat?: number;
    [key: string]: unknown;
}

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