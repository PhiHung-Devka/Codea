import { axiosInternalMethod } from "@repo/packages/libs";
import type { Social } from "@repo/packages/types/base-model/social.type";
import type { PagingFilterBody } from "@repo/packages/types/base/response.type";
import type { SocialCreateBody, SocialEditBody } from "@repo/packages/types/domain/social.type";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useQuery } from "@tanstack/react-query";

const _controllerPath = "/api/social";
const mergePath = (path: string) => `${_controllerPath}${path}`;

const paginationFilter = async (body: PagingFilterBody) => {
    const resp = await axiosInternalMethod._postPaging<Social>(mergePath("/page"), body);
    return resp;
};

const read = async () => {
    const resp = await axiosInternalMethod._get<Social[]>(mergePath(""));
    return resp;
};

const create = async (body: SocialCreateBody) => {
    const resp = await axiosInternalMethod._post<Social>(mergePath(""), body);
    return resp;
};

const edit = async (body: SocialEditBody) => {
    const resp = await axiosInternalMethod._put<Social>(mergePath(`/${body.socialId}`), body);
    return resp;
};

const _delete = async (id: number) => {
    const resp = await axiosInternalMethod._delete<Social>(mergePath(`/${id}`));
    return resp;
}

const socialApi = {
    queries: {
        readQuery: () => useQuery({
            queryKey: [REPO_CONSTANT.QUERY_KEYS.social.findAll],
            queryFn: () => read()
        }),
        paginationFilterQuery: (body: PagingFilterBody, enabled: boolean) =>
            useQuery({
                queryKey: [REPO_CONSTANT.QUERY_KEYS.social.base, JSON.stringify(body)],
                queryFn: () => paginationFilter(body),
                enabled
            })
    },
    apis: { paginationFilter, read, create, edit, _delete }
};

export { socialApi };