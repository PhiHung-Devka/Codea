type ProductCreateBody = {
    name: string;
    categoryId: number;
    status: number;
    date: Date;
};

type ProductEditBody = ProductCreateBody & {
    productId: number;
};

export type { ProductCreateBody, ProductEditBody };