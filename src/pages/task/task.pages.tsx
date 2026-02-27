import React from 'react';
import { Card, Typography, Button, message, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, FormSelect, FormDatePicker } from '../../components/ui';
import { MdOutlineTask, MdArrowBack, MdCalendarToday, MdLabelOutline } from 'react-icons/md';

const { Title, Text } = Typography;
const { TextArea } = Input;

const taskSchema = z.object({
    title: z.string().nonempty('Task title is required'),
    description: z.string().optional(),
    status: z.string().nonempty('Status is required'),
    priority: z.string().nonempty('Priority is required'),
    assignee: z.string().optional(),
    dueDate: z.any().optional(), // Using any since Date types with react-hook-form/antd can be complex 
    tags: z.string().optional()
});

type TaskFormValues = z.infer<typeof taskSchema>;

export const TaskPage: React.FC = () => {
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            status: 'todo',
            priority: 'medium',
        }
    });

    const onSubmit = async (data: TaskFormValues) => {
        console.log('Task submitted:', data);
        message.success(`Task "${data.title}" saved successfully.`);
        // API Call here...
    };

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <Button type="text" icon={<MdArrowBack size={20} />} className="text-gray-500 hover:text-gray-800" />
                    <div>
                        <Title level={3} className="text-gray-800 m-0!">Create Task</Title>
                        <Text className="text-gray-500">Provide task details to add it to your project board.</Text>
                    </div>
                </div>
                <div className="hidden sm:block">
                    <Button>Discard changes</Button>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Card bordered={false} className="shadow-sm overflow-hidden mb-6">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <MdOutlineTask size={24} />
                        </div>
                        <div>
                            <Title level={4} className="m-0!">Task Details</Title>
                            <Text type="secondary" className="text-sm">Main task information and description.</Text>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <FormInput
                            name="title"
                            control={control}
                            label="Task Title"
                            placeholder="e.g. Update user authentication flow"
                            size="large"
                        />

                        <div>
                            <span className="block mb-2 font-medium text-gray-700">Description</span>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextArea
                                        {...field}
                                        placeholder="Add a more detailed description..."
                                        rows={5}
                                        className="text-base rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    />
                                )}
                            />
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card bordered={false} className="shadow-sm overflow-hidden h-full">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                            <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                                <MdLabelOutline size={24} />
                            </div>
                            <div>
                                <Title level={4} className="m-0!">Properties</Title>
                                <Text type="secondary" className="text-sm">Set status, priority and tags.</Text>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <FormSelect
                                name="status"
                                control={control}
                                label="Status"
                                placeholder="Select status"
                                size="large"
                                options={[
                                    { value: 'todo', label: 'To Do' },
                                    { value: 'in_progress', label: 'In Progress' },
                                    { value: 'in_review', label: 'In Review' },
                                    { value: 'done', label: 'Done' }
                                ]}
                            />

                            <FormSelect
                                name="priority"
                                control={control}
                                label="Priority"
                                placeholder="Select priority level"
                                size="large"
                                options={[
                                    { value: 'low', label: 'Low - Can wait' },
                                    { value: 'medium', label: 'Medium - Normal' },
                                    { value: 'high', label: 'High - Urgent' },
                                    { value: 'critical', label: 'Critical - Immediate' }
                                ]}
                            />

                            <FormInput
                                name="tags"
                                control={control}
                                label="Tags"
                                placeholder="e.g. frontend, bug (comma separated)"
                                size="large"
                            />
                        </div>
                    </Card>

                    <Card bordered={false} className="shadow-sm overflow-hidden h-full">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                            <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                <MdCalendarToday size={24} />
                            </div>
                            <div>
                                <Title level={4} className="m-0!">Assignment & Schedule</Title>
                                <Text type="secondary" className="text-sm">Who is doing this and when is it due?</Text>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <FormSelect
                                name="assignee"
                                control={control}
                                label="Assignee"
                                placeholder="Assign to a team member..."
                                size="large"
                                options={[
                                    { value: 'unassigned', label: 'Unassigned' },
                                    { value: 'user1', label: 'Alice Smith' },
                                    { value: 'user2', label: 'Bob Jones' },
                                    { value: 'user3', label: 'Charlie Brown' }
                                ]}
                            />

                            <FormDatePicker
                                name="dueDate"
                                control={control}
                                label="Due Date"
                                placeholder="Select deadline date"
                                size="large"
                                className="w-full"
                            />
                        </div>
                    </Card>
                </div>

                <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
                    <Button size="large" className="text-red-500 hover:text-red-600 hover:bg-red-50 border-none">Delete Task</Button>
                    <div className="flex gap-4">
                        <Button size="large">Cancel</Button>
                        <Button type="primary" htmlType="submit" size="large" loading={isSubmitting} className="bg-blue-600">
                            Save Task
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
