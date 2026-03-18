import type React from "react";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import { FcHighPriority, FcLowPriority, FcMediumPriority } from "react-icons/fc";
import { CgDanger } from "react-icons/cg";


export interface TasksDto {
    idTaskItem?: number;
    title: string;
    description: string | null;
    priority: Priority;
    status: Status;
    startDate: Date;
    endDate: Date;
    idTaskCategory?: number;
    isCompleted: boolean;
    idUser: number;
    // userName: string;
}

export interface SaveTasksDto {
    idTaskItem?: number;
    title: string;
    description?: string;
    priority: number;
    status: number;
    startDate: Date;
    endDate: Date;
    idTaskCategory?: number;
    isCompleted?: boolean;
    idUser?: number;
}

export interface TaskDashboardDto {
    totalTasks: number;
    completedTasks: number;
    inProgressTasks?: number;
    overdueTasks?: number;
}

export enum Priority {
    Low = 1,
    Medium = 2,
    High = 3,
    Critical = 4
}

export enum Status {
    ToDo = 1,
    InProgress = 2,
    InReview = 3,
    Done = 4
};


interface enumData<T> {
    value: T;
    label: string;
    color: string;
    icon?: React.ElementType;
};


export const statusData: enumData<Status>[] = [
    { value: Status.ToDo, label: 'To Do', color: 'orange', icon: ClockCircleOutlined },
    { value: Status.InProgress, label: 'In Progress', color: 'blue', icon: SyncOutlined },
    { value: Status.InReview, label: 'In Review', color: 'purple', icon: ExclamationCircleOutlined },
    { value: Status.Done, label: 'Done', color: 'green', icon: CheckCircleOutlined },
];

export const priorityData: enumData<Priority>[] = [
    { value: Priority.Low, label: 'Low', color: 'green', icon: FcLowPriority },
    { value: Priority.Medium, label: 'Medium', color: 'blue', icon: FcMediumPriority },
    { value: Priority.High, label: 'High', color: 'orange', icon: FcHighPriority },
    { value: Priority.Critical, label: 'Critical', color: 'red', icon: CgDanger },
];

// export const status = {
//     ToDo: 1,
//     InProgress: 2,
//     InReview: 3,
//     Done: 4
// } as const;

// export type status = typeof status[keyof typeof status];