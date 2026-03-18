import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Typography, Tag, Avatar, Button, Tooltip, Flex } from 'antd';
import { MdAdd, MdMoreVert, MdCalendarToday, MdOutlineAccessTime } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useTaskQueries } from '@/Api/task/task.queries';
import { priorityData, statusData } from '@/Api/task/interfaces/task.interfaces';
import { formatDate } from '@/utils';

const { Title, Text } = Typography;

export const BoardPage = () => {

    const { getAllTasks } = useTaskQueries();
    const navigate = useNavigate();

    const tasks = getAllTasks.data || [];

    // Group tasks by status
    const kanbanData = useMemo(() => {
        const todoTasks = tasks.filter(t => t.status === 1);
        const inProgressTasks = tasks.filter(t => t.status === 2);
        const inReviewTasks = tasks.filter(t => t.status === 3);
        const doneTasks = tasks.filter(t => t.status === 4);

        return {
            todoTasks,
            inProgressTasks,
            inReviewTasks,
            doneTasks
        };
    }, [tasks]);


    const columns = [
        { id: 1, title: 'To Do', items: kanbanData.todoTasks, color: 'border-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/10' },
        { id: 2, title: 'In Progress', items: kanbanData.inProgressTasks, color: 'border-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/10' },
        { id: 3, title: 'In Review', items: kanbanData.inReviewTasks, color: 'border-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/10' },
        { id: 4, title: 'Done', items: kanbanData.doneTasks, color: 'border-green-500', bg: 'bg-green-50 dark:bg-green-900/10' },
    ];

    const handleCreateTask = () => {
        navigate('/tasks');
    };

    const handleEditTask = (id: number) => {
        navigate(`/tasks`, { state: { taskId: id } });
    };

    return (
        <Flex vertical gap="middle" className="h-full min-h-[calc(100vh-140px)]">
            <Flex justify="space-between" align="flex-end" className="mb-2">
                <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 mb-1 tracking-tight">
                    Kanban Board
                </h1>
                <Text className="text-gray-500 text-sm font-medium">Track your activities and manage workflow.</Text>
                <button
                    onClick={handleCreateTask}
                    className="group relative px-5 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-primary to-orange-500 rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-primary/50 hover:-translate-y-0.5 overflow-hidden"
                >
                    <span className="flex items-center gap-2">
                        <MdAdd className="text-lg" /> Add Task
                    </span>
                    <div className="absolute inset-0 h-full w-full opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></div>
                </button>
            </Flex>

            <Row gutter={[16, 16]} className="flex-1 pb-4 overflow-x-auto">
                {columns.map((col) => (
                    <Col xs={24} md={12} xl={6} key={col.id}>
                        <Flex vertical className={`p-4 rounded-xl ring-1 ring-border/50 shadow-sm flex-1 ${col.bg}`}>
                            <Flex justify="space-between" align="center" className="mb-4 pb-2 border-b border-border/40">
                                <Flex align="center" gap="small" justify='center'>
                                    <div className={`w-3 h-3 rounded-full border-2 ${col.color} bg-white`}></div>
                                    <h3 className="font-bold text-gray-800 dark:text-gray-200">{col.title}</h3>
                                </Flex>
                                <span className="bg-white dark:bg-card px-2 py-0.5 rounded-full text-xs font-bold text-gray-500 shadow-sm ring-1 ring-border/50">
                                    {col.items.length}
                                </span>
                            </Flex>

                            <Flex vertical gap="small" className="overflow-y-auto flex-1 pr-1 pb-2 custom-scrollbar">
                                {col.items.map((task) => {
                                    const priority = priorityData.find(p => p.value === task.priority);
                                    return (
                                        <div
                                            key={task.idTaskItem}
                                            onClick={() => handleEditTask(task.idTaskItem!)}
                                            className="bg-white dark:bg-card p-4 rounded-xl shadow-sm hover:shadow-md ring-1 ring-border/40 hover:ring-primary/40 cursor-pointer transition-all duration-200 group hover:-translate-y-1 relative"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <Row className="flex-1 pr-4">
                                                    <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm leading-tight line-clamp-2">
                                                        {task.title}
                                                    </span>
                                                </Row>
                                            </div>

                                            {task.description && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                                                    {task.description}
                                                </p>
                                            )}

                                            <Flex justify="space-between" align="center" className="mt-3 pt-3 border-t border-border/30">
                                                <Flex align="center" gap="small">
                                                    {priority && (
                                                        <Tag color={priority.color} className="m-0 text-xs font-medium px-1.5 py-0.5 rounded-md">
                                                            {priority.label}
                                                        </Tag>
                                                    )}
                                                </Flex>

                                                {/* <Flex align="center" gap="small">
                                                    {task.dueData && (
                                                        <Flex align="center" gap={4} className="text-xs text-gray-500 font-medium bg-gray-50 dark:bg-gray-800/50 px-1.5 py-0.5 rounded-md">
                                                            <MdCalendarToday />
                                                            <span>{formatDate(task.dueData)}</span>
                                                        </Flex>
                                                    )}
                                                    {task.idUser && (
                                                        <Tooltip title={`User ID: ${task.idUser}`}>
                                                            <Avatar size={24} className="bg-primary/20 text-primary font-bold text-xs ring-1 ring-primary/30">
                                                                U{task.idUser}
                                                            </Avatar>
                                                        </Tooltip>
                                                    )}
                                                </Flex> */}
                                            </Flex>
                                        </div>
                                    );
                                })}

                                {col.items.length === 0 && (
                                    <Flex vertical align="center" justify="center" className="p-6 text-center border-2 border-dashed border-border/60 rounded-xl bg-card/30 mt-2">
                                        <Text className="text-gray-400 text-sm font-medium">No tasks here</Text>
                                    </Flex>
                                )}
                            </Flex>
                        </Flex>
                    </Col>
                ))}
            </Row>
        </Flex>
    );
};
