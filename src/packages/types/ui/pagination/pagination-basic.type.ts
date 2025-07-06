import type { PaginationProps } from "antd";

type PaginationBasicProps = Omit<
  PaginationProps,
  | "showLessItems"
  | "showQuickJumper"
  | "showSizeChanger"
  | "total"
  | "current"
> & {
  total: number;
  current: number;
  resetWhenChangePageSize?: boolean;
};

export type { PaginationBasicProps };
