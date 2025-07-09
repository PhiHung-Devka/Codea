import { axiosInternalMethod } from "@repo/packages/libs";
import type { Product, ProductDetailSize } from "@repo/packages/types";
import type { ProductDetailCreateBody, ProductDetailEditBody } from "@repo/packages/types/domain/product-detail.type";

const _controllerPath = "/api/size";
const mergePath = (path: string) => `${_controllerPath}${path}`;

const _delete = async (id: number) => {
    const resp = await axiosInternalMethod._delete<ProductDetailSize>(mergePath(`/${id}`));
    return resp;
}

const productDetaiSizelApi = {
    apis: { _delete }
};

export { productDetaiSizelApi };