import { EnvironmentOutlined, LeftOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { useAddressStore, useProductStore } from "@repo/packages/stores";
import { Avatar, Breadcrumb, Button, Card, Cascader, Col, Divider, Flex, Form, Input, List, Radio, Row, Skeleton, Tooltip, type CascaderProps, type GetProp } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useMemo, useEffect } from "react";
import VirtualList from 'rc-virtual-list';
import styles from "./Checkout.module.scss";
import { mapAddressToCascaderOptions } from "@repo/packages/ultis/address/address.mapper";
import { Link } from "react-router-dom";

type DefaultOptionType = GetProp<CascaderProps, 'options'>[number];

const userAddress = {
    name: 'Nguyễn Văn A',
    phoneNumber: '0123456789',
    addressLabel: 'Cà Ná - Thuận Nam - Ninh Thuận',
    note: 'Giao giờ hành chính',
};

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
};

const Checkout = () => {
    const { data: addressVNResponse, isLoading, isError } = useAddressStore();
    const { data: products = [], isLoading: productsLoading, isError: productsError } = useProductStore();
    const [form] = Form.useForm();

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
        return findAddressCodes(userAddress.addressLabel, options);
    }, [options]);

    useEffect(() => {
        if (initialAddressCodes.length > 0) {
            form.setFieldValue('addressCascader', initialAddressCodes);
            form.setFieldValue('address', userAddress.addressLabel);
        }
    }, [initialAddressCodes, form]);

    if (isLoading || productsLoading) return <span>Đang tải dữ liệu...</span>;
    if (isError || productsError) return <p style={{ color: 'red' }}>Không thể tải dữ liệu. Vui lòng thử lại.</p>;

    const normalizeVietnamese = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const filter = (inputValue: string, path: DefaultOptionType[]) => path.some((option) => {
        const label = String(option.label);
        return normalizeVietnamese(label).includes(normalizeVietnamese(inputValue));
    });

    const handleCascaderChange = (_: (string | number | null)[], selectedOptions: DefaultOptionType[]) => {
        if (selectedOptions && selectedOptions.length > 0) {
            const labels = selectedOptions.map(option => option.label).reverse();
            const addressString = labels.join(' - ');
            form.setFieldValue('address', addressString);
        } else {
            form.setFieldValue('address', '');
        }
    };

    return (
        <div className="container">
            <Breadcrumb items={[{
                href: '/portal/cart', title: (<div style={{ color: 'black' }}><LeftOutlined />
                    <span style={{ marginInlineStart: 5 }}>Quay về giỏ hàng</span></div>)
            }]} style={{ marginBottom: 10 }} />
            <Row gutter={[16, 16]}>
                <Col span={16}>
                    <Card className="boxShadow">
                        <div className={styles["ckt__title"]}>Người đặt hàng</div>
                        <Form name="checkout" initialValues={{
                            name: userAddress.name,
                            phoneNumber: userAddress.phoneNumber,
                            addressCascader: initialAddressCodes.length > 0 ? initialAddressCodes : [],
                            address: userAddress.addressLabel,
                            note: userAddress.note,
                        }}>
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
                        </Form>
                    </Card>
                    <Card className="boxShadow" style={{ marginTop: 10 }}>
                        <div className={styles["ckt__title"]}>Phương thức thanh toán</div>
                        <Radio.Group style={style} options={[{ value: 1, label: "Thanh toán khi giao hàng (COD)" }]} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="boxShadow">
                        <div className={styles["ckt__title"]}>Sản phẩm trong đơn</div>
                        <List>
                            <VirtualList data={products} height={200} itemHeight={47} itemKey="id">
                                {(item) => (<List.Item>
                                    <Skeleton avatar title={false} loading={productsLoading} active>
                                        <List.Item.Meta avatar={<Avatar src={item.img1} />}
                                            title={<Tooltip title={item.name}>
                                                <Link to={`/portal/product/${item.id}`} className={styles["ckt__productName"]}>
                                                    {item.name}
                                                </Link>
                                            </Tooltip>}
                                            description={item.productDetail} />
                                        <div>{item.realPrice.toLocaleString()}đ</div>
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
                                <span>225.000đ</span>
                            </Flex>
                            <Flex justify="space-between">
                                <span>Phí vận chuyển:</span>
                                <span>30.000đ</span>
                            </Flex>
                        </Flex>
                        <Divider style={{ margin: '15px 0', borderColor: 'rgba(175,175,175,.34)' }} />
                        <Flex justify="space-between">
                            <span>Tổng cộng</span>
                            <span>255.000đ</span>
                        </Flex>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Checkout;