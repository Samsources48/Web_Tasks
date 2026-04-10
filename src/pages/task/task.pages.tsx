import React, { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
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
import { CloseSquareFilled } from '@ant-design/icons';
import { usersQueries } from '@/Api/users/usersqueries';
import type { UserJwt } from '@/utils';
import { useRole } from '@/hooks/useRole';


const { Title, Text } = Typography;
const { TextArea } = Input;

const taskSchema = z.object({
    title: z.string().nonempty('Task title is required'),
    description: z.string().optional(),
    status: z.number(),
    priority: z.number(),
    assignee: z.number().optional(),
    idTaskCategory: z.number().optional(),
    startDate: z.any().refine((val) => !!val, 'Start date is required'),
    endDate: z.any().refine((val) => !!val, 'End date is required'),
});


export type TaskFormValues = z.infer<typeof taskSchema>;
const InitialValuesTask = {} as TaskFormValues;


export const TaskPage = () => {

    const { isAdmin } = useRole();

    const location = useLocation();
    const navigate = useNavigate();
    const taskId = location.state?.taskId;

    const { createTask, updateTask, getByIdTask } = useTaskQueries();
    const { getByIduser } = usersQueries();

    const { data: taskById, } = getByIdTask(taskId);

    const getUserDecoded: UserJwt | null = useAuthStore.getState().user;
    const { data: dataUser } = getByIduser(getUserDecoded?.sub || "")

    const isEditing = !!taskId;

    const { control, handleSubmit, reset, formState: { errors } } = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        mode: 'onChange',
        defaultValues: InitialValuesTask
    });


    useEffect(() => {
        if (taskById) {
            reset({
                title: taskById.title || '',
                description: taskById.description || '',
                status: taskById.status,
                priority: taskById.priority,
                assignee: taskById.idUser || undefined,
                idTaskCategory: taskById.idTaskCategory || 0,
                startDate: taskById.startDate ? dayjs(taskById.startDate) : undefined,
                endDate: taskById.endDate ? dayjs(taskById.endDate) : undefined,
            });
        }
    }, [taskById, reset]);


    const isSaving = createTask.isPending || updateTask.isPending;

    const onSubmit = async (data: TaskFormValues) => {

        const payload: SaveTasksDto = {
            ...data,
            idUser: isAdmin && data.assignee ? data.assignee : dataUser!.idUser,
            idTaskCategory: data.idTaskCategory || 0,
            startDate: data.startDate && data.startDate.toDate ? data.startDate.toDate() : (data.startDate || new Date()),
            endDate: data.endDate && data.endDate.toDate ? data.endDate.toDate() : (data.endDate || new Date()),
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
                isAdmin={isAdmin}
                onSubmit={onSubmit}
                reset={reset}
                control={control}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};
