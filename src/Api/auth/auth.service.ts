import { fetchClient } from "../client";
import { API_AUTH, type AuthResponse, type LoginRequest } from "./interfaces/auth.models";


export const authService = {

    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        console.log("hola", credentials)
        return fetchClient<AuthResponse>(`${API_AUTH}/Auth/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    // getProfile: async (): Promise<any> => {
    //     return fetchClient(`${API_AUTH}/Auth/profile`);
    // },
};
