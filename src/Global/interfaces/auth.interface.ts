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