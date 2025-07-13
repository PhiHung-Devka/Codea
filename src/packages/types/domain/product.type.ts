type ProductCreateBody = {
    name: string;
    categoryId: number;
    status: number;
    date: Date;
    description: string;
};

type ProductEditBody = ProductCreateBody & {
    productId: number;
};

export type { ProductCreateBody, ProductEditBody };