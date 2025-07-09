import type { ProductDetail } from "../base-model";

type ProductDetailCreateBody = Pick<ProductDetail, "color" | "galleries" | "sizes"> & { productId?: number };

type ProductDetailEditBody = ProductDetailCreateBody & Pick<ProductDetail, "productDetailId">;

export type { ProductDetailCreateBody, ProductDetailEditBody };