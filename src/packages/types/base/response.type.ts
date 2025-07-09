type PagingFilterBody = {
    pageIndex: number;
    pageSize: number;
    categoryId?: number;
};

type PagingFilterResult<T> = {
    totalRecords: number;
    totalPages: number;
    pageSize: number;
    pageIndex: number;
    records: T[];
};

export type { PagingFilterBody, PagingFilterResult };