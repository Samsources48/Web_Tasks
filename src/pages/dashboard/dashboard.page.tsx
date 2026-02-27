import React from 'react';
import { Card, Table, Tag, Typography, Row, Col, Progress, Space, Button } from 'antd';
import { MdCheckCircle, MdPending, MdAutoGraph, MdWarning, MdTask } from 'react-icons/md';

const { Title, Text } = Typography;

export const DashboardPage: React.FC = () => {
    // Mock data for dashboard
    const metrics = [
        { title: 'Total Tasks', value: 142, icon: <MdTask size={24} className="text-blue-500" />, change: '+12%', color: 'border-blue-500' },
        { title: 'Completed', value: 89, icon: <MdCheckCircle size={24} className="text-green-500" />, change: '+5%', color: 'border-green-500' },
        { title: 'In Progress', value: 34, icon: <MdPending size={24} className="text-yellow-500" />, change: '-2%', color: 'border-yellow-500' },
        { title: 'Overdue', value: 19, icon: <MdWarning size={24} className="text-red-500" />, change: '+8%', color: 'border-red-500' },
    ];

    const recentTasks = [
        { id: '1', title: 'Update homepage design', status: 'In Progress', priority: 'High', assignee: 'Alex', date: '2026-03-01' },
        { id: '2', title: 'Fix login authenticator bug', status: 'Completed', priority: 'Critical', assignee: 'Sam', date: '2026-02-28' },
        { id: '3', title: 'Write API documentation', status: 'Pending', priority: 'Medium', assignee: 'Alex', date: '2026-03-05' },
        { id: '4', title: 'Server maintenance', status: 'Overdue', priority: 'High', assignee: 'Admin', date: '2026-02-25' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'success';
            case 'In Progress': return 'processing';
            case 'Pending': return 'default';
            case 'Overdue': return 'error';
            default: return 'default';
        }
    };

    const columns = [
        { title: 'Task Title', dataIndex: 'title', key: 'title', render: (text: string) => <span className="font-medium text-gray-800">{text}</span> },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (status: string) => <Tag color={getStatusColor(status)}>{status}</Tag> },
        {
            title: 'Priority', dataIndex: 'priority', key: 'priority', render: (priority: string) => (
                <Tag color={priority === 'Critical' ? 'red-inverse' : priority === 'High' ? 'volcano' : 'blue'}>{priority}</Tag>
            )
        },
        { title: 'Assignee', dataIndex: 'assignee', key: 'assignee' },
        { title: 'Due Date', dataIndex: 'date', key: 'date' },
        { title: 'Action', key: 'action', render: () => <Button type="link" size="small">View</Button> },
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-end mb-2">
                <div>
                    <Title level={3} className="mb-1! text-gray-800">Hello, Admin 👋</Title>
                    <Text className="text-gray-500">Here's what's happening with your projects today.</Text>
                </div>
                <Button type="primary" size="large" className="bg-primary hover:bg-blue-50/80 border-none shadow-md shadow-primary/20"
                    onClick={() => { }}>Create Tas fk</Button>
            </div>

            <Row gutter={[16, 16]}>
                {metrics.map((metric, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <Card bordered={false} className={`shadow-sm border-t-4 ${metric.color}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <Text className="text-gray-500 font-medium">{metric.title}</Text>
                                    <Title level={2} className="mt-1! mb-0! text-foreground">{metric.value}</Title>
                                </div>
                                <div className="p-3 rounded-lg bg-muted">{metric.icon}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-sm font-semibold ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                    {metric.change}
                                </span>
                                <Text className="text-gray-400 text-xs text-nowrap">vs last week</Text>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card title="Recent Tasks" bordered={false} className="shadow-sm overflow-hidden" bodyStyle={{ padding: 0 }}>
                        <Table
                            columns={columns}
                            dataSource={recentTasks}
                            pagination={false}
                            rowKey="id"
                            className="w-full whitespace-nowrap overflow-x-auto"
                        />
                        <div className="p-4 flex justify-end bg-muted/30 border-t border-border">
                            <Button type="link" className="font-semibold text-primary">View All Tasks</Button>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card title="Project Progress" bordered={false} className="shadow-sm h-full">
                        <Space direction="vertical" className="w-full" size="large">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <Text className="font-medium text-gray-700">Project Alpha</Text>
                                    <Text className="text-gray-500">75%</Text>
                                </div>
                                <Progress percent={75} status="active" strokeColor="#3b82f6" showInfo={false} />
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <Text className="font-medium text-gray-700">Website Redesign</Text>
                                    <Text className="text-gray-500">45%</Text>
                                </div>
                                <Progress percent={45} status="active" strokeColor="#f59e0b" showInfo={false} />
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <Text className="font-medium text-gray-700">Mobile App V2</Text>
                                    <Text className="text-gray-500">90%</Text>
                                </div>
                                <Progress percent={90} status="success" showInfo={false} />
                            </div>

                            <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                                <MdAutoGraph size={32} className="text-blue-500" />
                                <div>
                                    <Text className="block font-medium text-gray-800">Great job!</Text>
                                    <Text className="text-gray-500 text-sm block">Overall productivity is up by 15% this week.</Text>
                                </div>
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
