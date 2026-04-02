import { useEffect, useRef } from 'react';
import { HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import type { HubConnection } from '@microsoft/signalr';
import type { NotificationDto } from '@/Api/notifications/interfaces/notification.interface';
import { useNotificationStore } from '@/Global/store/useNotificationStore';
import { message } from 'antd';

export const useSignalR = () => {
    const connectionRef = useRef<HubConnection | null>(null);
    const addNotification = useNotificationStore((s) => s.addNotification);

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl('/hubs/notifications', {
                accessTokenFactory: async () => {
                    const token = await window.Clerk?.session?.getToken({ template: 'jwt-task-api' });
                    return token ?? '';
                },
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        connection.on('ReceiveNotification', (notification: NotificationDto) => {
            addNotification(notification);
            message.info(notification.message);
        });

        connection.start()
            .then(() => console.log('[SignalR] Conectado'))
            .catch((err) => console.error('[SignalR] Error de conexión:', err));

        connectionRef.current = connection;

        return () => {
            if (connection.state === HubConnectionState.Connected) {
                connection.stop();
            }
        };
    }, [addNotification]);
};
