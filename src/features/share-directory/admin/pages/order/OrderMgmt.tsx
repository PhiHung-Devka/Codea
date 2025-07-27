import { DownOutlined } from "@ant-design/icons";
import { RenderCondition } from "@repo/component/ui/common/RenderCondition";
import { useNotify } from "@repo/component/ui/notification/Notification";
import TableBasic from "@repo/component/ui/table/TableBasic";
import { usePaginationParams } from "@repo/packages/hooks/pagination/use-pagination-params.hook";
import { orderApi } from "@repo/packages/services/api/order.api";
import type { Order } from "@repo/packages/types";
import { FormatCurrency } from "@repo/packages/ultis/common/currency-format";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dropdown, Flex, type MenuProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const OrderMgmt = () => {
    const { pageIndex, pageSize, pagingObj } = usePaginationParams({
        defaultPageIndex: 1, defaultPageSize: 20, readyUpdate: false,
    });
    const productQuery = orderApi.queries.paginationFilterQuery({ ...pagingObj }, true);
    const queryClient = useQueryClient();
    const notify = useNotify();

    const mutationUpdate = useMutation({
        mutationFn: (id: number) => orderApi.apis.update(id),
        onSuccess: () => {
            notify?.success({ message: "Cập nhật trạng thái thành công!" });
            queryClient.invalidateQueries({ queryKey: [REPO_CONSTANT.QUERY_KEYS.order.base] });
        },
        onError: () => notify?.error({ message: "Cập nhật trạng thái thất bại!" }),
    });

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Đã giao hàng',
            onClick: () => {
                const selectedOrder = productQuery.data?.records.find(order => order.status === 0);
                if (selectedOrder) {
                    mutationUpdate.mutate(selectedOrder.orderId);
                }
            },
        },
    ];

    const columns: ColumnsType<Order> = [
        {
            key: "order",
            title: "Hóa đơn",
            dataIndex: "info",
            render: (_, record) =>
                // <LinkBasic to={`/admin/product/${record.orderId}`}>
                <span>#{record.orderId}</span>,
            // {/* </LinkBasic>, */ }
            width: 90
        },
        {
            key: "phone",
            title: "Số điện thoại",
            dataIndex: "phone",
            render: (_, record) => <span>{record.phone}</span>,
            width: 120
        },
        {
            key: "address",
            title: "Địa chỉ",
            dataIndex: "address",
            render: (_, record) => <span>{record.address}</span>,
        },
        {
            key: "totalPrice",
            title: "Tổng tiền",
            dataIndex: "totalPrice",
            render: (_, record) => <span>{FormatCurrency(record.totalPrice)}</span>,
        },
        {
            key: "date",
            title: "Ngày đặt",
            dataIndex: "date",
            render: (_, record) => dayjs(record.date).format("DD/MM/YYYY"),
        },
        {
            key: "status",
            title: "Trạng thái",
            dataIndex: "status",
            render: (_, record) => <Flex justify="center" align="center" gap={5}>
                <span>{record.status === 1 ? 'Đã giao hàng' : 'Đang xử lí'}</span>
                <RenderCondition condition={record.status === 0}>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()} style={{ color: 'black' }}>
                            <DownOutlined />
                        </a>
                    </Dropdown>
                </RenderCondition>
            </Flex>,
            align: 'center'
        }
    ];

    return (
        <TableBasic columns={columns} loading={productQuery.isPending || productQuery.isFetching}
            dataSource={productQuery.data?.records || []} rowKey="productId" pageIndex={pageIndex} pageSize={pageSize}
            actionItems={1}
        />
    );
}

export default OrderMgmt;