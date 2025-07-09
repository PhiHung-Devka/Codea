import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNotify } from "@repo/component/ui/notification/Notification";
import TableBasic from "@repo/component/ui/table/TableBasic";
import { usePaginationParams } from "@repo/packages/hooks/pagination/use-pagination-params.hook";
import { bannerApi } from "@repo/packages/services";
import type { Banner } from "@repo/packages/types";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Form, Image, Modal, Upload } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader(); reader.readAsDataURL(file); reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const BannerModal = ({ open, onClose, }: { open: boolean; onClose: () => void }) => {
    const [form] = Form.useForm();
    const notify = useNotify();
    const queryClient = useQueryClient();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const mutationCreate = useMutation({
        mutationFn: bannerApi.apis.create,
        onSuccess: () => {
            notify?.success({ message: "Tạo banner thành công!" });
            queryClient.invalidateQueries({
                queryKey: [REPO_CONSTANT.QUERY_KEYS.banner.base],
            });
            handleClose();
        },
        onError: () => {
            notify?.error({ message: "Tạo banner thất bại!" });
        },
    });

    const handleClose = () => {
        form.resetFields();
        setFileList([]);
        setPreviewImage("");
        setPreviewOpen(false);
        onClose();
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps["onChange"] = ({ fileList }) => {
        setFileList(fileList);
    };

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

    const handleOk = async () => {
        const urls = fileList.map((file) => file.response?.url).filter(Boolean);
        if (urls.length === 0) {
            notify?.error({ message: "Vui lòng tải lên ít nhất 1 hình ảnh." });
            return;
        }
        urls.forEach((url: string) => {
            mutationCreate.mutate({ bannerUrl: url });
        });
    };

    return (
        <Modal title="Thêm Banner" open={open} onOk={handleOk} onCancel={handleClose} okText="Lưu" cancelText="Hủy">
            <Form layout="vertical" form={form}>
                <Upload accept="image/*" listType="picture-card" fileList={fileList} onChange={handleChange}
                    customRequest={customRequest} onPreview={handlePreview} multiple>
                    {fileList.length < 4 && "+ Tải ảnh"}
                </Upload>
                {previewImage && (
                    <Image wrapperStyle={{ display: "none" }} preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(""),
                    }} src={previewImage} />
                )}
            </Form>
        </Modal>
    );
};

const BannerMgt = () => {
    const notify = useNotify();
    const queryClient = useQueryClient();
    const { pageIndex, pageSize, pagingObj } = usePaginationParams({
        defaultPageIndex: 1, defaultPageSize: 10, readyUpdate: false,
    });

    const bannerQuery = bannerApi.queries.paginationFilterQuery({ ...pagingObj }, true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const mutationDelete = useMutation({
        mutationFn: bannerApi.apis._delete,
        onSuccess: () => {
            notify?.success({ message: "Xóa banner thành công!" });
            queryClient.invalidateQueries({
                queryKey: [REPO_CONSTANT.QUERY_KEYS.banner.base],
            });
        },
        onError: (err: any) => {
            const message = typeof err === "string" ? err : err?.message || err?.error || "Vui lòng thử lại.";
            notify?.error({ message: "Xóa Banner thất bại!", description: message });
        },
    });

    const columns: ColumnsType<Banner> = [
        {
            key: "info",
            title: "Thông tin Banner",
            dataIndex: "info",
            render: (_, record) => (
                <Flex align="center" gap={12}>
                    <img src={record.bannerUrl} alt={record.bannerUrl} style={{ width: 200 }} />
                    <div>{record.bannerUrl}</div>
                </Flex>
            ),
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
                dataSource={bannerQuery.data?.records || []} rowKey="bannerId" pageIndex={pageIndex} pageSize={pageSize}
                actionItems={1} actionRender={(_, record: Banner) => (
                    <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => mutationDelete.mutate(record.bannerId)}>
                        Xóa
                    </Button>
                )}
            />
            <BannerModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default BannerMgt;