import React from 'react'
import { API_AUTH, type User } from '../auth/interfaces/auth.models'
import { fetchClient } from '../client'

export const userServices = {

    GetByIdUser: async (idClerk: string): Promise<User> => {
        return fetchClient<User>(`${API_AUTH}/Usuarios/clerk`, {
            method: 'GET',
            params: { idClerk }
        })
    },

    GetAll: async (): Promise<User[]> => {
        return fetchClient<User[]>(`${API_AUTH}/Usuarios`, {
            method: 'GET',
        })
    }
}
