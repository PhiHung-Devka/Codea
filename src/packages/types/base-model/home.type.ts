type ProductPreview = {
    productId: number;
    name: string;
    realPrice: number;
    price: number;
    images: string[];
};

type HomeProduct = {
    label: string;
    products: ProductPreview[];
};

export type { HomeProduct, ProductPreview };
