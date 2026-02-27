import React, { useState } from 'react';
import { Layout, Menu, Button, Dropdown, Space, Avatar, theme } from 'antd';
import {
    MdDashboard,
    MdTask,
    MdPeople,
    MdSettings,
    MdMenu,
    MdOutlineNotifications,
    MdLogout
} from 'react-icons/md';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export const DashboardLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            key: '/dashboard',
            icon: <MdDashboard size={20} />,
            label: 'Dashboard',
        },
        {
            key: '/tasks',
            icon: <MdTask size={20} />,
            label: 'Tasks',
        },
        {
            key: '/users',
            icon: <MdPeople size={20} />,
            label: 'Users',
        },
        {
            key: '/settings',
            icon: <MdSettings size={20} />,
            label: 'Settings',
        }
    ];

    const userMenuItems = [
        {
            key: 'profile',
            label: 'Profile',
        },
        {
            key: 'logout',
            label: 'Logout',
            icon: <MdLogout />,
            danger: true,
            onClick: () => navigate('/login'),
        },
    ];

    return (
        <Layout className="min-h-screen">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                onBreakpoint={(broken) => setCollapsed(broken)}
                className="shadow-xl z-20"
                theme="dark"
                width={260}
            >
                <div className="h-16 flex items-center p-4 pl-6 border-b border-sidebar-border">
                    <div className="w-8 h-8 bg-primary text-white flex items-center justify-center rounded-lg font-bold text-xl shadow-lg shadow-primary/40">
                        T
                    </div>
                    {!collapsed && <span className="ml-3 font-semibold tracking-wide text-lg text-sidebar-foreground hidden sm:block">TaskMaster</span>}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={({ key }) => navigate(key)}
                    className="border-none mt-4 !bg-transparent"
                />
            </Sider>
            <Layout>
                <Header style={{ background: colorBgContainer }} className="px-6 flex items-center justify-between shadow-sm z-10 border-b border-border">
                    <div className="flex items-center gap-4">
                        <Button
                            type="text"
                            icon={<MdMenu size={24} />}
                            onClick={() => setCollapsed(!collapsed)}
                            className="w-10 h-10 flex items-center justify-center -ml-4"
                        />
                        <div className="hidden md:block">
                            <h2 className="text-xl font-bold m-0 text-foreground">Project Alpha</h2>
                            <p className="text-xs text-muted-foreground m-0">Sprint 4 Overview • Oct 24 - Nov 07</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="text" shape="circle" icon={<MdOutlineNotifications size={24} />} className="text-muted-foreground hover:bg-muted" />
                        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                            <Space className="cursor-pointer bg-muted/50 px-3 py-1.5 rounded-full border border-border transition hover:bg-muted">
                                <Avatar className="bg-primary text-primary-foreground text-sm flex items-center justify-center relative -ml-1">A</Avatar>
                                <span className="hidden sm:inline font-medium text-sm text-foreground pr-1">Admin User</span>
                            </Space>
                        </Dropdown>
                    </div>
                </Header>
                <Content className="m-4 md:m-6 mt-4 rounded-xl border border-border bg-card text-card-foreground shadow-sm flex flex-col overflow-hidden">
                    <div className="p-4 md:p-6 w-full h-full overflow-y-auto">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
