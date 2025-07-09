import type { HomeProduct, Product } from "../../base-model";

type ProductListProps = {
    products: HomeProduct[] | Product[];
    source?: "home" | "category";
};

export type { ProductListProps };