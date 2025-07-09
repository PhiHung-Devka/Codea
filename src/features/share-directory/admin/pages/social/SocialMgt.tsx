import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNotify } from "@repo/component/ui/notification/Notification";
import TableBasic from "@repo/component/ui/table/TableBasic";
import { usePaginationParams } from "@repo/packages/hooks/pagination/use-pagination-params.hook";
import { socialApi } from "@repo/packages/services/api/social.api";
import type { Social } from "@repo/packages/types/base-model/social.type";
import type { SocialCreateBody, SocialEditBody } from "@repo/packages/types/domain/social.type";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Checkbox, Flex, Form, Input, Modal, Upload } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { useEffect, useState } from "react";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit?: (values: Partial<Social>) => void;
    initialValues?: Partial<Social> | null;
};

const SocialModal = ({ open, onClose, initialValues }: Props) => {
    const [form] = Form.useForm();
    const notify = useNotify();
    const queryClient = useQueryClient();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const customRequest: UploadProps["customRequest"] = async ({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append("file", file as RcFile);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.secure_url) {
                onSuccess?.({ url: data.secure_url });
            } else {
                throw new Error("Upload thất bại");
            }
        } catch (err) {
            onError?.(err as Error);
        }
    };

    const mutationCreate = useMutation({
        mutationFn: socialApi.apis.create,
        onSuccess: () => {
            notify?.success({ message: "Tạo thành công!" });
            queryClient.invalidateQueries({
                queryKey: [REPO_CONSTANT.QUERY_KEYS.social.base],
            });
            onClose();
        },
        onError: () => {
            notify?.error({ message: "Tạo thất bại!" });
        },
    });

    const mutationUpdate = useMutation({
        mutationFn: socialApi.apis.edit,
        onSuccess: () => {
            notify?.success({ message: "Cập nhật thành công!" });
            queryClient.invalidateQueries({
                queryKey: [REPO_CONSTANT.QUERY_KEYS.social.base],
            });
            onClose();
        },
        onError: () => {
            notify?.error({ message: "Cập nhật thất bại!" });
        },
    });

    const handleClose = () => {
        form.resetFields();
        setFileList([]);
        onClose();
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            const iconUrl = fileList[0]?.url || (fileList[0]?.response as any)?.url;
            if (!iconUrl) {
                notify?.error({ message: "Vui lòng tải lên ảnh biểu tượng." });
                return;
            }

            const payload: SocialCreateBody = {
                ...values,
                iconUrl,
            };

            if (initialValues?.socialId) {
                const editPayload: SocialEditBody = {
                    ...payload,
                    socialId: initialValues.socialId,
                };
                mutationUpdate.mutate(editPayload);
            } else {
                mutationCreate.mutate(payload);
            }
        } catch (err) {
            // validate fail
        }
    };

    useEffect(() => {
        if (open) {
            form.setFieldsValue(initialValues || { name: "", link: "", iconUrl: "" });

            if (initialValues?.iconUrl) {
                setFileList([
                    {
                        uid: "-1",
                        name: "image.png",
                        status: "done",
                        url: initialValues.iconUrl,
                    },
                ]);
            } else {
                setFileList([]);
            }
        }
    }, [initialValues, open]);

    return (
        <Modal title={initialValues ? "Chỉnh sửa mạng xã hội" : "Thêm mạng xã hội"} onOk={handleOk} open={open} okText="Lưu"
            cancelText="Hủy" onCancel={handleClose}>
            <Form form={form} layout="vertical">
                <Form.Item name="name" rules={[{ required: true }]}>
                    <Input placeholder="Nhập tên mạng xã hội" />
                </Form.Item>
                <Form.Item name="link" rules={[{ required: true }]}>
                    <Input placeholder="Nhập địa chỉ liên kết" />
                </Form.Item>
                <Form.Item>
                    <Upload accept="image/*" listType="picture-card" fileList={fileList} onChange={({ fileList }) => setFileList(fileList)}
                        customRequest={customRequest} maxCount={1}>
                        {fileList.length < 1 && "+ Tải ảnh"}
                    </Upload>
                </Form.Item>
                <Form.Item name="isActive" valuePropName="checked">
                    <Checkbox>Đang hoạt động</Checkbox>
                </Form.Item>
                <Form.Item name="isPhone" valuePropName="checked">
                    <Checkbox>Số điện thoại</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const SocialMgt = () => {
    const notify = useNotify();
    const queryClient = useQueryClient();
    const { pageIndex, pageSize, pagingObj } = usePaginationParams({
        defaultPageIndex: 1, defaultPageSize: 10, readyUpdate: false,
    });

    const bannerQuery = socialApi.queries.paginationFilterQuery({ ...pagingObj }, true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState<Partial<Social> | null>(null);

    const mutationDelete = useMutation({
        mutationFn: socialApi.apis._delete,
        onSuccess: () => {
            notify?.success({ message: "Xóa thành công!" });
            queryClient.invalidateQueries({
                queryKey: [REPO_CONSTANT.QUERY_KEYS.banner.base],
            });
        },
        onError: (err: any) => {
            const message = typeof err === "string" ? err : err?.message || err?.error || "Vui lòng thử lại.";
            notify?.error({ message: "Xóa thất bại!", description: message });
        },
    });

    const handleOpenEdit = (record: Social) => {
        setEditingData(record);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingData(null);
    };

    const columns: ColumnsType<Social> = [
        {
            key: "info",
            title: "Thông tin",
            dataIndex: "info",
            render: (_, record) => (
                <Flex align="center" gap={12}>
                    <img src={record.iconUrl} alt="Logo" style={{ width: 30 }} />
                    <div>{record.name}</div>
                </Flex>
            ),
        },
        {
            key: "link",
            title: "Địa chỉ liên kết",
            dataIndex: "info",
            render: (_, record) => (record.link),
        },
    ];

    return (
        <>
            <Flex justify="right" style={{ marginBottom: 10 }}>
                <Button style={{ background: "#001529", color: "#fff" }} onClick={() => setIsModalOpen(true)}>
                    <PlusOutlined /> Thêm
                </Button>
            </Flex>
            <TableBasic columns={columns} loading={bannerQuery.isPending || bannerQuery.isFetching}
                dataSource={bannerQuery.data?.records || []} rowKey="socialId" pageIndex={pageIndex} pageSize={pageSize}
                actionItems={1} actionRender={(_, record: Social) => (
                    <>
                        <Button type="primary" icon={<EditOutlined />} onClick={() => handleOpenEdit(record)}>
                            Sửa
                        </Button>
                        <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => mutationDelete.mutate(record.socialId)}>
                            Xóa
                        </Button>
                    </>
                )}
            />
            <SocialModal
                open={isModalOpen}
                onClose={handleCloseModal}
                initialValues={editingData}
            />
        </>
    )
}

export default SocialMgt;