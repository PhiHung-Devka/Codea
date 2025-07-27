import type { OrderDetail } from "./order-detail.type";
import type { User } from "./user.type";

type Order = {
    orderId: number,
    totalPrice: number,
    date: Date,
    address: string,
    phone: string,
    status: number,
    user: User,
    voucherId: number,
    orderDetails: OrderDetail[]
}

export type { Order };