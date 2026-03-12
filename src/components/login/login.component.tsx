import React, { useState } from 'react';
import { Divider, Typography, Space } from 'antd';
import { MdTaskAlt, MdEmail, MdLock } from 'react-icons/md';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { FormInput, FormSwitch } from '../ui';
import type { LoginModel } from './models';
import type { UseFormReturn } from 'react-hook-form';

const { Text, Link } = Typography;

export interface LoginUIProps {
    loginForm: UseFormReturn<LoginModel, any, LoginModel>
    onSubmit: (data: LoginModel) => void;
    isLoading: boolean;
}

export const LoginComponent = ({ loginForm, onSubmit, isLoading }: LoginUIProps) => {

    const { handleSubmit, control } = loginForm;

    return (
        <div className="min-h-screen grow flex items-center justify-center bg-gray-50 dark:bg-slate-900 relative overflow-hidden px-4">
            {/* Background Decorations */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse hidden md:block"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse hidden md:block delay-1000"></div>

            <div className="w-full max-w-md bg-white dark:bg-card/80 backdrop-blur-xl border border-gray-100 dark:border-border/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-black/20 overflow-hidden relative transition-all duration-300">
                {/* Decorative Top Line */}
                <div className="h-1.5 w-full bg-linear-to-r from-blue-500 via-primary to-orange-500 absolute top-0 left-0"></div>

                <div className="p-8 sm:p-10">
                    <div className="text-center mb-8">
                        <div className="mx-auto w-14 h-14 bg-linear-to-br from-gray-900 to-gray-700 dark:from-gray-800 dark:to-gray-950 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-105 duration-300 mb-6">
                            <MdTaskAlt className="text-3xl text-primary drop-shadow-md" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Welcome Back</h2>
                        <p className="text-gray-500 dark:text-muted-foreground text-sm font-medium">
                            Sign in to manage your team and tasks efficiently.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-5">
                            <FormInput
                                name="userName"
                                control={control}
                                placeholder="you@company.com"
                                prefix={<MdEmail className="text-gray-400 text-lg" />}
                                size="large"
                            />

                            <div>
                                <div className="flex justify-between items-center mb-1.5 px-1">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden">Password</label>
                                    <Link className="text-sm font-semibold text-primary hover:text-orange-600 transition-colors ml-auto">
                                        Forgot password?
                                    </Link>
                                </div>
                                <FormInput
                                    name="password"
                                    control={control}
                                    type="password"
                                    placeholder="••••••••"
                                    prefix={<MdLock className="text-gray-400 text-lg" />}
                                    size="large"
                                    rules={{ required: 'Password is required' }}
                                />
                            </div>
                        </div>

                        <div className="pt-2 [&_label]:text-sm [&_label]:font-medium [&_label]:text-gray-600 dark:[&_label]:text-gray-300">
                            <FormSwitch
                                name="rememberMe"
                                control={control}
                                label="Remember me for 30 days"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full relative group overflow-hidden bg-linear-to-r from-primary to-orange-500 text-white font-bold text-lg rounded-xl h-14 shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 flex items-center justify-center"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {isLoading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : 'Sign In'}
                            </span>
                            <div className="absolute inset-0 h-full w-full opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></div>
                        </button>
                    </form>

                    <Divider className="my-8 before:border-gray-200 after:border-gray-200 dark:before:border-border/50 dark:after:border-border/50">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Or continue with</span>
                    </Divider>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white dark:bg-transparent dark:hover:bg-muted border border-gray-200 dark:border-border hover:border-gray-300 dark:hover:border-border font-medium text-gray-600 dark:text-gray-300 rounded-xl transition-all hover:bg-gray-50 hover:shadow-sm">
                            <FaGoogle className="text-red-500 text-lg" />
                            <span>Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white dark:bg-transparent dark:hover:bg-muted border border-gray-200 dark:border-border hover:border-gray-300 dark:hover:border-border font-medium text-gray-600 dark:text-gray-300 rounded-xl transition-all hover:bg-gray-50 hover:shadow-sm">
                            <FaGithub className="text-gray-800 dark:text-white text-lg" />
                            <span>GitHub</span>
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <Text className="text-gray-500 dark:text-muted-foreground font-medium">
                            Don't have an account?{' '}
                            <Link className="text-primary font-bold hover:text-orange-600 transition-colors">
                                Sign up
                            </Link>
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
};
