import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { Card, Typography, Button, message, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdOutlineTask, MdArrowBack, MdCalendarToday, MdLabelOutline } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/Global/store/useAuthStore';
import type { SaveTasksDto } from '@/Api/task/interfaces/task.interfaces';
import { useTaskQueries } from '@/Api/task/task.queries';
import { TaskComponent } from '@/components/task';


const { Title, Text } = Typography;
const { TextArea } = Input;

const taskSchema = z.object({

    title: z.string().nonempty('Task title is required'),
    description: z.string().optional(),
    status: z.number(),
    priority: z.number(),
    assignee: z.number().optional(),
    dueData: z.any().optional(),
});


export type TaskFormValues = z.infer<typeof taskSchema>;
const InitialValuesTask = {} as TaskFormValues;


export const TaskPage = () => {

    const userId = useAuthStore((state) => state.user?.idUser);

    const location = useLocation();
    const navigate = useNavigate();

    const taskId = location.state?.taskId;

    const { createTask, updateTask, getByIdTask } = useTaskQueries();

    const { data: taskById } = getByIdTask(taskId);

    const isEditing = !!taskId;

    const { control, handleSubmit, reset, formState: { errors }
    } = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        mode: 'onChange',
        defaultValues: InitialValuesTask
    });


    useEffect(() => {
        if (taskById) {
            reset({
                title: taskById.title,
                description: taskById.description || '',
                status: taskById.status,
                priority: taskById.priority,
                assignee: taskById.idUser || undefined,
                dueData: taskById.dueData ? dayjs(taskById.dueData) : undefined,
            });
        }
    }, [taskById, reset]);


    const isSaving = createTask.isPending || updateTask.isPending;

    const onSubmit = async (data: TaskFormValues) => {

        const payload: SaveTasksDto = {
            ...data,
            idUser: Number(userId!),
            priority: data.priority,
            status: data.status || 1,
            dueData: data.dueData && data.dueData.toDate ? data.dueData.toDate() : (data.dueData || new Date()),
        };

        if (isEditing) {
            payload.idTaskItem = taskId;
            await updateTask.mutateAsync(payload);
            reset();
            navigate('/tasks');
        } else {
            await createTask.mutateAsync(payload);
            reset();
            navigate('/tasks');
        }
    };

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <TaskComponent
                isEditing={isEditing}
                isSaving={isSaving}
                onSubmit={onSubmit}
                reset={reset}
                control={control}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};
