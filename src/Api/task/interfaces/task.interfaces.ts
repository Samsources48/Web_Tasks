export interface TasksDto {
    idTaskItem: number;
    title: string;
    description: string | null;
    priority: number;
    status: number;
    dueData: Date | string | null;
    isCompleted: boolean;
    idUser: number;
    userName: string;
}

export interface SaveTasksDto {
    idTaskItem?: number | null;
    title: string;
    description: string | null;
    priority: number;
    status: number;
    dueData: Date | string | null;
    isCompleted?: boolean | null;
    idUser?: number;
}