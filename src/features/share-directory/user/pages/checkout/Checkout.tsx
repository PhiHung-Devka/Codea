import { EnvironmentOutlined, LeftOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { useAddressStore, useAuthStore } from "@repo/packages/stores";
import { Avatar, Breadcrumb, Button, Card, Cascader, Col, Divider, Flex, Form, Input, List, Radio, Row, Skeleton, Tooltip, type CascaderProps, type GetProp } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useMemo, useEffect } from "react";
import VirtualList from 'rc-virtual-list';
import styles from "./Checkout.module.scss";
import { mapAddressToCascaderOptions } from "@repo/packages/ultis/address/address.mapper";
import useCartStore from "@repo/packages/stores/cart/use-cart-store";
import { LinkBasic } from "@repo/component/ui";
import { FormatCurrency } from "@repo/packages/ultis/common/currency-format";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderApi } from "@repo/packages/services/api/order.api";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useNotify } from "@repo/component/ui/notification/Notification";
import type { OrderRequest } from "@repo/packages/types/domain/order.type";
import { useNavigate } from "react-router-dom";

type DefaultOptionType = GetProp<CascaderProps, 'options'>[number];

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
};

const Checkout = () => {
    const { cartItems } = useCartStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const notify = useNotify();
    const { data: addressVNResponse, isLoading, isError } = useAddressStore();
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const shippingFee = 30000;

    const latestAddress = useMemo(() => {
        if (!user?.addresses || user.addresses.length === 0) return null;
        const latest = [...user.addresses].sort((a, b) => b.addressId - a.addressId)[0];
        return latest;
    }, [user]);

    const subTotal = cartItems.reduce((sum, item) => sum + item.realPrice * item.quantity, 0);

    const totalAmount = subTotal + shippingFee;

    const options = useMemo(() => {
        return addressVNResponse?.data ? mapAddressToCascaderOptions(addressVNResponse.data) : []
    }, [addressVNResponse]);

    const findAddressCodes = (addressLabel: string, options: CascaderProps['options']): (string | number)[] => {
        if (!options || !addressLabel) return [];

        const labels = addressLabel.split(' - ').reverse();

        const findInLevel = (levelOptions: CascaderProps['options'], targetLabels: string[], currentPath: (string | number)[] = []): (string | number)[] | null => {
            if (targetLabels.length === 0) return currentPath;

            const targetLabel = targetLabels[0];
            const found = levelOptions?.find(option => {
                const optionLabel = option.label?.toString().toLowerCase() || '';
                const targetLabelLower = targetLabel.toLowerCase();
                return optionLabel === targetLabelLower || optionLabel.includes(targetLabelLower);
            });

            if (found && found.value !== null && found.value !== undefined) {
                const newPath = [...currentPath, found.value];
                if (targetLabels.length === 1) {
                    return newPath;
                }
                return findInLevel(found.children || [], targetLabels.slice(1), newPath);
            }

            return null;
        };

        return findInLevel(options, labels) || [];
    };

    const initialAddressCodes = useMemo(() => {
        return findAddressCodes(latestAddress?.address!, options);
    }, [options, latestAddress]);

    useEffect(() => {
        if (initialAddressCodes.length > 0 && latestAddress?.address) {
            form.setFieldValue('addressCascader', initialAddressCodes);
            form.setFieldValue('address', latestAddress.address);
        }
    }, [initialAddressCodes, form, latestAddress]);

    const normalizeVietnamese = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const filter = (inputValue: string, path: DefaultOptionType[]) => path.some((option) => {
        const label = String(option.label);
        return normalizeVietnamese(label).includes(normalizeVietnamese(inputValue));
    });

    const handleCascaderChange = (_: any, selectedOptions: DefaultOptionType[]) => {
        if (selectedOptions && selectedOptions.length > 0) {
            const labels = selectedOptions.map(option => option.label).reverse();
            const addressString = labels.join(' - ');
            form.setFieldValue('address', addressString); // Bắt buộc!
        } else {
            form.setFieldValue('address', '');
        }
    };

    const mutationCreate = useMutation({
        mutationFn: orderApi.apis.create,
        onSuccess: () => {
            notify?.success({ message: "Đặt hàng thành công!" });
            queryClient.invalidateQueries({
                queryKey: [REPO_CONSTANT.QUERY_KEYS.order.base],
            });
            navigate("/portal/home")
        },
        onError: () => {
            notify?.error({ message: "Đặt hàng thất bại!" });
        },
    });

    const handleSubmitOrder = async () => {
        try {
            const values = await form.validateFields();

            const addressDetail = values.addressDetail || '';
            const address = values.address || '';

            const payload: OrderRequest = {
                totalPrice: totalAmount,
                address: addressDetail && address ? `${addressDetail} - ${address}` : addressDetail || address || '',
                phone: values.phoneNumber,
                status: 0,
                userId: user?.userId!,
                orderDetails: cartItems.map((item) => ({
                    productDetailSizeId: item.productDetailSizeId,
                    quantity: item.quantity
                }))
            };
            await mutationCreate.mutateAsync(payload);
        } catch (err: any) {
            console.error("Lỗi khi đặt hàng:", err);
        }
    };

    if (isLoading) return <span>Đang tải dữ liệu...</span>;
    if (isError) return <p style={{ color: 'red' }}>Không thể tải dữ liệu. Vui lòng thử lại.</p>;

    return (
        <div className="container">
            <Breadcrumb items={[{
                title: (<LinkBasic color="black" to={"/portal/cart"} ><LeftOutlined />
                    <span style={{ marginInlineStart: 5 }}>Quay về giỏ hàng</span></LinkBasic>)
            }]} style={{ marginBottom: 10 }} />
            <Row gutter={[16, 16]}>
                <Col span={16}>
                    <Card className="boxShadow">
                        <div className={styles["ckt__title"]}>Người đặt hàng</div>
                        <Form
                            key={user?.userId || 'no-user'}
                            name="checkout"
                            form={form}
                            initialValues={{
                                name: user?.fullname || '',
                                phoneNumber: latestAddress?.phone || '',
                                addressCascader: initialAddressCodes.length > 0 ? initialAddressCodes : [],
                                address: latestAddress?.address || '',
                                addressDetail: latestAddress?.addressDetail || '',
                                note: "",
                            }}
                            onFinish={handleSubmitOrder}
                        >
                            <Form.Item name="name" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
                                <Input prefix={<UserOutlined />} placeholder="Họ và tên" autoComplete="user" />
                            </Form.Item>
                            <Form.Item name="phoneNumber" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                                <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" autoComplete="phoneNumber" />
                            </Form.Item>
                            <Flex align="center" gap={16}>
                                <Form.Item name="addressDetail" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết!' }]}>
                                    <Input prefix={<EnvironmentOutlined />} placeholder="Địa chỉ chi tiết" autoComplete="addressDetail"
                                        style={{ width: 300 }} />
                                </Form.Item>
                                <Form.Item name="addressCascader" rules={[{ type: 'array', required: true, message: 'Vui lòng chọn địa chỉ!' }]}>
                                    <Cascader options={options} placeholder="Chọn tỉnh/thành phố, quận/huyện, phường/xã"
                                        showSearch={{ filter }} displayRender={(labels) => labels.reverse().join(' - ')}
                                        onChange={handleCascaderChange} expandTrigger="hover" allowClear style={{ width: 395 }} />
                                </Form.Item>
                            </Flex>
                            <Form.Item name="address" hidden>
                                <Input />
                            </Form.Item>
                            <Form.Item name="note">
                                <TextArea rows={4} placeholder="Ghi chú nếu có" />
                            </Form.Item>
                            <Button color="default" variant="solid" block style={{ marginTop: 10 }} htmlType="submit">
                                Đặt hàng ngay
                            </Button>
                        </Form>
                    </Card>
                    <Card className="boxShadow" style={{ marginTop: 10 }}>
                        <div className={styles["ckt__title"]}>Phương thức thanh toán</div>
                        <Radio.Group defaultValue={1} style={style} options={[{ value: 1, label: "Thanh toán khi giao hàng (COD)" }]} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="boxShadow">
                        <div className={styles["ckt__title"]}>Sản phẩm trong đơn</div>
                        <List>
                            <VirtualList data={cartItems} height={200} itemHeight={47} itemKey="id">
                                {(item) => (<List.Item>
                                    <Skeleton avatar title={false} loading={isLoading} active>
                                        <List.Item.Meta avatar={<Avatar src={item.imageUrl} />}
                                            title={<Tooltip title={item.productName}>
                                                <span className={styles["ckt__productName"]}>
                                                    {item.productName}
                                                </span>
                                            </Tooltip>}
                                            description={`${item.colorName} / ${item.size}`} />
                                        <div>{FormatCurrency(item.realPrice)}</div>
                                    </Skeleton>
                                </List.Item>)}
                            </VirtualList>
                        </List>
                    </Card>
                    <Card className="boxShadow" style={{ marginTop: 10 }}>
                        <Flex justify="space-between">
                            <Form.Item name="voucher">
                                <Input placeholder="Nhập mã ưu đãi" autoComplete="voucher" style={{ width: 220 }} />
                            </Form.Item>
                            <Button color="default" variant="solid">Áp dụng</Button>
                        </Flex>
                        <Divider style={{ margin: '0 0 15px 0', borderColor: 'rgba(175,175,175,.34)' }} />
                        <Flex vertical gap={10}>
                            <Flex justify="space-between">
                                <span>Tạm tính:</span>
                                <span>{FormatCurrency(subTotal)}</span>
                            </Flex>
                            <Flex justify="space-between">
                                <span>Phí vận chuyển:</span>
                                <span>{FormatCurrency(shippingFee)}</span>
                            </Flex>
                        </Flex>
                        <Divider style={{ margin: '15px 0', borderColor: 'rgba(175,175,175,.34)' }} />
                        <Flex justify="space-between">
                            <span>Tổng cộng</span>
                            <span>{FormatCurrency(totalAmount)}</span>
                        </Flex>
                        <Button color="default" variant="solid" block style={{ marginTop: 10 }}
                            onClick={handleSubmitOrder}>
                            Đặt hàng ngay</Button>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Checkout;