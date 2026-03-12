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
import { useAuthStore } from '../../Global/store/useAuthStore';

const { Header, Sider, Content } = Layout;

export const DashboardLayout: React.FC = () => {

    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const navigate = useNavigate();
    const location = useLocation();

    const { logout, user, isAuthenticated } = useAuthStore();

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
            onClick: () => {
                logout();
                if (isAuthenticated) navigate('/login')
            },
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
                className="shadow-2xl z-20 relative"
                theme="dark"
                width={260}
                style={{ backgroundColor: '#0f172a' }}
            >
                {/* Decorative Side Gradient */}
                <div className="absolute top-0 right-0 w-px h-full bg-linear-to-b from-transparent via-primary/30 to-transparent"></div>

                <div className="h-16 flex items-center p-4 pl-6 border-b border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    <div className="min-w-10 min-h-10 w-10 h-10 bg-linear-to-br from-primary to-orange-500 text-white flex items-center justify-center rounded-xl font-black text-xl shadow-lg shadow-primary/30 transform group-hover:scale-105 transition-transform duration-300 ring-2 ring-primary/20">
                        T
                    </div>
                    {!collapsed && (
                        <span className="ml-4 font-extrabold tracking-tight text-xl bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400 whitespace-nowrap overflow-hidden">
                            TaskMaster
                        </span>
                    )}
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={({ key }) => navigate(key)}
                    className="border-none mt-6 bg-transparent [&_.ant-menu-item]:rounded-xl! [&_.ant-menu-item]:mx-3 [&_.ant-menu-item]:my-1.5 [&_.ant-menu-item-selected]:bg-primary/10! [&_.ant-menu-item-selected]:text-primary! [&_.ant-menu-item]:transition-all [&_.ant-menu-item]:duration-300 font-medium"
                    style={{ backgroundColor: 'transparent' }}
                />
            </Sider>
            <Layout>
                <Header style={{ background: 'transparent' }} className="px-6 flex items-center justify-between backdrop-blur-xl bg-white/80 dark:bg-card/80 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] dark:shadow-none z-10 border-b border-border/50 sticky top-0 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="w-10 h-10 flex items-center justify-center -ml-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300 focus:outline-hidden ring-0"
                        >
                            <MdMenu size={24} />
                        </button>
                        <div className="hidden md:block">
                            <h2 className="text-xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 m-0 tracking-tight">Project Alpha</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* <Button type="text" shape="circle" icon={<MdOutlineNotifications size={24} />} className="text-muted-foreground hover:bg-muted" /> */}
                        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                            <div className="cursor-pointer flex items-center gap-3 bg-white dark:bg-card border border-border/50 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 pl-4 pr-1.5 py-1.5 rounded-full transition-all duration-300 group">
                                <span className="hidden sm:inline font-bold text-sm text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">{user?.userName || 'Admin User'}</span>
                                <div className="w-8 h-8 bg-linear-to-br from-primary to-orange-500 text-white rounded-full flex items-center justify-center font-bold shadow-inner ring-2 ring-white dark:ring-card group-hover:scale-105 transition-transform">
                                    {user?.userName?.[0]?.toUpperCase() || 'A'}
                                </div>
                            </div>
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
