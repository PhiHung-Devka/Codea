import { axiosInternalMethod } from "@repo/packages/libs";
import type { OrderRequest } from "@repo/packages/types/domain/order.type";
const _controllerPath = "/api/order";
const mergePath = (path: string) => `${_controllerPath}${path}`;

const create = async (body: OrderRequest) => {
    const resp = await axiosInternalMethod._post<OrderRequest>(mergePath(""), body);
    return resp;
};

const orderApi = {
    apis: { create }
};

export { orderApi };