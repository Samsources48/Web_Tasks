import { ENVIROMENTS } from "../enviroments/enviroments";

interface FetchOptions extends RequestInit {
    params?: Record<string, string>;
};

export const AUTH_TOKEN = 'auth_token';

export const fetchClient = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {

    const { params, ...customConfig } = options;

    const url = `${endpoint}`;

    const token = localStorage.getItem(AUTH_TOKEN);

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
