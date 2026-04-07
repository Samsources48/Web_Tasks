import React, { useState } from 'react';
import { Badge, Dropdown, Layout, Menu, theme } from 'antd';
import { UserButton } from '@clerk/clerk-react';
import {
    MdDashboard,
    MdTask,
    MdPeople,
    MdSettings,
    MdMenu,
    MdOutlineNotifications,
    MdLogout,
    MdOutlineClass
} from 'react-icons/md';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../Global/store/useAuthStore';
import { FaClipboardList } from 'react-icons/fa';
import { useSignalR } from '@/hooks/useSignalR';
import { useNotificationStore } from '@/Global/store/useNotificationStore';
import { useRole } from '@/hooks/useRole';

const { Header, Sider, Content } = Layout;

export const DashboardLayout: React.FC = () => {

    useSignalR();

    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const navigate = useNavigate();
    const location = useLocation();

    const { logout, user, isAuthenticated } = useAuthStore();
    const { notifications, unreadCount, markAllAsRead } = useNotificationStore();
    const { isAdmin } = useRole();

    const allMenuItems: { key: string; icon: React.ReactNode; label: string; adminOnly?: boolean }[] = [
        { key: '/dashboard', icon: <MdDashboard size={20} />, label: 'Dashboard' },
        { key: '/board', icon: <FaClipboardList size={20} />, label: 'Board' },
        { key: '/tasks', icon: <MdTask size={20} />, label: 'Tasks' },
        { key: '/category', icon: <MdOutlineClass size={20} />, label: 'Category', adminOnly: true },
        { key: '/users', icon: <MdPeople size={20} />, label: 'Users', adminOnly: true },
        { key: '/settings', icon: <MdSettings size={20} />, label: 'Settings' },

    ];

    const menuItems = allMenuItems.filter(item => !item.adminOnly || isAdmin);

    return (
        <Layout className="min-h-screen">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                onBreakpoint={(broken) => setCollapsed(broken)}
                className="bg-slate- shadow-2xl z-20 relative"
                theme="dark"
                width={220}
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
                />
            </Sider>
            <Layout>
                <Header className="px-6 flex items-center justify-between backdrop-blur-xl bg-white/80 dark:bg-card/80 shadow-xs dark:shadow-none z-10 border-b border-border/50 sticky top-0 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="w-10 h-10 flex items-center justify-center -ml-2 rounded-xl border border-transparent hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300 focus:outline-hidden ring-0"
                        >
                            <MdMenu size={24} />
                        </button>
                        <div className="hidden md:block">
                            <h2 className="text-xl font-extrabold text-primary-foreground m-0 tracking-tight">Project Alpha</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Dropdown
                            trigger={['click']}
                            onOpenChange={(open) => { if (open) markAllAsRead(); }}
                            dropdownRender={() => (
                                <div className="bg-white dark:bg-card border left-5 border-border rounded-xl shadow-lg w-80 max-h-96 overflow-y-auto">
                                    <div className="p-3 border-b border-border font-semibold text-sm">Notificaciones</div>
                                    {notifications.length === 0 ? (
                                        <div className="p-4 text-center text-muted-foreground text-sm">Sin notificaciones</div>
                                    ) : (
                                        notifications.slice(0, 20).map((n, i) => (
                                            <div key={i} className="p-3 border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-colors"
                                                onClick={() => n.taskId && navigate('/tasks')}>
                                                <div className="font-medium text-sm">{n.title}</div>
                                                <div className="text-xs text-muted-foreground mt-1">{n.message}</div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        >
                            <Badge count={unreadCount} size="small" offset={[-2, 2]}>
                                <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300">
                                    <MdOutlineNotifications size={24} />
                                </button>
                            </Badge>
                        </Dropdown>
                        <div className="cursor-pointer flex items-center gap-3 bg-white dark:bg-card border border-border/50 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 px-2 py-1.5 rounded-full transition-all duration-300">
                            <UserButton afterSignOutUrl="/login" />
                        </div>
                    </div>
                </Header>
                <Content className="m-4 rounded-xl border border-border bg-card text-muted-foreground shadow-sm flex flex-col overflow-hidden">
                    <div className="p-4 w-full h-full overflow-y-auto">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
