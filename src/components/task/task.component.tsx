import React, { useMemo } from 'react'
import { MdOutlineTask, MdArrowBack, MdCalendarToday, MdLabelOutline } from 'react-icons/md';
import { Card, Typography, Button, Input, Flex } from 'antd';
import { FormInput, FormSelect, FormDatePicker } from '@/components';
import { Controller, type Control } from 'react-hook-form';
import type { TaskFormValues } from '@/pages';
import { useNavigate } from 'react-router-dom';
import { useCategoryQueries } from '@/Api/category/category.queries';
import { usersQueries } from '@/Api/users/usersqueries';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface Props {
    isEditing?: boolean;
    isSaving?: boolean;
    isAdmin?: boolean;
    onSubmit: (data: TaskFormValues) => void;
    reset: () => void;
    control: Control<TaskFormValues>;
    handleSubmit: any;
}

export const TaskComponent = ({ isEditing, isSaving, isAdmin, onSubmit, reset, control, handleSubmit }: Props) => {

    const navigate = useNavigate();

    const { getAllCategories } = useCategoryQueries();
    const { getAllUsers } = usersQueries();

    const { data: listCategories, isLoading: isLoadingCategories } = getAllCategories;
    const { data: listUsers, isLoading: isLoadingUsers } = getAllUsers;


    const categories = useMemo(() => {
        return listCategories?.map((category) => ({
            value: category.idTaskCategory,
            label: category.nombre
        })) || [];
    }, [listCategories]);

    const users = useMemo(() => {
        return listUsers?.map((user) => ({
            value: Number(user.idUser),
            label: user.userName,
        })) || [];
    }, [listUsers]);

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <Button type="text" icon={<MdArrowBack size={20} />} className="text-gray-500 hover:text-gray-800" />
                    <div>
                        <Title level={3} className="text-gray-800 m-0!">{isEditing ? 'Edit Task' : 'Create Task'}</Title>
                        <Text className="text-gray-500">Provide task details to add it to your project board.</Text>
                    </div>
                </div>
                <div className="hidden sm:block">
                    <Button onClick={() => reset()} disabled={isSaving} loading={isSaving}>Discard changes</Button>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="shadow-sm overflow-hidden mb-6">
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

                        <Flex className='flex flex-col'>
                            <FormSelect
                                name="status"
                                control={control}
                                label="Status"
                                placeholder="Select status"
                                options={[
                                    { value: 1, label: 'To Do' },
                                    { value: 2, label: 'In Progress' },
                                    { value: 3, label: 'In Review' },
                                    { value: 4, label: 'Done' }
                                ]}
                            />

                            <FormSelect
                                name="priority"
                                control={control}
                                label="Priority"
                                placeholder="Select priority level"
                                allowClear
                                options={[
                                    { value: 1, label: 'Low - Can wait' },
                                    { value: 2, label: 'Medium - Normal' },
                                    { value: 3, label: 'High - Urgent' },
                                    { value: 4, label: 'Critical - Immediate' }
                                ]}
                            />

                        </Flex>
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

                        {isAdmin && (
                            <FormSelect
                                name="assignee"
                                control={control}
                                label="Assignee"
                                placeholder="Assign to user"
                                size="large"
                                loading={isLoadingUsers}
                                options={users}
                            />
                        )}

                        <FormSelect
                            name="idTaskCategory"
                            control={control}
                            label="Category"
                            placeholder="Select category"
                            size="large"
                            loading={isLoadingCategories}
                            options={categories}
                        />

                        <Flex gap={4}>
                            <FormDatePicker
                                name="startDate"
                                control={control}
                                label="Start Date"
                                placeholder="Select start date"
                            />

                            <FormDatePicker
                                name="endDate"
                                control={control}
                                label="End Date"
                                placeholder="Select end date"
                            />

                        </Flex>
                    </Card>
                </div>

                <div className="flex justify-end items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
                    <div className="flex gap-4">
                        <Button size="large" onClick={() => navigate('/dashboard')}>Cancel</Button>
                        <Button type="primary" htmlType="submit" size="large" loading={isSaving} className="bg-blue-600">
                            {isEditing ? 'Save Changes' : 'Save Task'}
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
}
