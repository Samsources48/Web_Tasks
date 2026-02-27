import React from 'react';
import { Typography, Divider, Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, FormSelect, FormSwitch } from '../../components/ui';
import { MdPersonAdd, MdEmail, MdLock, MdShield, MdPeople } from 'react-icons/md';

const { Title, Text } = Typography;

const userSchema = z.object({
    firstName: z.string().nonempty('First name is required'),
    lastName: z.string().nonempty('Last name is required'),
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.string().nonempty('Role is required'),
    department: z.string().nonempty('Department is required'),
    sendWelcomeEmail: z.boolean(),
    requirePasswordChange: z.boolean(),
});

type UserFormValues = z.infer<typeof userSchema>;

export const UserCreationPage: React.FC = () => {
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            sendWelcomeEmail: true,
            requirePasswordChange: true,
        }
    });

    const onSubmit = async (data: UserFormValues) => {
        console.log('User created:', data);
        message.success(`User ${data.firstName} ${data.lastName} created successfully.`);
    };

    return (
        <div className="max-w-6xl mx-auto bg-card rounded-2xl shadow-lg border border-border overflow-hidden flex flex-col md:flex-row min-h-[700px]">
            {/* Left Side - Dark Banner */}
            <div className="md:w-5/12 bg-slate-900 p-10 text-white flex flex-col justify-center relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/40">
                            <span className="font-bold text-white text-xl">T</span>
                        </div>
                        <span className="font-bold text-xl tracking-wide">TaskMaster Pro</span>
                    </div>

                    <h2 className="text-4xl font-bold leading-tight mb-6">
                        Empower your team with the right tools.
                    </h2>

                    <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                        Streamline project management by assigning clear roles and responsibilities. Build your organization's hierarchy with precision and ease.
                    </p>

                    <div className="space-y-4">
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex gap-4 items-start backdrop-blur-sm">
                            <MdShield className="text-primary mt-1" size={24} />
                            <div>
                                <h4 className="font-semibold text-white mb-1">Secure Access Control</h4>
                                <p className="text-slate-400 text-sm">Granular permissions for every role.</p>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex gap-4 items-start backdrop-blur-sm">
                            <MdPeople className="text-primary mt-1" size={24} />
                            <div>
                                <h4 className="font-semibold text-white mb-1">Team Collaboration</h4>
                                <p className="text-slate-400 text-sm">Connect members seamlessly.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto relative z-10 pt-10">
                    <p className="text-slate-500 text-sm">© 2026 TaskMaster Enterprise Systems. All rights reserved.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="md:w-7/12 p-10 bg-card overflow-y-auto">
                <div className="mb-8">
                    <Title level={2} className="m-0! text-foreground">Create New User</Title>
                    <Text className="text-muted-foreground">Enter the user details below to register them into the system.</Text>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div>
                        <div className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                            <MdPersonAdd size={18} className="text-primary" /> Personal Information
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormInput
                                name="firstName"
                                control={control}
                                label="First Name"
                                placeholder="e.g. John"
                                size="large"
                            />
                            <FormInput
                                name="lastName"
                                control={control}
                                label="Last Name"
                                placeholder="e.g. Doe"
                                size="large"
                            />
                        </div>
                        <div className="mt-4">
                            <FormInput
                                name="email"
                                control={control}
                                label="Email Address"
                                placeholder="john.doe@company.com"
                                prefix={<MdEmail className="text-gray-400" />}
                                size="large"
                            />
                        </div>
                    </div>

                    <Divider className="my-2 border-border" />

                    <div>
                        <div className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                            <MdLock size={18} className="text-primary" /> Security & Role
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <FormSelect
                                name="role"
                                control={control}
                                label="Assign Role"
                                placeholder="Select a role"
                                size="large"
                                options={[
                                    { value: 'admin', label: 'Administrator' },
                                    { value: 'manager', label: 'Project Manager' },
                                    { value: 'developer', label: 'Developer' },
                                    { value: 'viewer', label: 'Viewer' },
                                ]}
                            />
                            <FormSelect
                                name="department"
                                control={control}
                                label="Department"
                                placeholder="Select a department"
                                size="large"
                                options={[
                                    { value: 'engineering', label: 'Engineering' },
                                    { value: 'design', label: 'Design' },
                                    { value: 'marketing', label: 'Marketing' },
                                    { value: 'hr', label: 'HR' },
                                ]}
                            />
                        </div>

                        <FormInput
                            name="password"
                            control={control}
                            type="password"
                            label="Temporary Password"
                            placeholder="••••••••"
                            prefix={<MdLock className="text-gray-400" />}
                            size="large"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/50 rounded-xl border border-border">
                        <FormSwitch
                            name="sendWelcomeEmail"
                            control={control}
                            label="Send email invitation"
                        />
                        <FormSwitch
                            name="requirePasswordChange"
                            control={control}
                            label="Require password reset"
                        />
                    </div>

                    <div className="mt-6 flex flex-col gap-4">
                        <Button type="primary" htmlType="submit" size="large" loading={isSubmitting} className="w-full h-12 text-lg shadow-md shadow-primary/20">
                            Create User
                        </Button>
                        <p className="text-center text-sm text-muted-foreground mt-2">
                            Need to manage existing users? <span className="text-primary font-semibold cursor-pointer hover:underline">View Directory</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
