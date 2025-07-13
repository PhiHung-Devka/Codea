import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { productApi } from "@repo/packages/services/api/product.api";
import { Breadcrumb, Button, ColorPicker, Flex, Table, Tabs, type TableColumnsType } from "antd";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./ProductDetailMgt.module.scss";
import { useMemo, useRef, useState } from "react";
import { useNotify } from "@repo/component/ui/notification/Notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal } from "antd";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useEffect } from "react";
import { productDetailApi } from "@repo/packages/services/api/product-detail.api";
import type { ProductDetailCreateBody, ProductDetailEditBody } from "@repo/packages/types/domain/product-detail.type";
import { Upload } from "antd";
import type { UploadFile, UploadProps, RcFile } from "antd/es/upload";
import { productDetaiSizelApi } from "@repo/packages/services/api/product-detail-size.api";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const createEmptySize = () => ({
    size: '',
    quantity: undefined,
    price: undefined,
    discountPercent: 0,
    realPrice: undefined
});

const rgbToHex = (r: number, g: number, b: number) => {
    return (
        "#" +
        [r, g, b]
            .map(x => {
                const hex = x.toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            })
            .join("")
    );
};

const ProductModal = ({ open, onClose, initialValues, productId }: { open: boolean; onClose: () => void; initialValues?: any; productId: number }) => {
    const [form] = Form.useForm();
    const notify = useNotify();
    const queryClient = useQueryClient();

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | undefined>();
    const [sizes, setSizes] = useState<any[]>([]);
    const [activeSizeKey, setActiveSizeKey] = useState<string>("0");
    const sizesRef = useRef<any[]>([]);
    useEffect(() => { sizesRef.current = sizes; }, [sizes]);

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
            if (data.secure_url) onSuccess?.({ url: data.secure_url });
            else throw new Error("Upload thất bại");
        } catch (err) {
            onError?.(err as Error);
        }
    };

    const handlePreview = (file: UploadFile) => {
        setPreviewImage(file.url || (file.response as any)?.url);
        setPreviewOpen(true);
    };

    const mutationCreate = useMutation({
        mutationFn: productDetailApi.apis.create,
        onSuccess: () => {
            notify?.success({ message: "Thêm chi tiết sản phẩm thành công!" });
            queryClient.invalidateQueries({ queryKey: ["productDetail"] }).then(onClose);
        },
        onError: () => notify?.error({ message: "Thêm chi tiết sản phẩm thất bại!" })
    });

    const mutationEdit = useMutation({
        mutationFn: productDetailApi.apis.edit,
        onSuccess: () => {
            notify?.success({ message: "Cập nhật chi tiết sản phẩm thành công!" });
            queryClient.invalidateQueries({ queryKey: ["productDetail"] }).then(onClose);
        },
        onError: () => notify?.error({ message: "Cập nhật chi tiết sản phẩm thất bại!" })
    });

    const mutationDeleteSize = useMutation({
        mutationFn: (id: number) => productDetaiSizelApi.apis._delete(id),
        onSuccess: () => {
            notify?.success({ message: "Xóa kích thước thành công!" });
            queryClient.invalidateQueries({ queryKey: ["size"] }).then(onClose);
        },
        onError: () => notify?.error({ message: "Xóa kích thước thất bại!" }),
    })

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            let color = values.color;
            if (typeof color.hexCode === "object" && color.hexCode.metaColor) {
                const { r, g, b } = color.hexCode.metaColor;
                color = {
                    ...color,
                    hexCode: rgbToHex(r, g, b)
                };
            }
            const updatedSizes = sizes.map((s, idx) => {
                const data = idx === Number(activeSizeKey) ? { ...s, ...values } : s;
                const realPrice = Math.round(Number(data.price) * (1 - Number(data.discountPercent) / 100));
                return {
                    ...data,
                    size: String(data.size),
                    quantity: Number(data.quantity),
                    price: Number(data.price),
                    discountPercent: Number(data.discountPercent),
                    realPrice,
                };
            });
            const galleries = fileList.map(f => ({ imageUrl: f.url || (f.response as any)?.url }));
            const payload: ProductDetailCreateBody = {
                productId,
                color,
                galleries,
                sizes: updatedSizes
            };

            if (initialValues?.productDetailId) {
                const editPayload: ProductDetailEditBody = {
                    ...payload,
                    productDetailId: initialValues.productDetailId,
                };
                mutationEdit.mutate(editPayload);
            } else {
                mutationCreate.mutate(payload);
            }

        } catch (err) {
            // validate fail
        }
    };

    const onTabChange = async (key: string) => {
        const values = await form.validateFields();
        setSizes(prev =>
            prev.map((s, idx) => idx === Number(activeSizeKey) ? { ...s, ...values } : s)
        );
        setActiveSizeKey(key);
        form.setFieldsValue(sizes[Number(key)]);
    };

    const handleAddSize = async () => {
        const values = await form.validateFields();
        setSizes(prev => {
            const updated = prev.map((s, idx) =>
                idx === Number(activeSizeKey) ? { ...s, ...values } : s
            );
            return [...updated, createEmptySize()];
        });
        setActiveSizeKey(String(sizes.length));
        setTimeout(() => form.setFieldsValue(createEmptySize()), 0);
    };

    const handleClose = () => {
        form.resetFields();
        setFileList([]);
        setSizes([]);
        setActiveSizeKey("0");
        onClose();
    };

    useEffect(() => {
        if (open) {
            if (initialValues) {
                const initSizes = Array.isArray(initialValues.sizes) && initialValues.sizes.length > 0
                    ? initialValues.sizes.map((s: any) => ({ ...s }))
                    : [createEmptySize()];
                setSizes(initSizes);
                setActiveSizeKey("0");
                form.setFieldsValue({
                    ...initSizes[0],
                    color: initialValues.color
                });
                if (initialValues.galleries) {
                    setFileList(initialValues.galleries.map((g: any, idx: number) => ({
                        uid: String(idx),
                        name: `image-${idx}.png`,
                        status: "done",
                        url: g.imageUrl
                    })));
                }
            } else {
                setSizes([createEmptySize()]);
                setActiveSizeKey("0");
                form.resetFields();
                setFileList([]);
            }
        }
    }, [initialValues, open]);

    return (
        <Modal title="Chi tiết sản phẩm" open={open} onCancel={handleClose} onOk={handleOk}>
            <Form layout="vertical" form={form}>
                <Flex gap={8} align="center">
                    <Form.Item name={["color", "name"]} rules={[{ required: true, message: "Vui lòng nhập tên màu" }]}
                        style={{ flex: 1 }}>
                        <Input placeholder="Nhập tên màu" />
                    </Form.Item>
                    <Form.Item name={["color", "hexCode"]} rules={[{ required: true, message: "Chọn màu" }]}>
                        <ColorPicker />
                    </Form.Item>
                </Flex>
                <Form.Item>
                    <Upload accept="image/*" listType="picture-card" fileList={fileList} onPreview={handlePreview} maxCount={5}
                        onChange={({ fileList }) => setFileList(fileList)} customRequest={customRequest} multiple>
                        {fileList.length < 2 && "+ Tải ảnh"}
                    </Upload>
                </Form.Item>
                <Tabs type="editable-card" activeKey={activeSizeKey} onChange={onTabChange}
                    onEdit={async (targetKey, action) => {
                        if (action === "add") {
                            await handleAddSize();
                        } else if (action === "remove") {
                            const idx = Number(targetKey);
                            const removedSize = sizes[idx];

                            if (removedSize?.productDetailSizeId) {
                                mutationDeleteSize.mutate(removedSize.productDetailSizeId);
                            }

                            const newSizes = sizes.filter((_, i) => i !== idx);
                            setSizes(newSizes);
                            const newActiveKey = String(Math.max(0, idx - 1));
                            setActiveSizeKey(newActiveKey);
                            form.setFieldsValue(newSizes[Number(newActiveKey)] || {});
                        }
                    }}
                    items={sizes.map((size, idx) => ({
                        label: `Size ${size.size || idx + 1}`, key: String(idx),
                        children: (
                            <>
                                <Form.Item name="size" rules={[{ required: true }]}>
                                    <Input placeholder="Nhập kích thước" />
                                </Form.Item>
                                <Form.Item name="quantity" rules={[{ required: true }]}>
                                    <Input placeholder="Nhập số lượng" type="number" />
                                </Form.Item>
                                <Form.Item name="price" rules={[{ required: true }]}>
                                    <Input placeholder="Nhập giá" type="number" />
                                </Form.Item>
                                <Form.Item name="discountPercent" rules={[{ required: true }]}>
                                    <Input placeholder="Tỉ lệ giảm giá" type="number" />
                                </Form.Item>
                            </>
                        )
                    }))}
                    tabBarExtraContent={<Button type="dashed" onClick={handleAddSize}>+ Thêm size</Button>}
                />
            </Form>
            <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="preview" style={{ width: "100%" }} src={previewImage} />
            </Modal>
        </Modal>
    );
};

const ProductDetailMgt = () => {
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);
    const notify = useNotify();
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState<any | null>(null);
    const productQuery = productApi.queries.detailQuery(productId, !!productId);

    const mutationDeleteDetail = useMutation({
        mutationFn: (id: number) => productDetailApi.apis._delete(id),
        onSuccess: () => {
            notify?.success({ message: "Xóa kích thước thành công!" });
            queryClient.invalidateQueries({ queryKey: [REPO_CONSTANT.QUERY_KEYS.productDetail.base] });
        },
        onError: () => notify?.error({ message: "Xóa kích thước thất bại!" }),
    })

    const productDetails = productQuery.data?.productDetails || [];
    const tableData = useMemo(() => {
        let key = 1;
        const rows: {
            key: React.Key;
            productDetailId: number;
            color: string;
            colorHex: string;
            size: string;
            quantity: number;
            price: number;
            discountPercent: number;
            realPrice: number;
            colorRowSpan?: number;
        }[] = [];
        productDetails.forEach((detail: any) => {
            detail.sizes.forEach((sizeObj: any, idx: number) => {
                rows.push({
                    key: key++,
                    productDetailId: detail.productDetailId,
                    color: detail.color.name,
                    colorHex: detail.color.hexCode,
                    size: sizeObj.size,
                    quantity: sizeObj.quantity,
                    price: sizeObj.price,
                    discountPercent: sizeObj.discountPercent,
                    realPrice: sizeObj.realPrice,
                    colorRowSpan: idx === 0 ? detail.sizes.length : 0,
                });
            });
        });
        return rows;
    }, [productDetails]);

    const columns: TableColumnsType<any> = [
        {
            title: 'Màu',
            dataIndex: 'color',
            key: 'color',
            width: 200,
            render: (text: string, record: any) => (
                <Flex align="center" gap={8}>
                    <div style={{ background: record.colorHex }} className={styles["pdt__colorWrapper--colorCircle"]}></div>
                    {text}
                </Flex>
            ),
            onCell: (record: any) => ({
                rowSpan: record.colorRowSpan,
            }),
        },
        { title: 'Kích thước', dataIndex: 'size', key: 'size', width: 150 },
        { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Giá', dataIndex: 'price', key: 'price', render: (v: number) => v.toLocaleString(), width: 250 },
        { title: 'Giảm giá (%)', dataIndex: 'discountPercent', key: 'discountPercent' },
        { title: 'Giá thực tế', dataIndex: 'realPrice', key: 'realPrice', render: (v: number) => v.toLocaleString(), width: 250 },
        {
            title: 'Tác vụ',
            dataIndex: '',
            key: 'x',
            render: () => <Flex gap={8}>
                <Button type="primary" icon={<EditOutlined />} >
                    Sửa
                </Button>
                <Button type="primary" danger icon={<DeleteOutlined />}>
                    Xóa
                </Button>
            </Flex>,
            onCell: (record: any) => ({
                rowSpan: record.colorRowSpan,
            }),
        },
    ];

    return (
        <>
            <ProductModal open={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingData(null); }} initialValues={editingData} productId={productId} />
            <Breadcrumb separator=">" items={[
                { title: <Link to="/admin/product">Danh sách sản phẩm</Link> },
                { title: `Chi tiết sản phẩm (${productQuery.data?.name})` }
            ]}
            />
            <Flex justify="right" style={{ marginBottom: 10 }}>
                <Button style={{ background: "#001529", color: "#fff" }} onClick={() => { setIsModalOpen(true); setEditingData(null); }}>
                    <PlusOutlined /> Thêm
                </Button>
            </Flex>
            <Table
                bordered
                columns={columns.map(col =>
                    col.key === 'x' ? {
                        ...col,
                        render: (_: any, record: any) => {
                            const detail = productDetails.find((d: any) => d.color.name === record.color);
                            if (record.colorRowSpan === 0) return null;
                            return (
                                <Flex gap={8}>
                                    <Button type="primary" icon={<EditOutlined />} onClick={() => {
                                        setIsModalOpen(true);
                                        setEditingData({
                                            productDetailId: detail?.productDetailId,
                                            color: detail?.color,
                                            galleries: detail?.galleries || [],
                                            sizes: detail?.sizes || [],
                                        });
                                    }}>
                                        Sửa
                                    </Button>
                                    <Button type="primary" danger icon={<DeleteOutlined />}
                                        onClick={() => {
                                            if (detail?.productDetailId) {
                                                mutationDeleteDetail.mutate(detail.productDetailId);
                                            } else {
                                                notify?.error({ message: "Không tìm thấy ID để xóa!" });
                                            }
                                        }}>
                                        Xóa
                                    </Button>
                                </Flex>
                            )
                        }
                    } : col
                )}
                dataSource={tableData}
                loading={productQuery.isPending || productQuery.isFetching}
                pagination={false}
            />
        </>
    )
}

export default ProductDetailMgt;