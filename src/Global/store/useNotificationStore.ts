import type { NotificationDto } from '@/Api/notifications/interfaces/notification.interface';
import { create } from 'zustand';

interface NotificationState {
    notifications: NotificationDto[];
    unreadCount: number;
    addNotification: (notification: NotificationDto) => void;
    markAllAsRead: () => void;
    clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>()(
    (set) => ({
        notifications: [],
        unreadCount: 0,

        addNotification: (notification: NotificationDto) => {
            set((state) => ({
                notifications: [...state.notifications, notification],
                unreadCount: state.unreadCount + 1,
            }));
        },

        markAllAsRead: () => {
            set({ unreadCount: 0 });
        },

        clearAll: () => {
            set({ notifications: [], unreadCount: 0 });
        },
    })
);
