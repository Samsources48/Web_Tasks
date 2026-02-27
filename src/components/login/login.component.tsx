import React, { useState } from 'react';
import { Button, Card, Divider, Typography, Space, theme } from 'antd';
import { MdTaskAlt, MdEmail, MdLock } from 'react-icons/md';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { FormInput, FormSwitch } from '../ui';
import './login.css';
import type { LoginModel } from './models';
import type { UseFormReturn } from 'react-hook-form';

const { Title, Text, Link } = Typography;

export interface LoginUIProps {
    loginForm: UseFormReturn<LoginModel, any, LoginModel>
    onSubmit: (data: LoginModel) => void;
}

export const LoginComponent: React.FC<LoginUIProps> = ({ loginForm, onSubmit }) => {

    const { handleSubmit, control } = loginForm;
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="login-container">
            <Card className="login-card" bordered={false}>
                <div className="login-header text-center">
                    <div className="logo-icon-wrapper">
                        <MdTaskAlt className="logo-icon" />
                    </div>
                    <Title level={2} className="login-title">Welcome Back</Title>
                    <Text type="secondary" className="login-subtitle">
                        Sign in to manage your team and tasks efficiently.
                    </Text>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                    <FormInput
                        name="email"
                        control={control}
                        placeholder="you@company.com"
                        prefix={<MdEmail className="input-icon" />}
                        size="large"
                        rules={{
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
                        }}
                    />

                    <div className="password-header">
                        <Link className="forgot-password-link">Forgot password?</Link>
                    </div>

                    <FormInput
                        name="password"
                        control={control}
                        type="password"
                        placeholder="••••••••"
                        prefix={<MdLock className="input-icon" />}
                        size="large"
                        rules={{ required: 'Password is required' }}
                    />

                    <FormSwitch
                        name="rememberMe"
                        control={control}
                        label="Remember me for 30 days"
                    />

                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        block
                        className="btn-submit"
                        loading={isLoading}
                    >
                        Sign In
                    </Button>
                </form>

                <Divider className="login-divider">
                    <Text type="secondary" className="divider-text">Or continue with</Text>
                </Divider>

                <Space direction="horizontal" className="social-buttons" size="middle">
                    <Button block size="large" icon={<FaGoogle />} className="btn-social">
                        Google
                    </Button>
                    <Button block size="large" icon={<FaGithub />} className="btn-social">
                        GitHub
                    </Button>
                </Space>

                <div className="login-footer text-center">
                    <Text type="secondary">
                        Don't have an account? <Link className="signup-link">Sign up</Link>
                    </Text>
                </div>

                <div className="card-gradient-bottom"></div>
            </Card>
        </div>
    );
};
