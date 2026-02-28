import { useMutation } from "@tanstack/react-query"
import { taskService } from "./task.service"
import type { SaveTasksDto } from "./interfaces/task.interfaces"

export const useCreateTask = () => {

    return useMutation({
        mutationFn: (data: SaveTasksDto) =>
            taskService.createTask(data),
    })
}
