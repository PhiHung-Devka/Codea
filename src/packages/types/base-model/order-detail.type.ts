import type { ProductDetailSize } from "./product-detail-size.type";

type OrderDetail = {
    orderDetailId: number,
    orderId: number,
    productDetailSize: ProductDetailSize,
    quantity: number
}

export type { OrderDetail };