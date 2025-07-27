import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { LinkBasic } from "@repo/component/ui";
import { useNotify } from "@repo/component/ui/notification/Notification";
import TableBasic from "@repo/component/ui/table/TableBasic";
import { usePaginationParams } from "@repo/packages/hooks/pagination/use-pagination-params.hook";
import { categoryApi } from "@repo/packages/services/api/category.api";
import { productApi } from "@repo/packages/services/api/product.api";
import type { Product } from "@repo/packages/types";
import type { ProductCreateBody, ProductEditBody } from "@repo/packages/types/domain/product.type";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Checkbox, Flex, Form, Input, Modal, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState, useCallback } from "react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit?: (values: Partial<Product>) => void;
    initialValues?: Partial<Product> | null;
    categoryOtps?: { value: number | string, label: number | string }[];
};

const ProductModal = ({ open, onClose, initialValues, categoryOtps }: Props) => {
    const [form] = Form.useForm();
    const notify = useNotify();
    const queryClient = useQueryClient();
    const [description, setDescription] = useState("");

    const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const uploadImageToCloudinary = useCallback(async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        return data.secure_url;
    }, []);

    const quillModules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: function (this: any) {
                    const quill = this.quill;
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.click();
                    input.onchange = async () => {
                        if (input.files && input.files[0]) {
                            const url = await uploadImageToCloudinary(input.files[0]);
                            const range = quill.getSelection();
                            quill.insertEmbed(range.index, 'image', url);
                        }
                    };
                }
            }
        }
    }), [uploadImageToCloudinary]);

    // Sử dụng ReactQuill với modules mới
    const quillEditor = useMemo(() => (
        <ReactQuill
            key={initialValues?.productId || 'new'}
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={quillModules}
        />
    ), [description, initialValues?.productId, quillModules]);

    const mutationCreate = useMutation({
        mutationFn: productApi.apis.create,
        onSuccess: () => {
            notify?.success({ message: "Tạo sản phẩm mới thành công!" });
            queryClient.invalidateQueries({
                queryKey: [REPO_CONSTANT.QUERY_KEYS.product.base]
            }).then(() => {
                onClose();
            })
        },
        onError: () => {
            notify?.error({ message: "Tạo sản phẩm mới thất bại!" });
        }
    });

    const mutationEdit = useMutation({
        mutationFn: productApi.apis.edit,
        onSuccess: () => {
            notify?.success({ message: "Cập nhật sản phẩm thành công!" });
            queryClient.invalidateQueries({
                queryKey: [REPO_CONSTANT.QUERY_KEYS.product.base]
            }).then(() => {
                onClose();
            })
        },
        onError: () => {
            notify?.error({ message: "Cập nhật sản phẩm thất bại!" });
        }
    })

    useEffect(() => {
        if (open) {
            if (initialValues) {
                form.setFieldsValue({
                    name: initialValues.name, categoryId: initialValues.category?.categoryId,
                    isActive: initialValues.status === 1,
                });
                setDescription(initialValues.description || "");
            } else {
                form.resetFields();
                setDescription("");
            }
        }
    }, [initialValues, open]);

    const handleClose = () => {
        form.resetFields();
        onClose();
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            const payload: ProductCreateBody = {
                name: values.name,
                categoryId: values.categoryId,
                status: values.isActive ? 1 : 0,
                date: new Date(),
                description
            };

            if (initialValues?.productId) {
                const editPayload: ProductEditBody = {
                    ...payload,
                    productId: initialValues.productId,
                };
                mutationEdit.mutate(editPayload);
            } else {
                mutationCreate.mutate(payload);
            }
        } catch (err) {
            // validate fail
        }
    };

    return (
        <Modal destroyOnClose title="Thêm sản phẩm" open={open} onCancel={handleClose} onOk={handleOk} okText="Lưu" cancelText="Hủy">
            <Form layout="vertical" form={form}>
                <Form.Item name="name" rules={[{ required: true }]}>
                    <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>
                <Form.Item name="categoryId" rules={[{ required: true }]}>
                    <Select options={categoryOtps} placeholder="Chọn danh mục" />
                </Form.Item>
                <Form.Item label="Mô tả sản phẩm">
                    {quillEditor}
                </Form.Item>
                <Form.Item name="isActive" valuePropName="checked" >
                    <Checkbox>Đang hoạt động</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    )
};

const Product = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { pageIndex, pageSize, pagingObj } = usePaginationParams({
        defaultPageIndex: 1, defaultPageSize: 20, readyUpdate: false,
    });
    const productQuery = productApi.queries.paginationFilterQuery({ ...pagingObj }, true);
    const [editingData, setEditingData] = useState<Partial<Product> | null>(null);

    const categoryQuery = categoryApi.queries.readQuery();

    const categoryOtps = useMemo(() => {
        return categoryQuery.data?.map(item => ({
            label: item.name,
            value: item.categoryId,
        })) || [];
    }, [categoryQuery.data]);

    const columns: ColumnsType<Product> = [
        {
            key: "info",
            title: "Thông tin",
            dataIndex: "info",
            render: (_, record) => (<LinkBasic to={`/admin/product/${record.productId}`} color="black">{record.name}</LinkBasic>),
        },
        {
            key: "link",
            title: "Danh mục",
            dataIndex: "link",
            render: (_, record) => (record.category?.name),
        },
        {
            key: "status",
            title: "Đang hoạt động",
            dataIndex: "status",
            render: (status) => (<Checkbox checked={status === 1} disabled />),
            align: 'center'
        }
    ];

    const handleOpenEdit = (record: Product) => {
        setEditingData(record);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingData(null);
    };

    return (
        <>
            <Flex justify="right" style={{ marginBottom: 10 }}>
                <Button style={{ background: "#001529", color: "#fff" }} onClick={() => setIsModalOpen(true)}>
                    <PlusOutlined /> Thêm
                </Button>
            </Flex>
            <TableBasic columns={columns} loading={productQuery.isPending || productQuery.isFetching}
                dataSource={productQuery.data?.records || []} rowKey="productId" pageIndex={pageIndex} pageSize={pageSize}
                actionItems={1} actionRender={(_, record: Product) => (
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleOpenEdit(record)}>
                        Sửa
                    </Button>
                )}
            />
            <ProductModal open={isModalOpen} onClose={handleCloseModal} initialValues={editingData}
                categoryOtps={categoryOtps} />
        </>
    )
};

export default Product;