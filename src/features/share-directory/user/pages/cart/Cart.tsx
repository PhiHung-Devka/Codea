import TableBasic from "@repo/component/ui/table/TableBasic";
import { Button, Card, Col, Flex, Row } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./Cart.module.scss";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
    const [dataSource, setDataSource] = useState([
        {
            key: "1",
            image: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-1.jpg?v=1744601195103",
            name: "Áo Thun Local Brand Unisex Teelab Keyboard Tshirt TS330",
            color: "Trắng",
            size: "M",
            price: 250000,
            quantity: 1,
            total: 250000,
        },
    ]);

    const handleQuantityChange = (key: string, delta: number) => {
        setDataSource(prev => prev.map(item => item.key === key ? {
            ...item, quantity: Math.max(1, item.quantity + delta),
            total: item.price * Math.max(1, item.quantity + delta),
        } : item));
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
            render: (price: number) => <span style={{ color: "red", fontWeight: 600 }}>{price.toLocaleString()}đ</span>,
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
            render: (total: number) => <span style={{ color: "red", fontWeight: 600 }}>{total.toLocaleString()}đ</span>,
        },
    ];

    return (
        <div className="container">
            <div className={styles["crt__headerCart"]}>Giỏ hàng của bạn</div>
            <TableBasic isCart isColumnsCenter columns={columns} dataSource={dataSource} actionItems={1} actionRender={(_) => (
                <Button type="primary" danger icon={<DeleteOutlined />}>Xóa</Button>
            )} />
            <Row className={styles["crt__footerCart"]}>
                <Col span={8} offset={16}>
                    <Flex align="center" justify="space-between">
                        <span className={styles["crt__footerCart--totalTitle"]}>Tổng:</span>
                        <span className={styles["crt__footerCart--totalValue"]}>250,000đ</span>
                    </Flex>
                    <Link to={"/portal/checkout"}><Button block color="default" variant="solid">Thanh toán</Button></Link>
                </Col>
            </Row>
        </div>
    );
};

export default Cart;