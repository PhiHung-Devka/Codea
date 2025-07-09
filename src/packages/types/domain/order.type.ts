type OrderDetailRequest = {
    productDetailSizeId: number;
    quantity: number;
};

type OrderRequest = {
    totalPrice: number;
    address: string;
    phone: string;
    status: number;
    userId: number;
    voucherId?: number;
    orderDetails: OrderDetailRequest[];
};

export type { OrderDetailRequest, OrderRequest };