import type { Category } from "./category.type";
import type { ProductDetail } from "./product-detail.type";

type Product = {
    productId: number;
    category: Category;
    name: string;
    status: number;
    date: Date;
    productDetails: ProductDetail[]
};

export type { Product };