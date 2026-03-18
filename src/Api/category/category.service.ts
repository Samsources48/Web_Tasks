import { API_AUTH } from "../auth/interfaces/auth.models";
import { fetchClient } from "../client";
import type { CategoryDto, SaveCategoryDto } from "./interfaces/category.interfaces";

export const categoryService = {

    getByIdCategory: async (id: number): Promise<CategoryDto> => {
        return fetchClient<CategoryDto>(`${API_AUTH}/TaskCategories/${id}`, {
            method: 'GET',
        });
    },

    getAll: async (): Promise<CategoryDto[]> => {
        return fetchClient<CategoryDto[]>(`${API_AUTH}/TaskCategories`, {
            method: 'GET',
        });
    },

    createCategory: async (data: SaveCategoryDto): Promise<CategoryDto> => {
        return fetchClient<CategoryDto>(`${API_AUTH}/TaskCategories`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    updateCategory: async (data: SaveCategoryDto): Promise<CategoryDto> => {
        return fetchClient<CategoryDto>(`${API_AUTH}/TaskCategories`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    deleteCategory: async (id: number): Promise<void> => {
        return fetchClient<void>(`${API_AUTH}/TaskCategories/${id}`, {
            method: 'DELETE',
        });
    }
};
