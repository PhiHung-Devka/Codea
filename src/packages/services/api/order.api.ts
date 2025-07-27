import { axiosInternalMethod } from "@repo/packages/libs";
import type { Order } from "@repo/packages/types";
import type { PagingFilterBody } from "@repo/packages/types/base/response.type";
import type { OrderRequest } from "@repo/packages/types/domain/order.type";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useQuery } from "@tanstack/react-query";
const _controllerPath = "/api/order";
const mergePath = (path: string) => `${_controllerPath}${path}`;

const readById = async (id: number) => {
    const resp = await axiosInternalMethod._get<Order>(mergePath(`/${id}`));
    return resp;
};
const paginationFilter = async (body: PagingFilterBody) => {
    const resp = await axiosInternalMethod._postPaging<Order>(mergePath("/page"), body);
    return resp;
}
const create = async (body: OrderRequest) => {
    const resp = await axiosInternalMethod._post<OrderRequest>(mergePath(""), body);
    return resp;
};
const update = async (id: number) => {
    const resp = await axiosInternalMethod._put(mergePath(`/${id}`));
    return resp;
};

const orderApi = {
    queries: {
        paginationFilterQuery: (body: PagingFilterBody, enabled: boolean) =>
            useQuery({
                queryKey: [REPO_CONSTANT.QUERY_KEYS.order.base, JSON.stringify(body)],
                queryFn: () => paginationFilter(body),
                enabled
            }),
        detailQuery: (id: number, enabled = true) =>
            useQuery({
                queryKey: [REPO_CONSTANT.QUERY_KEYS.order.detail, id],
                queryFn: () => readById(id),
                enabled
            }),
    },
    apis: { create, paginationFilter, readById, update }
};

export { orderApi };