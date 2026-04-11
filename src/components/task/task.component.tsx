import React, { useMemo } from 'react'
import { MdOutlineTask, MdArrowBack, MdCalendarToday, MdLabelOutline, MdSave, MdClose } from 'react-icons/md';
import { Typography, Input, Flex, Card, Divider } from 'antd';
import { FormInput, FormSelect, FormDatePicker } from '@/components';
import { Controller, type Control } from 'react-hook-form';
import type { TaskFormValues } from '@/pages';
import { useNavigate } from 'react-router-dom';
import { useCategoryQueries } from '@/Api/category/category.queries';
import { usersQueries } from '@/Api/users/usersqueries';

const { Text, Title } = Typography;
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
            {/* Page header */}
            <Flex justify="space-between" align="center">
                <Flex align="center" gap={12}>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center w-9 h-9 rounded-xl ring-1 ring-border/50 bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 hover:-translate-x-0.5"
                    >
                        <MdArrowBack size={18} />
                    </button>
                    <Flex vertical gap={2}>
                        <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 leading-tight tracking-tight m-0">
                            {isEditing ? 'Edit Task' : 'Create Task'}
                        </h1>
                        <Text type="secondary" className="text-sm">
                            {isEditing ? 'Update task details and save changes.' : 'Fill in the details to add a new task.'}
                        </Text>
                    </Flex>
                </Flex>
                <button
                    type="button"
                    onClick={() => reset()}
                    disabled={isSaving}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground ring-1 ring-border/50 rounded-xl bg-card hover:bg-muted transition-all duration-200 disabled:opacity-50"
                >
                    <MdClose size={15} />
                    Discard
                </button>
            </Flex>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

                {/* ── 2-column layout ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">

                    {/* LEFT ── Task Details */}
                    <Card
                        bordered={false}
                        className="shadow-sm ring-1 ring-border/50 rounded-2xl! overflow-hidden"
                        styles={{ body: { padding: 24, display: 'flex', flexDirection: 'column', height: '100%' } }}
                    >
                        <Flex vertical flex={1} gap={0}>
                            <Flex align="center" gap={12}>
                                <Flex
                                    align="center" justify="center"
                                    className="w-9 h-9 rounded-xl bg-primary/10 text-primary shrink-0"
                                >
                                    <MdOutlineTask size={20} />
                                </Flex>
                                <Flex vertical gap={1}>
                                    <Title level={5} className="m-0! leading-tight">Task Details</Title>
                                    <Text type="secondary" className="text-xs">Main information and description.</Text>
                                </Flex>
                            </Flex>

                            <Divider style={{ margin: '16px 0' }} />

                            <Flex vertical gap={16} flex={1}>
                                <FormInput
                                    name="title"
                                    control={control}
                                    label="Task Title"
                                    placeholder="e.g. Update user authentication flow"
                                    size="large"
                                />

                                <Flex vertical gap={6} flex={1}>
                                    <Text strong className="text-sm">Description</Text>
                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({ field }) => (
                                            <TextArea
                                                {...field}
                                                placeholder="Add a more detailed description of the task..."
                                                style={{ resize: 'none', flex: 1, minHeight: 130 }}
                                                className="flex-1"
                                            />
                                        )}
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>

                    {/* RIGHT ── Properties + Schedule stacked */}
                    <Flex vertical gap={20}>

                        {/* Properties */}
                        <Card
                            bordered={false}
                            className="shadow-sm ring-1 ring-border/50 rounded-2xl! overflow-hidden"
                            styles={{ body: { padding: 24 } }}
                        >
                            <Flex vertical gap={0}>
                                <Flex align="center" gap={12}>
                                    <Flex
                                        align="center" justify="center"
                                        className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 shrink-0"
                                    >
                                        <MdLabelOutline size={20} />
                                    </Flex>
                                    <Flex vertical gap={1}>
                                        <Title level={5} className="m-0! leading-tight">Properties</Title>
                                        <Text type="secondary" className="text-xs">Set status and priority.</Text>
                                    </Flex>
                                </Flex>

                                <Divider style={{ margin: '16px 0' }} />

                                <div className="grid grid-cols-2 gap-x-4">
                                    <FormSelect
                                        name="status"
                                        control={control}
                                        label="Status"
                                        placeholder="Select status"
                                        size="middle"
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
                                        placeholder="Select priority"
                                        size="middle"
                                        allowClear
                                        options={[
                                            { value: 1, label: 'Low' },
                                            { value: 2, label: 'Medium' },
                                            { value: 3, label: 'High' },
                                            { value: 4, label: 'Critical' }
                                        ]}
                                    />
                                </div>
                            </Flex>
                        </Card>

                        {/* Assignment & Schedule */}
                        <Card
                            bordered={false}
                            className="shadow-sm ring-1 ring-border/50 rounded-2xl! overflow-hidden flex-1"
                            styles={{ body: { padding: 24 } }}
                        >
                            <Flex vertical gap={0}>
                                <Flex align="center" gap={12}>
                                    <Flex
                                        align="center" justify="center"
                                        className="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-500 shrink-0"
                                    >
                                        <MdCalendarToday size={18} />
                                    </Flex>
                                    <Flex vertical gap={1}>
                                        <Title level={5} className="m-0! leading-tight">Assignment & Schedule</Title>
                                        <Text type="secondary" className="text-xs">Who is doing this and when.</Text>
                                    </Flex>
                                </Flex>

                                <Divider style={{ margin: '16px 0' }} />

                                <Flex vertical gap={16}>
                                    {isAdmin && (
                                        <FormSelect
                                            name="assignee"
                                            control={control}
                                            label="Assignee"
                                            placeholder="Assign to a user"
                                            size="middle"
                                            loading={isLoadingUsers}
                                            options={users}
                                        />
                                    )}

                                    <FormSelect
                                        name="idTaskCategory"
                                        control={control}
                                        label="Category"
                                        placeholder="Select a category"
                                        size="middle"
                                        loading={isLoadingCategories}
                                        options={categories}
                                    />

                                    <div className="grid grid-cols-2 gap-x-4">
                                        <FormDatePicker
                                            name="startDate"
                                            control={control}
                                            label="Start Date"
                                            placeholder="Pick start date"
                                        />
                                        <FormDatePicker
                                            name="endDate"
                                            control={control}
                                            label="End Date"
                                            placeholder="Pick end date"
                                        />
                                    </div>
                                </Flex>
                            </Flex>
                        </Card>

                    </Flex>
                </div>

                {/* Footer actions */}
                <Card
                    bordered={false}
                    className="shadow-sm ring-1 ring-border/50 rounded-2xl! mb-4"
                    styles={{ body: { padding: '16px 20px' } }}
                >
                    <Flex justify="flex-end" gap={12}>
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="px-5 py-2.5 text-sm font-medium text-muted-foreground ring-1 ring-border/50 rounded-xl bg-card hover:bg-muted transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="group relative flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-primary to-orange-500 rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-primary/50 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden"
                        >
                            {isSaving ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Saving…
                                </>
                            ) : (
                                <>
                                    <MdSave size={16} />
                                    {isEditing ? 'Save Changes' : 'Save Task'}
                                </>
                            )}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300" />
                        </button>
                    </Flex>
                </Card>
            </form>
        </>
    )
}
