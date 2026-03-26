import { ENVIROMENTS } from "../enviroments/enviroments";

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

    const url = `${endpoint}`;

    let token = null;
    try {
        console.log("Attempting to get token from Clerk...");
        token = await window.Clerk?.session?.getToken({ template: 'jwt-task-api'});
        console.log("Token retrieved string length: ", token ? token.length : 0);
        console.log("token", token)
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
