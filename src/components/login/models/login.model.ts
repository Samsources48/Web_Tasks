export interface LoginModel {
    userName: string;
    password: string;
    rememberMe?: boolean;
}

export const LoginModelDefault = {} as LoginModel;