export interface LoginModel {
    email: string;
    password: string;
    rememberMe: boolean;
}

export const LoginModelDefault = {} as LoginModel;