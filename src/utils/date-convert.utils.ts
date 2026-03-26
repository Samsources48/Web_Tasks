import dayjs, { Dayjs } from 'dayjs';

export const formatDate = (date: Date | string | Dayjs): string =>
    dayjs(date).format('DD/MM/YYYY');

export const formatDateTime = (date: Date | string | Dayjs): string =>
    dayjs(date).format('DD/MM/YYYY HH:mm:ss');