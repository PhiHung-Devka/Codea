// import { orderApi } from "@repo/packages/services/api/order.api";
// import type { Order } from "@repo/packages/types";
// import type { ColumnsType } from "antd/es/table";
// import { useParams } from "react-router-dom";

// const OrderDetail = () => {
//     const { id } = useParams<{ id: string }>();
//     const orderId = Number(id);
//     const productQuery = orderApi.queries.detailQuery(orderId, !!orderId);

//     const columns: ColumnsType<Order> = [
//         {
//             key: "order",
//             title: "Hóa đơn",
//             dataIndex: "info",
//             render: (_, record) => <LinkBasic to={`/admin/product/${record.orderId}`}>#{record.orderId}</LinkBasic>,
//             width: 90
//         },
//         {
//             key: "phone",
//             title: "Số điện thoại",
//             dataIndex: "phone",
//             render: (_, record) => <span>{record.phone}</span>,
//             width: 120
//         },
//         {
//             key: "address",
//             title: "Địa chỉ",
//             dataIndex: "address",
//             render: (_, record) => <span>{record.address}</span>,
//         },
//         {
//             key: "totalPrice",
//             title: "Tổng tiền",
//             dataIndex: "totalPrice",
//             render: (_, record) => <span>{FormatCurrency(record.totalPrice)}</span>,
//         },
//         {
//             key: "date",
//             title: "Ngày đặt",
//             dataIndex: "date",
//             render: (_, record) => dayjs(record.date).format("DD/MM/YYYY"),
//         },
//         {
//             key: "status",
//             title: "Trạng thái",
//             dataIndex: "status",
//             render: (_, record) => <Flex justify="center" align="center" gap={5}>
//                 <span>{record.status === 1 ? 'Đã giao hàng' : 'Đang xử lí'}</span>
//                 <Dropdown menu={{ items }} trigger={['click']}>
//                     <a onClick={(e) => e.preventDefault()} style={{ color: 'black' }}>
//                         <Space>
//                             <DownOutlined />
//                         </Space>
//                     </a>
//                 </Dropdown>
//             </Flex>,
//             align: 'center'
//         }
//     ];

//     return (
//         <div>
//             <h1>Order Detail Page</h1>
//         </div>
//     );
// };

// export default OrderDetail;