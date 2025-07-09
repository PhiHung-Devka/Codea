import type { TableProps } from "antd";
import type React from "react";

type TableBasicProps<T> = Omit<TableProps<T>, "expandable"> & {
    showOrderNumber?: boolean;
    pageIndex?: number;
    pageSize?: number;
    isUseActionDefault?: boolean;
    isCart?: boolean;
    actionItems?: number;
    isStickyAction?: boolean;
    isColumnsCenter?: boolean;
    actionRender?: (value: any, record: any, index: number) => React.ReactNode;
};

export type { TableBasicProps };