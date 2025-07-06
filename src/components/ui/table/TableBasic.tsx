import type { TableBasicProps } from "@repo/packages/types"
import { ConfigProvider, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { NotFoundTable } from "../common/NotFoundTable";

type TableHeaderLabelProps = { label: string };

const table = {
    // độ dài của mỗi action của table (nhân thêm số lượng action)
    actionSizeSingle: 50,
    // độ dài của cột STT nếu có
    orderNumberWidth: 76,
};

const TableHeaderLabel = ({ label }: TableHeaderLabelProps) => {
    return <span>{label}</span>
};

const TableBasic = ({ showOrderNumber = true, pageIndex, pageSize, pagination = false, columns, isCart, isColumnsCenter,
    className = "", isUseActionDefault = true, actionItems, isStickyAction = true, actionRender, ...props }: TableBasicProps) => {
    const _columns = (columns || []).map((x) => {
        const _title = typeof x.title === "string" ? (<TableHeaderLabel label={x.title} />) : (x.title);
        return { ...x, title: _title }
    });

    if (isUseActionDefault && actionItems && actionItems > 0 && actionRender) {
        _columns.push({
            title: "Tác vụ",
            width: table.actionSizeSingle * actionItems,
            fixed: isStickyAction ? "right" : false,
            align: isColumnsCenter ? "center" : "start",
            render: (value, record, index) => (
                <Space>{actionRender(value, record, index)}</Space>
            ),
        });
    }

    const _columnsMerged: ColumnsType = (showOrderNumber && !isCart) ? [
        {
            key: "orderNumber",
            title: <TableHeaderLabel label="STT" />,
            width: table.orderNumberWidth,
            align: isColumnsCenter ? "center" : "start",
            render: (_, __, index) => (pageIndex! - 1) * pageSize! + index + 1
        }, ..._columns] : _columns;


    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg: "#F4F6FA",
                        headerBorderRadius: 0,
                        rowExpandedBg: "#EAF2FF",
                        rowSelectedHoverBg: "#EAF2FF",
                        cellPaddingBlock: 8
                    },
                },
            }}
            renderEmpty={() => {
                return <NotFoundTable />;
            }}>
            <div style={{ border: '1px solid #DDE4EE', overflow: 'hidden', borderRadius: 8, borderBottom: 'none' }}>
                <Table {...props} columns={_columnsMerged} pagination={pagination} className={className} />
            </div>
        </ConfigProvider>
    );
};

export default TableBasic;