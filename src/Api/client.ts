import { extractUserFromJwt } from "@/utils/jwt.utils";
import { ENVIROMENTS } from "../enviroments/enviroments";
import { useAuthStore } from "@/Global/store/useAuthStore";
import { useAuth } from "@clerk/clerk-react";

interface FetchOptions extends RequestInit {
    params?: Record<string, string>;
};

declare global {
    interface Window {
        Clerk?: any;
    }
}

export const fetchClient = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {

    const { params, ...customConfig } = options;

    let url = `${endpoint}`;
    if (params && Object.keys(params).length > 0) {
        const queryString = new URLSearchParams(params).toString();
        url = `${url}?${queryString}`;
    }

    let token = null;
    try {
        token = await window.Clerk?.session?.getToken({ template: 'jwt-task-api' });

        const convertToken = extractUserFromJwt(token);
        localStorage.setItem('user', JSON.stringify(convertToken));

        useAuthStore.getState().setCredentials(convertToken!);

    } catch (error) {
        console.warn('Could not fetch Clerk token', error);
    }

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...customConfig.headers,
    };

    const config: RequestInit = {
        ...customConfig,
        headers,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Something went wrong');
    }

    // Handle empty responses
    if (response.status === 204) return {} as T;

    return response.json();
};
