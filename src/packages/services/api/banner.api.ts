import { axiosInternalMethod } from "@repo/packages/libs";
import type { Banner } from "@repo/packages/types";
import type { PagingFilterBody } from "@repo/packages/types/base/response.type";
import type { BannerCreateBody, BannerEditBody } from "@repo/packages/types/domain/banner.type";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useQuery } from "@tanstack/react-query";

const _controllerPath = "/api/banner";
const mergePath = (path: string) => `${_controllerPath}${path}`;

const paginationFilter = async (body: PagingFilterBody) => {
    const resp = await axiosInternalMethod._postPaging<Banner>(mergePath("/page"), body);
    return resp;
};

const read = async () => {
    const resp = await axiosInternalMethod._get<Banner[]>(mergePath(""));
    return resp;
};

const create = async (body: BannerCreateBody) => {
    const resp = await axiosInternalMethod._post<Banner>(mergePath(""), body);
    return resp;
};

const edit = async (body: BannerEditBody) => {
    const resp = await axiosInternalMethod._put<Banner>(mergePath(`/${body.bannerId}`), body);
    return resp;
};

const _delete = async (id: number) => {
    const resp = await axiosInternalMethod._delete<Banner>(mergePath(`/${id}`));
    return resp;
}

const bannerApi = {
    queries: {
        readQuery: () => useQuery({
            queryKey: [REPO_CONSTANT.QUERY_KEYS.banner.findAll],
            queryFn: () => read()
        }),
        paginationFilterQuery: (body: PagingFilterBody, enabled: boolean) =>
            useQuery({
                queryKey: [REPO_CONSTANT.QUERY_KEYS.banner.base, JSON.stringify(body)],
                queryFn: () => paginationFilter(body),
                enabled
            })
    },
    apis: { paginationFilter, read, create, edit, _delete }
};

export { bannerApi };