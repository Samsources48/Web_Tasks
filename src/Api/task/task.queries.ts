import { useMutation, useQuery } from "@tanstack/react-query"
import { taskService } from "./task.service"
import type { SaveTasksDto } from "./interfaces/task.interfaces"
import { message } from "antd"

export const useTaskQueries = () => {

    const createTask = useMutation({
        mutationFn: taskService.createTask,
        onSuccess: () => {
            message.success('Task created successfully');
        },
        onError: () => {
            message.error('Task created failed');
        }
    });

    const updateTask = useMutation({
        mutationFn: taskService.updateTask,
        onSuccess: () => {
            message.success('Task updated successfully');
        },
        onError: () => {
            message.error('Task update failed');
        }
    });

    const dashboard = (idUser: number) => useQuery({
        queryKey: ['tasks'],
        queryFn: () => taskService.getDashboard(idUser),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });

    const getAllTasks = (idUser: number) => useQuery({
        queryKey: ['tasks-all'],
        queryFn: () => taskService.getAll(idUser),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });

    const getByIdTask = (id?: number) => useQuery({
        queryKey: ['tasks-id', id],
        queryFn: () => taskService.getByIdTask(id!),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        enabled: !!id,
    });

    const deleteTask = useMutation({
        mutationFn: taskService.deleteTask,
        onSuccess: () => {
            message.success('Task deleted successfully');
        },
        onError: () => {
            message.error('Task delete failed');
        }
    });

    return {
        createTask,
        updateTask,
        dashboard,
        getAllTasks,
        getByIdTask,
        deleteTask
    }
}
