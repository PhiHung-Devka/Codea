import { useMergedSearchParams } from "@repo/packages/types/hook/common";
import type { PaginationParamsOptions } from "@repo/packages/types/hook/pagination/pagination-params.type";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useMemo, useCallback, useEffect, useState } from "react";

const { pagination } = REPO_CONSTANT.PROP_KEYS;
const keyIndex = pagination.pageIndex;
const keySize = pagination.pageSize;

export function usePaginationParams({
    defaultPageIndex = REPO_CONSTANT.DEFAUL_VALUES.pagination.pageIndex,
    defaultPageSize = REPO_CONSTANT.DEFAUL_VALUES.pagination.pageSize,
    readyUpdate }: PaginationParamsOptions) {
    const { current: searchParams, updateSearchParams } = useMergedSearchParams();
    const [isReady, setIsReady] = useState(false);

    // 1. Set default nếu chưa có
    useEffect(() => {
        if (!readyUpdate) return;

        const _pageIndexValue = Number(searchParams.get(keyIndex));
        const _pageSizeValue = Number(searchParams.get(keySize));

        let needUpdate = false;

        if (
            !searchParams.has(keyIndex) ||
            isNaN(_pageIndexValue) ||
            _pageIndexValue < 1
        ) {
            needUpdate = true;
        }

        if (
            !searchParams.has(keySize) ||
            isNaN(_pageSizeValue) ||
            _pageSizeValue < 1
        ) {
            needUpdate = true;
        }

        // console.log('needUpdate---------', needUpdate, searchParams)
        if (needUpdate) {
            updateSearchParams((params) => {
                params.set(keyIndex, defaultPageIndex.toString());
                params.set(keySize, defaultPageSize.toString());
            });
        } else {
            setIsReady(true); // URL đã đầy đủ pageIndex, pageSize
        }
    }, [
        readyUpdate,
        searchParams,
        keyIndex,
        keySize,
        defaultPageIndex,
        defaultPageSize,
    ]);

    // 2. Theo dõi searchParams để set isReady sau khi update xong
    useEffect(() => {
        if (!readyUpdate) return;

        const currentPageIndex = searchParams.get(keyIndex);
        const currentPageSize = searchParams.get(keySize);

        if (currentPageIndex && currentPageSize) {
            setIsReady(true);
        }
    }, [readyUpdate, searchParams, keyIndex, keySize]);

    // 3. Parse giá trị từ URL
    const pageIndex = useMemo(() => {
        const raw = searchParams.get(keyIndex);
        const v = raw !== null ? parseInt(raw, 10) : NaN;
        return isNaN(v) || v < 1 ? defaultPageIndex : v;
    }, [searchParams, keyIndex, defaultPageIndex]);

    const pageSize = useMemo(() => {
        const raw = searchParams.get(keySize);
        const v = raw !== null ? parseInt(raw, 10) : NaN;
        return isNaN(v) || v < 1 ? defaultPageSize : v;
    }, [searchParams, keySize, defaultPageSize]);

    // 4. Setter cập nhật URL
    const setPageIndex = useCallback(
        (newIndex: number) => {
            updateSearchParams((params) => {
                params.set(keyIndex, newIndex.toString());
            });
        },
        [keyIndex, updateSearchParams],
    );

    const setPageSize = useCallback(
        (newSize: number) => {
            updateSearchParams((params) => {
                params.set(keySize, newSize.toString());
            });
        },
        [keySize, updateSearchParams],
    );

    const resetPagination = useCallback(
        (newValues?: PaginationParamsOptions) => {
            updateSearchParams((params) => {
                if (newValues) {
                    params.set(keyIndex, newValues.defaultPageIndex!.toString());
                    params.set(keySize, newValues.defaultPageSize!.toString());
                } else {
                    params.set(keyIndex, defaultPageIndex.toString());
                    params.set(keySize, defaultPageSize.toString());
                }
            });
        },
        [keyIndex, keySize, defaultPageIndex, defaultPageSize, updateSearchParams],
    );

    return {
        pageIndex,
        pageSize,
        pagingObj: {
            pageIndex: pageIndex,
            pageSize: pageSize,
        },
        setPageIndex,
        setPageSize,
        resetPagination,
        isReadyPaging: isReady,
    };
}
