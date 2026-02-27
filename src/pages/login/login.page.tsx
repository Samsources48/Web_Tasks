import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginComponent } from '../../components/login/login.component';
import { message } from 'antd';
import { LoginModelDefault, type LoginModel } from '../../components/login/models';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
    email: z.string().email('Invalid email format').nonempty('Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long').nonempty('Password is required'),
    rememberMe: z.boolean(),
});


export const LoginPage: React.FC = () => {

    const navigate = useNavigate();

    const loginForm = useForm<LoginModel>({
        defaultValues: LoginModelDefault,
        // resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: any) => {
        console.log('Login credentials:', data);
        message.success(`Welcome back! Logged in with ${data.email}`);

        // Aquí iría la lógica de mutación con React Query
        // Ej: loginMutation.mutate(data);
        navigate('/dashboard');
    };

    return (
        <LoginComponent
            loginForm={loginForm}
            onSubmit={onSubmit}
        />
    );
};
