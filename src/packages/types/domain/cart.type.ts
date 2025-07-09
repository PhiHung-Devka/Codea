import type { Cart } from "../base-model";

type CartCreateBody = Pick<Cart, "productDetailSizeId" | "quantity" | "userId">;

type CartEditBody = CartCreateBody & Pick<Cart, "cartId">;

export type { CartCreateBody, CartEditBody };