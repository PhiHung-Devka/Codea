import { axiosInternalMethod } from "@repo/packages/libs";
import type { Category } from "@repo/packages/types";
import type { PagingFilterBody } from "@repo/packages/types/base/response.type";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useQuery } from "@tanstack/react-query";

const _controllerPath = "/api/category";
const mergePath = (path: string) => `${_controllerPath}${path}`;

const paginationFilter = async (body: PagingFilterBody) => {
    const resp = await axiosInternalMethod._postPaging<Category>(mergePath("/page"), body);
    return resp;
};

const read = async () => {
    const resp = await axiosInternalMethod._get<Category[]>(mergePath(""));
    return resp;
};

// const create = async (body: ProductCreateBody) => {
//     const resp = await axiosInternalMethod._post<Product>(mergePath(""), body);
//     return resp;
// };

// const edit = async (body: ProductEditBody) => {
//     const resp = await axiosInternalMethod._put<Product>(mergePath(`/${body.productId}`), body);
//     return resp;
// };

// const _delete = async (id: number) => {
//     const resp = await axiosInternalMethod._delete<Product>(mergePath(`/${id}`));
//     return resp;
// }

const categoryApi = {
    queries: {
        paginationFilterQuery: (body: PagingFilterBody, enabled: boolean) =>
            useQuery({
                queryKey: [REPO_CONSTANT.QUERY_KEYS.banner.base, JSON.stringify(body)],
                queryFn: () => paginationFilter(body),
                enabled
            }),
        readQuery: () => useQuery({
            queryKey: [REPO_CONSTANT.QUERY_KEYS.product.findAll],
            queryFn: () => read()
        })
    },
    apis: { paginationFilter, read }
};

export { categoryApi };