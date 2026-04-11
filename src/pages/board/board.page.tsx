import React, { useMemo } from 'react';
import { Typography, Tag, Flex } from 'antd';
import { MdAdd, MdCalendarToday, MdOutlineCheckCircle, MdOutlineHourglassEmpty, MdOutlineSync, MdOutlineRateReview } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useTaskQueries } from '@/Api/task/task.queries';
import { priorityData } from '@/Api/task/interfaces/task.interfaces';
import { formatDate } from '@/utils';
import { useUserStore } from '@/Global/store/useUserStore';

const { Text } = Typography;

const columnConfig = [
    {
        id: 1,
        title: 'To Do',
        icon: MdOutlineHourglassEmpty,
        accent: '#3b82f6',
        accentLight: 'rgba(59,130,246,0.08)',
        accentDark: 'rgba(59,130,246,0.12)',
        tagClass: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-700',
        barClass: 'bg-blue-500',
    },
    {
        id: 2,
        title: 'In Progress',
        icon: MdOutlineSync,
        accent: '#f59e0b',
        accentLight: 'rgba(245,158,11,0.08)',
        accentDark: 'rgba(245,158,11,0.12)',
        tagClass: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-700',
        barClass: 'bg-amber-400',
    },
    {
        id: 3,
        title: 'In Review',
        icon: MdOutlineRateReview,
        accent: '#a855f7',
        accentLight: 'rgba(168,85,247,0.08)',
        accentDark: 'rgba(168,85,247,0.12)',
        tagClass: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 ring-1 ring-purple-200 dark:ring-purple-700',
        barClass: 'bg-purple-500',
    },
    {
        id: 4,
        title: 'Done',
        icon: MdOutlineCheckCircle,
        accent: '#22c55e',
        accentLight: 'rgba(34,197,94,0.08)',
        accentDark: 'rgba(34,197,94,0.12)',
        tagClass: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 ring-1 ring-green-200 dark:ring-green-700',
        barClass: 'bg-green-500',
    },
];

const priorityLeftBorder: Record<number, string> = {
    1: 'border-l-green-400',
    2: 'border-l-blue-400',
    3: 'border-l-orange-400',
    4: 'border-l-red-500',
};

export const BoardPage = () => {
    
    const { getAllTasks } = useTaskQueries();
    const navigate = useNavigate();
    const idUserStore = useUserStore.getState().idUser;
    const tasks = getAllTasks(idUserStore).data || [];

    const kanbanData = useMemo(() => ({
        1: tasks.filter(t => t.status === 1),
        2: tasks.filter(t => t.status === 2),
        3: tasks.filter(t => t.status === 3),
        4: tasks.filter(t => t.status === 4),
    }), [tasks]);

    const totalTasks = tasks.length;

    return (
        <Flex vertical gap="large" className="h-full min-h-[calc(100vh-140px)]">

            {/* Header */}
            <Flex justify="space-between" align="flex-end">
                <Flex vertical gap={4}>
                    <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-400 tracking-tight leading-tight">
                        Kanban Board
                    </h1>
                    <Text className="text-muted-foreground text-sm font-medium">
                        {totalTasks} task{totalTasks !== 1 ? 's' : ''} across all stages
                    </Text>
                </Flex>

                <button
                    onClick={() => navigate('/tasks')}
                    className="group relative px-5 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-primary to-orange-500 rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-primary/50 hover:-translate-y-0.5 overflow-hidden"
                >
                    <span className="flex items-center gap-2">
                        <MdAdd className="text-lg" /> New Task
                    </span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300" />
                </button>
            </Flex>

            {/* Board columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 flex-1 pb-4 overflow-x-auto items-start">
                {columnConfig.map((col) => {
                    const colTasks = kanbanData[col.id as keyof typeof kanbanData];
                    const ColIcon = col.icon;

                    return (
                        <div
                            key={col.id}
                            className="flex flex-col rounded-2xl overflow-hidden ring-1 ring-border/50 shadow-sm"
                            style={{ background: `var(--color-card, #fff)` }}
                        >
                            {/* Colored top bar */}
                            <div className="h-1 w-full" style={{ background: col.accent }} />

                            {/* Column header */}
                            <div className="px-4 pt-4 pb-3">
                                <Flex justify="space-between" align="center">
                                    <Flex align="center" gap={8}>
                                        <span
                                            className="flex items-center justify-center w-7 h-7 rounded-lg"
                                            style={{ background: col.accentLight, color: col.accent }}
                                        >
                                            <ColIcon size={16} />
                                        </span>
                                        <span className="font-bold text-sm text-foreground">{col.title}</span>
                                    </Flex>
                                    <span
                                        className="min-w-[22px] h-[22px] flex items-center justify-center rounded-full text-xs font-bold px-1.5"
                                        style={{
                                            background: col.accentLight,
                                            color: col.accent,
                                        }}
                                    >
                                        {colTasks.length}
                                    </span>
                                </Flex>

                                {/* Progress bar */}
                                {totalTasks > 0 && (
                                    <div className="mt-3 h-1 rounded-full bg-border/50 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${col.barClass}`}
                                            style={{ width: `${(colTasks.length / totalTasks) * 100}%` }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Tasks list */}
                            <div className="flex flex-col gap-2.5 px-3 pb-4 overflow-y-auto flex-1 max-h-[calc(100vh-320px)] custom-scrollbar">
                                {colTasks.map((task) => {
                                    const priority = priorityData.find(p => p.value === task.priority);
                                    const PriorityIcon = priority?.icon;
                                    const borderColor = priorityLeftBorder[task.priority] ?? 'border-l-gray-300';

                                    return (
                                        <div
                                            key={task.idTaskItem}
                                            onClick={() => navigate('/tasks', { state: { taskId: task.idTaskItem } })}
                                            className={`bg-white dark:bg-card/80 rounded-xl shadow-xs hover:shadow-md ring-1 ring-border/40 hover:ring-primary/30 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 border-l-[3px] ${borderColor} p-3.5 group`}
                                        >
                                            {/* Title */}
                                            <p className="font-semibold text-sm text-foreground leading-snug line-clamp-2 mb-1 group-hover:text-primary transition-colors duration-200">
                                                {task.title}
                                            </p>

                                            {/* Description */}
                                            {task.description && (
                                                <p className="text-xs text-muted-foreground line-clamp-2 mb-2.5 leading-relaxed">
                                                    {task.description}
                                                </p>
                                            )}

                                            {/* Footer */}
                                            <Flex justify="space-between" align="center" className="mt-2 pt-2 border-t border-border/30">
                                                {priority && (
                                                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${col.tagClass}`}>
                                                        {PriorityIcon && <PriorityIcon size={11} />}
                                                        {priority.label}
                                                    </span>
                                                )}

                                                {task.endDate && (
                                                    <Flex align="center" gap={4} className="text-xs text-muted-foreground">
                                                        <MdCalendarToday size={11} />
                                                        <span>{formatDate(task.endDate)}</span>
                                                    </Flex>
                                                )}
                                            </Flex>
                                        </div>
                                    );
                                })}

                                {/* Empty state */}
                                {colTasks.length === 0 && (
                                    <Flex
                                        vertical align="center" justify="center"
                                        className="py-8 px-4 text-center border-2 border-dashed border-border/40 rounded-xl mt-1"
                                        style={{ background: col.accentLight }}
                                    >
                                        <span style={{ color: col.accent, opacity: 0.5 }}>
                                            <ColIcon size={28} />
                                        </span>
                                        <Text className="text-muted-foreground text-xs font-medium mt-2">
                                            No tasks yet
                                        </Text>
                                    </Flex>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Flex>
    );
};
