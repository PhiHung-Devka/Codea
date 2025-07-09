import { axiosInternalMethod } from "@repo/packages/libs";
import type { Product } from "@repo/packages/types";
import type { ProductDetailCreateBody, ProductDetailEditBody } from "@repo/packages/types/domain/product-detail.type";

const _controllerPath = "/api/product-detail";
const mergePath = (path: string) => `${_controllerPath}${path}`;

const create = async (body: ProductDetailCreateBody) => {
    const resp = await axiosInternalMethod._post<Product>(mergePath(""), body);
    return resp;
};

const edit = async (body: ProductDetailEditBody) => {
    const resp = await axiosInternalMethod._put<Product>(mergePath(""), body);
    return resp;
};

const _delete = async (id: number) => {
    const resp = await axiosInternalMethod._delete<Product>(mergePath(`/${id}`));
    return resp;
}

const productDetailApi = {
    apis: { create, edit, _delete }
};

export { productDetailApi };