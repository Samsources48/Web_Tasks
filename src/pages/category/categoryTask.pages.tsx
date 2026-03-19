import React, { useState, useEffect, useTransition } from 'react';
import { Flex, Typography, Table, Button, FloatButton, Popconfirm, Modal, Form, Input, Row, Col } from 'antd';
import { MdAdd, MdEdit, MdDelete, MdMoreVert } from 'react-icons/md';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useCategoryQueries } from '@/Api/category/category.queries';
import type { CategoryDto, SaveCategoryDto } from '@/Api/category/interfaces/category.interfaces';
import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components';

const { Text } = Typography;


const categorySchema = z.object({
    nombre: z.string().min(3, 'Name must be at least 3 characters long'),
    descripcion: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
export const InitialValuesCategory = {} as CategoryFormValues;

export const CategoryTaskPages = () => {

    const {
        getAllCategories,
        getByIdCategory,
        createCategory,
        updateCategory,
        deleteCategory
    } = useCategoryQueries();

    const { control, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        mode: 'onChange',
        defaultValues: InitialValuesCategory
    });

    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<number | null>(null);

    const { data: categoryById } = getByIdCategory(editingCategory!);

    useEffect(() => {
        if (getAllCategories.data) {
            setCategories(getAllCategories.data);
        }
    }, [getAllCategories.data]);


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        reset();
        setEditingCategory(null);
    };

    const onSubmit = async (values: CategoryFormValues) => {

        editingCategory
            ? await updateCategory.mutateAsync({ ...values, idTaskCategory: editingCategory })
            : await createCategory.mutateAsync(values);

        await getAllCategories.refetch();
        handleCloseModal();
        reset();
    };

    const handleEdit = (id: number) => {
        setEditingCategory(id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id?: number) => {
        if (!id) return;
        await deleteCategory.mutateAsync(id);
        getAllCategories.refetch();
    };

    useEffect(() => {
        if (categoryById) {
            reset(categoryById);
            setEditingCategory(categoryById?.idTaskCategory!);
        }
    }, [categoryById, reset]);

    const columns: ColumnsType<CategoryDto> = [
        {
            title: 'Name',
            dataIndex: 'nombre',
            key: 'nombre',
            width: 250,
            render: (text: string) => <span className="font-semibold text-gray-800 dark:text-gray-200">{text}</span>
        },
        {
            title: 'Description',
            dataIndex: 'descripcion',
            key: 'descripcion',
            render: (text: string) => <span className="text-gray-500 dark:text-gray-400">{text || 'No description'}</span>
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (record: CategoryDto) => (
                <div style={{ position: 'relative', width: '32px', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FloatButton.Group
                        trigger="hover"
                        type="primary"
                        placement="left"
                        style={{ position: 'relative', right: 0, bottom: 0, transform: 'scale(0.85)' }}
                        icon={<MdMoreVert />}
                    >
                        <FloatButton
                            icon={<MdEdit />}
                            onClick={() => handleEdit(record.idTaskCategory!)}
                        />
                        <Popconfirm
                            title="Delete category"
                            description="Are you sure to delete this category?"
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            onConfirm={() => handleDelete(record.idTaskCategory)}
                        >
                            <FloatButton icon={<MdDelete />} />
                        </Popconfirm>
                    </FloatButton.Group>
                </div>
            )
        },
    ];

    return (
        <Flex vertical gap={20} className="h-full min-h-[calc(100vh-140px)]">
            <Flex justify="space-between" align="flex-end" className="mb-4">
                <div>
                    <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 mb-2 tracking-tight">
                        Categories
                    </h1>
                    <Text className="text-gray-500 text-sm font-medium">Manage task categories for better organization.</Text>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="group relative px-5 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-primary to-orange-500 rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-primary/50 hover:-translate-y-0.5 overflow-hidden"
                >
                    <span className="flex items-center gap-2">
                        <MdAdd className="text-lg" /> Add Category
                    </span>
                    <div className="absolute inset-0 h-full w-full opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></div>
                </button>
            </Flex>

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <div className="bg-card text-card-foreground rounded-2xl shadow-md ring-1 ring-border/50 overflow-hidden h-full flex flex-col transition-shadow hover:shadow-lg">
                        <div className="px-5 py-4 border-b border-border/50 bg-muted/20">
                            <h2 className="text-lg font-bold tracking-tight">Category List</h2>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={categories}
                            pagination={false}
                            size="middle"
                            rowKey="idTaskCategory"
                            loading={getAllCategories.isLoading}
                            className="w-full whitespace-nowrap overflow-x-auto [&_.ant-table-thead_th]:bg-muted/10 [&_.ant-table-thead_th]:text-muted-foreground [&_.ant-table-thead_th]:font-semibold [&_.ant-table-tbody_tr:hover]:bg-muted/30 p-2"
                        />
                        <Flex justify="flex-end" className="p-4 mt-2 bg-muted/10 border-t border-border/50">
                            <span className="text-sm font-semibold text-primary">
                                Total: {categories.length} Categories
                            </span>
                        </Flex>
                    </div>
                </Col>
            </Row>

            <Modal
                title={<span className="text-xl font-bold">{editingCategory ? 'Edit Category' : 'Create Category'}</span>}
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
                centered
                destroyOnClose
            >
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
                    <FormInput
                        name="nombre"
                        control={control}
                        label="Nombre"
                        placeholder="e.g. Develop, Design, Marketing"
                        size="large"
                    />

                    <div>
                        <span className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Description</span>
                        <Controller
                            name="descripcion"
                            control={control}
                            render={({ field }) => (
                                <Input.TextArea
                                    {...field}
                                    rows={4}
                                    placeholder="Add a short description about this category"
                                    className="px-4 py-3 rounded-xl border-gray-300 hover:border-primary focus:border-primary transition-colors text-base resize-none"
                                />
                            )}
                        />
                    </div>

                    <Flex justify="flex-end" gap={12} className="mt-8">
                        <Button
                            onClick={handleCloseModal}
                            className="px-6 h-10 rounded-xl font-medium border-gray-300 hover:bg-gray-50 hover:text-gray-700 transition-all"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={createCategory.isPending || updateCategory.isPending}
                            className="px-6 h-10 rounded-xl font-semibold bg-primary hover:bg-primary/90 shadow-md shadow-primary/30 transition-all hover:-translate-y-0.5"
                        >
                            {editingCategory ? 'Save Changes' : 'Create Category'}
                        </Button>
                    </Flex>
                </form>
            </Modal>
        </Flex>
    );
};
