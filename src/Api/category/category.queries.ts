import { useMutation, useQuery } from "@tanstack/react-query"
import { categoryService } from "./category.service"
import { message } from "antd"

export const useCategoryQueries = () => {

    const createCategory = useMutation({
        mutationFn: categoryService.createCategory,
        onSuccess: () => {
            message.success('Category created successfully');
        },
        onError: () => {
            message.error('Category creation failed');
        }
    });

    const updateCategory = useMutation({
        mutationFn: categoryService.updateCategory,
        onSuccess: () => {
            message.success('Category updated successfully');
        },
        onError: () => {
            message.error('Category update failed');
        }
    });

    const getAllCategories = useQuery({
        queryKey: ['categories-all'],
        queryFn: categoryService.getAll,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });

    const getByIdCategory = (id?: number) => useQuery({
        queryKey: ['categories-id', id],
        queryFn: () => categoryService.getByIdCategory(id!),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        enabled: !!id,
    });

    const deleteCategory = useMutation({
        mutationFn: categoryService.deleteCategory,
        onSuccess: () => {
            message.success('Category deleted successfully');
        },
        onError: () => {
            message.error('Category deletion failed');
        }
    });

    return {
        createCategory,
        updateCategory,
        getAllCategories,
        getByIdCategory,
        deleteCategory
    }
}

