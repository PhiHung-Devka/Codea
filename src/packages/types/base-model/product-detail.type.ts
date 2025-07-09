import type { Color } from "./color.type";
import type { Gallery } from "./gallery.type";
import type { ProductDetailSize } from "./product-detail-size.type";

type ProductDetail = {
    productDetailId?: number,
    sizes: ProductDetailSize[],
    galleries: Gallery[],
    color: Color
}

export type { ProductDetail };