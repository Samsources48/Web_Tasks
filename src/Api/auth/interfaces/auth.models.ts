export interface User {
  idUser: number;
  userName: string;
  email: string;
  clerkId: string;
  idRol: string;
  roleName: string;
  activo?: boolean
}

export interface AuthResponse {
  token: string;
  expiration: string;
  user: User;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  email?: string;
  password: string;
  fullName: string;
}

export const API_AUTH = '/api'
