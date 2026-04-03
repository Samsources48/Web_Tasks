import { useQuery } from '@tanstack/react-query'
import { userServices } from './user.services'

export const usersQueries = () => {

    const getByIduser = (idClerk: string) => useQuery({
        queryKey: ['user', idClerk],
        queryFn: () => userServices.GetByIdUser(idClerk),
        enabled: !!idClerk,
    })

    const getAllUsers = useQuery({
        queryKey: ['users'],
        queryFn: () => userServices.GetAll(),
    })

    return {
        getByIduser,
        getAllUsers,
    }
}
