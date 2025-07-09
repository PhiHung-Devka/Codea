import { axiosInternalMethod } from "@repo/packages/libs";
import type { Cart, CartMap } from "@repo/packages/types";
import type { CartCreateBody, CartEditBody } from "@repo/packages/types/domain/cart.type";
import REPO_CONSTANT from "@repo/packages/ultis/contants";
import { useQuery } from "@tanstack/react-query";

const _controllerPath = "/api/cart";
const mergePath = (path: string) => `${_controllerPath}${path}`;

const read = async (userId: number) => {
    const resp = await axiosInternalMethod._get<CartMap[]>(mergePath(`?userId=${userId}`));
    return resp;
};

const create = async (body: CartCreateBody) => {
    const resp = await axiosInternalMethod._post<Cart>(mergePath(""), body);
    return resp;
};

const edit = async (body: CartEditBody) => {
    const resp = await axiosInternalMethod._put<Cart>(mergePath(""), body);
    return resp;
};

const _delete = async (id: number) => {
    const resp = await axiosInternalMethod._delete<Cart>(mergePath(`/${id}`));
    return resp;
}

const cartApi = {
    queries: {
        readQuery: (userId: number) => useQuery({
            queryKey: [REPO_CONSTANT.QUERY_KEYS.cart.base],
            queryFn: () => read(userId),
            enabled: !!userId
        })
    },
    apis: { read, create, _delete, edit }
};

export { cartApi };