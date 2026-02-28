import { API_AUTH } from "../auth/interfaces/auth.models";
import { fetchClient } from "../client";
import type { SaveTasksDto, TasksDto } from "./interfaces/task.interfaces";

export const taskService = {

    createTask: async (data: SaveTasksDto): Promise<TasksDto> => {
        console.log("createTask", data)
        return fetchClient<TasksDto>(`${API_AUTH}/Tasks`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    // getProfile: async (): Promise<any> => {
    //     return fetchClient(`${API_AUTH}/Auth/profile`);
    // },
};
