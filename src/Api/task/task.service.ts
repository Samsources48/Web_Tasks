import { API_AUTH } from "../auth/interfaces/auth.models";
import { fetchClient } from "../client";
import type { SaveTasksDto, TaskDashboardDto, TasksDto } from "./interfaces/task.interfaces";

export const taskService = {

    getByIdTask: async (id: number): Promise<TasksDto> => {
        return fetchClient<TasksDto>(`${API_AUTH}/Tasks/${id}`, {
            method: 'GET',
        });
    },

    getDashboard: async (): Promise<TaskDashboardDto> => {
        return fetchClient<TaskDashboardDto>(`${API_AUTH}/Tasks/dashboard`, {
            method: 'GET',
        });
    },

    getAll: async (): Promise<TasksDto[]> => {
        return fetchClient<TasksDto[]>(`${API_AUTH}/Tasks`, {
            method: 'GET',
        });
    },

    createTask: async (data: SaveTasksDto): Promise<TasksDto> => {
        console.log("createTask", data)
        return fetchClient<TasksDto>(`${API_AUTH}/Tasks`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    updateTask: async (data: SaveTasksDto): Promise<TasksDto> => {
        return fetchClient<TasksDto>(`${API_AUTH}/Tasks`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    deleteTask: async (id: number): Promise<void> => {
        return fetchClient<void>(`${API_AUTH}/Tasks/${id}`, {
            method: 'DELETE',
        });
    }
};
