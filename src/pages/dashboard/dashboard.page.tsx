import React, { useEffect, useEffectEvent, useState } from 'react';
import { Card, Table, Tag, Typography, Row, Col, Progress, Space, Button, FloatButton, Flex, Popconfirm } from 'antd';
import { MdCheckCircle, MdPending, MdAutoGraph, MdWarning, MdTask, MdEdit, MdDelete, MdMoreVert } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useTaskQueries } from '@/Api/task/task.queries';
import type { ColumnsType } from 'antd/es/table';
import { priorityData, statusData, type Priority, type Status, type TasksDto } from '@/Api/task/interfaces/task.interfaces';
import { formatDate } from '@/utils';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const DashboardPage: React.FC = () => {

    const navigate = useNavigate();
    const { dashboard, getAllTasks, deleteTask } = useTaskQueries();

    const [tasks, setTasks] = useState<TasksDto[]>([]);


    const metrics = [
        { title: 'Total Tasks', value: dashboard.data?.totalTasks || 0, icon: <MdTask size={24} className="text-blue-500" />, change: '+12%', color: 'border-blue-500' },
        { title: 'Completed', value: dashboard.data?.completedTasks || 0, icon: <MdCheckCircle size={24} className="text-green-500" />, change: '+5%', color: 'border-green-500' },
        { title: 'In Progress', value: dashboard.data?.inProgressTasks || 0, icon: <MdPending size={24} className="text-yellow-500" />, change: '-2%', color: 'border-yellow-500' },
        { title: 'Overdue', value: dashboard.data?.overdueTasks || 0, icon: <MdWarning size={24} className="text-red-500" />, change: '+8%', color: 'border-red-500' },
    ];


    useEffect(() => {
        const mapped = getAllTasks.data?.map((task) => ({
            ...task,
        })) || [];
        setTasks(mapped);
    }, [getAllTasks.data]);


    const columns: ColumnsType<TasksDto> = [
        {
            title: 'Task Title',
            dataIndex: 'title',
            key: 'title',
            width: 200,
            render: (text: string) => <span className="font-medium text-gray-800">{text}</span>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (record) => {
                console.log("status", record?.status);
                const findStatus = statusData.find((s) => s.value === record);
                const Icon = findStatus?.icon;
                return <Tag variant='outlined' color={findStatus?.color}>
                    {Icon ? <Icon /> : null} {findStatus?.label}
                </Tag>
            }
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            width: 100,
            render: (record) => {
                const findPriority = priorityData.find((p) => p.value === record);
                const Icon = findPriority?.icon;
                return <Tag variant='outlined' color={findPriority?.color}>
                    {findPriority?.label}
                </Tag>
            }
        },
        {
            title: 'Due Date',
            dataIndex: 'dueData',
            key: 'date',
            width: 100,
            render: (record: TasksDto) => formatDate(record.dueData)
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: TasksDto) =>
                <div style={{ position: 'relative', width: '32px', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FloatButton.Group
                        trigger="hover"
                        type="primary"
                        placement="right"
                        style={{ position: 'relative', right: 0, bottom: 0, transform: 'scale(0.85)' }}
                        icon={<MdMoreVert />}
                    >
                        <FloatButton
                            icon={<MdEdit />}
                            onClick={() => handleGetByIdTask(record.idTaskItem)}
                        />

                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            onConfirm={() => handleDeleteTask(record.idTaskItem)}
                        >
                            <FloatButton
                                icon={<MdDelete />}
                            />
                        </Popconfirm>
                    </FloatButton.Group>
                </div>
        },
    ];

    const handleGetByIdTask = (idTaskItem?: number) => {
        if (!idTaskItem) return;

        navigate(`/tasks`, { state: { taskId: idTaskItem } });
    }

    const handleDeleteTask = async (idTaskIndex?: number) => {
        if (!idTaskIndex) return;

        await deleteTask.mutateAsync(idTaskIndex).then(() => {
            setTasks(tasks.filter((task) => task.idTaskItem !== idTaskIndex));
            // getAllTasks.refetch();
            dashboard.refetch();
        });
    }


    return (
        <Flex vertical gap={20}>
            <Flex justify="space-between" align="flex-end" className="mb-4">
                <div>
                    <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 mb-2 tracking-tight">
                        Hello, Admin
                    </h1>
                    <Text className="text-gray-500 text-base font-medium">Here's what's happening with your projects today.</Text>
                </div>
            </Flex>

            <Row gutter={[16, 16]}>
                {metrics.map((metric, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <div className="group relative bg-card text-card-foreground p-6 rounded-2xl shadow-md hover:shadow-xl ring-1 ring-border/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                            {/* Accent Top Border */}
                            <div className={`absolute top-0 left-0 w-full h-1 ${metric.color.replace('border-', 'bg-')} bg-opacity-80`}></div>

                            <Flex justify="space-between" align="flex-start" className="mb-6">
                                <div>
                                    <Text className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">{metric.title}</Text>
                                    <div className="text-4xl font-bold mt-2 text-foreground tracking-tight">{metric.value}</div>
                                </div>
                                <div className="p-3 rounded-2xl bg-muted/50 ring-1 ring-border/30 group-hover:scale-110 transition-transform duration-300">
                                    {metric.icon}
                                </div>
                            </Flex>
                            <Flex align="center" gap={8} className="bg-muted/30 w-max px-3 py-1.5 rounded-full ring-1 ring-border/50">
                                <span className={`text-sm font-bold ${metric.change.startsWith('+') ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                    {metric.change}
                                </span>
                                <Text className="text-muted-foreground text-xs font-medium">vs last week</Text>
                            </Flex>
                        </div>
                    </Col>
                ))}
            </Row>

            <Row gutter={[16, 16]} className="mt-4">
                <Col xs={24} lg={16}>
                    <div className="bg-card text-card-foreground rounded-2xl shadow-md ring-1 ring-border/50 overflow-hidden h-full flex flex-col transition-shadow hover:shadow-lg">
                        <div className="px-5 py-4 border-b border-border/50 bg-muted/20">
                            <h2 className="text-lg font-bold tracking-tight">Recent Tasks</h2>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={tasks}
                            pagination={false}
                            size="middle"
                            rowKey="idTaskItem"
                            className="w-full whitespace-nowrap overflow-x-auto [&_.ant-table-thead_th]:bg-muted/10 [&_.ant-table-thead_th]:text-muted-foreground [&_.ant-table-thead_th]:font-semibold [&_.ant-table-tbody_tr:hover]:bg-muted/30"
                        />

                        <Flex justify="flex-end" className="p-4 mt-2 bg-muted/10">
                            <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group">
                                {tasks.length} <span className="group-hover:translate-x-1 transition-transform">Tareas</span>
                            </button>
                        </Flex>
                    </div>
                </Col>

                <Col xs={24} lg={8}>
                    <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-md ring-1 ring-border/50 h-full transition-shadow hover:shadow-lg">
                        <h2 className="text-xl font-bold tracking-tight mb-6">Project Progress</h2>
                        <Space direction="vertical" className="w-full" size="large">
                            <div className="group">
                                <Flex justify="space-between" className="mb-2">
                                    <Text className="font-semibold text-foreground">Project Alpha</Text>
                                    <Text className="text-muted-foreground font-medium">75%</Text>
                                </Flex>
                                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-linear-to-r from-blue-500 to-indigo-500 rounded-full group-hover:from-blue-400 group-hover:to-indigo-400 transition-colors duration-300" style={{ width: '75%' }}></div>
                                </div>
                            </div>
                            <div className="group">
                                <Flex justify="space-between" className="mb-2">
                                    <Text className="font-semibold text-foreground">Website Redesign</Text>
                                    <Text className="text-muted-foreground font-medium">45%</Text>
                                </Flex>
                                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-linear-to-r from-orange-400 to-red-500 rounded-full group-hover:from-orange-300 group-hover:to-red-400 transition-colors duration-300" style={{ width: '45%' }}></div>
                                </div>
                            </div>
                            <div className="group">
                                <Flex justify="space-between" className="mb-2">
                                    <Text className="font-semibold text-foreground">Mobile App V2</Text>
                                    <Text className="text-muted-foreground font-medium">90%</Text>
                                </Flex>
                                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-linear-to-r from-emerald-400 to-emerald-600 rounded-full group-hover:from-emerald-300 group-hover:to-emerald-500 transition-colors duration-300" style={{ width: '90%' }}></div>
                                </div>
                            </div>

                            <Flex align="center" gap={16} className="mt-6 p-5 bg-linear-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl ring-1 ring-blue-500/20 transition-transform hover:-translate-y-1 duration-300">
                                <div className="p-3 bg-white dark:bg-card rounded-lg shadow-sm ring-1 ring-border/50">
                                    <MdAutoGraph size={24} className="text-blue-500" />
                                </div>
                                <div>
                                    <span className="block font-bold text-foreground text-base">Great job!</span>
                                    <span className="text-muted-foreground text-sm block mt-1">Overall productivity is up by <strong className="text-green-500">15%</strong> this week.</span>
                                </div>
                            </Flex>
                        </Space>
                    </div>
                </Col>
            </Row>
        </Flex>
    );
};
