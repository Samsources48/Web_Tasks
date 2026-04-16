import React from 'react';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useRole } from '@/hooks/useRole';

interface AdminRouteProps {
    children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
    
    const { isAdmin, isLoaded } = useRole();

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-full py-20">
                <Spin size="large" />
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};
