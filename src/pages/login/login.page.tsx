import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginComponent } from '../../components/login/login.component';
import { message, notification } from 'antd';
import { LoginModelDefault, type LoginModel } from '../../components/login/models';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../Api/auth/auth.queries';

const loginSchema = z.object({
    email: z.string().email('Invalid email format').nonempty('Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long').nonempty('Password is required'),
    rememberMe: z.boolean(),
});


export const LoginPage: React.FC = () => {

    const navigate = useNavigate();

    const { data, isError, isSuccess, error, mutateAsync: triggerLogin } = useLoginMutation();
    console.log("data", data)

    const loginForm = useForm<LoginModel>({
        defaultValues: LoginModelDefault,
        // resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginModel) => {
        try {
            
            await triggerLogin(data);
            message.success(`Bienvenido ${data.userName} !`);
            navigate('/dashboard');

        } catch (error) {
            console.error(error)
            message.error("Error al iniciar sesión")
        }

    };


    return (
        <LoginComponent
            loginForm={loginForm}
            onSubmit={onSubmit}
            isLoading={isSuccess}
        />
    );
};
