import TableBasic from "@repo/component/ui/table/TableBasic";
import { Button, Col, Flex, Row } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./Cart.module.scss";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuthStore } from "@repo/packages/stores";
import { FormatCurrency } from "@repo/packages/ultis/common/currency-format";
import useCartStore from "@repo/packages/stores/cart/use-cart-store";

const Cart = () => {
    const { user } = useAuthStore();
    const { cartItems, editCartItem, deleteCartItem } = useCartStore();

    const totalAmount = (cartItems ?? []).reduce((sum, item) => {
        return sum + item.realPrice * item.quantity;
    }, 0);

    const dataSource = (cartItems ?? []).map((item) => ({
        key: item.cartId.toString(),
        image: item.imageUrl,
        name: item.productName,
        color: item.colorName,
        size: item.size,
        price: item.realPrice,
        quantity: item.quantity,
        total: item.realPrice * item.quantity,
    }));

    const handleQuantityChange = (key: string, delta: number) => {
        const currentItem = cartItems?.find(item => item.cartId.toString() === key);
        if (!currentItem) return;
        const newQty = Math.max(1, currentItem.quantity + delta);

        editCartItem({
            cartId: currentItem.cartId,
            userId: user?.userId!,
            productDetailSizeId: currentItem.productDetailSizeId,
            quantity: newQty,
        });
    };

    const handleDelete = (id: number) => {
        deleteCartItem(id);
    };

    const columns: ColumnsType = [
        {
            key: "info",
            title: "Thông tin sản phẩm",
            dataIndex: "info",
            render: (_, record) => (
                <Flex align="center" gap={12}>
                    <img src={record.image} alt={record.name} style={{ width: 80 }} />
                    <Flex vertical>
                        <div>{record.name}</div>
                        <div>{record.color} / {record.size}</div>
                    </Flex>
                </Flex>
            ),
        },
        {
            key: "price",
            title: "Đơn giá",
            dataIndex: "price",
            align: 'center',
            render: (price: number) => <span style={{ color: "red", fontWeight: 600 }}>{FormatCurrency(price)}</span>,
        },
        {
            key: "quantity",
            title: "Số lượng",
            dataIndex: "quantity",
            align: 'center',
            render: (_: any, record: any) => (
                <Flex align="center" justify="center" className={styles["crt__qtyWrapper"]}>
                    <Flex align="center" justify="center" style={{ border: '1px solid #ebebeb', width: 120 }}>
                        <Button icon={<MinusOutlined />} type="text" onClick={() => handleQuantityChange(record.key, -1)} />
                        <input type="text" className={styles["crt__qtyWrapper--inputCts"]} value={record.quantity} readOnly />
                        <Button icon={<PlusOutlined />} type="text" onClick={() => handleQuantityChange(record.key, 1)} />
                    </Flex>
                </Flex>),
        },
        {
            key: "total",
            title: "Thành tiền",
            dataIndex: "total",
            align: 'center',
            render: (total: number) => <span style={{ color: "red", fontWeight: 600 }}>{FormatCurrency(total)}</span>,
            onCell: (record: any) => ({
                rowSpan: record.colorRowSpan,
            }),
        },
    ];

    return (
        <div className="container">
            <div className={styles["crt__headerCart"]}>Giỏ hàng của bạn</div>
            <TableBasic isCart isColumnsCenter columns={columns} dataSource={dataSource} actionItems={1} actionRender={(record) => (
                <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDelete(Number(record.key))}>Xóa</Button>
            )} />
            <Row className={styles["crt__footerCart"]}>
                <Col span={8} offset={16}>
                    <Flex align="center" justify="space-between">
                        <span className={styles["crt__footerCart--totalTitle"]}>Tổng:</span>
                        <span className={styles["crt__footerCart--totalValue"]}>{FormatCurrency(totalAmount)}</span>
                    </Flex>
                    <Link to={"/portal/checkout"}><Button block color="default" variant="solid">Thanh toán</Button></Link>
                </Col>
            </Row>
        </div>
    );
};

export default Cart;