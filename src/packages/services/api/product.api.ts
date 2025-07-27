import { axiosInternalMethod } from "@repo/packages/libs";
import type { Product } from "@repo/packages/types";
import type { PagingFilterBody } from "@repo/packages/types/base/response.type";
import type { ProductCreateBody, ProductEditBody } from "@repo/packages/types/domain/product.type";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useQuery } from "@tanstack/react-query";

const _controllerPath = "/api/product";
const mergePath = (path: string) => `${_controllerPath}${path}`;

const paginationFilter = async (body: PagingFilterBody) => {
    const resp = await axiosInternalMethod._postPaging<Product>(mergePath("/page"), body);
    return resp;
};

const readById = async (id: number) => {
    const resp = await axiosInternalMethod._get<Product>(mergePath(`/${id}`));
    return resp;
}

const create = async (body: ProductCreateBody) => {
    const resp = await axiosInternalMethod._post<Product>(mergePath(""), body);
    return resp;
};

const edit = async (body: ProductEditBody) => {
    const resp = await axiosInternalMethod._put<Product>(mergePath(`/${body.productId}`), body);
    return resp;
};

const _delete = async (id: number) => {
    const resp = await axiosInternalMethod._delete<Product>(mergePath(`/${id}`));
    return resp;
}

const productApi = {
    queries: {
        paginationFilterQuery: (body: PagingFilterBody, enabled: boolean) =>
            useQuery({
                queryKey: [REPO_CONSTANT.QUERY_KEYS.product.base, JSON.stringify(body)],
                queryFn: () => paginationFilter(body),
                enabled
            }),
        detailQuery: (id: number, enabled = true) =>
            useQuery({
                queryKey: [REPO_CONSTANT.QUERY_KEYS.product.detail, id],
                queryFn: () => readById(id),
                enabled
            }),
    },
    apis: { paginationFilter, create, edit, _delete }
};

export { productApi };