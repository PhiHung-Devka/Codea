type Cart = {
    cartId: number,
    userId: number,
    productDetailSizeId: number,
    quantity: number
}

type CartMap = {
    cartId: number,
    quantity: number,
    productDetailSizeId: number,
    size: string,
    price: number,
    realPrice: number,
    colorName: string,
    productName: string,
    imageUrl: string
}

export type { Cart, CartMap };