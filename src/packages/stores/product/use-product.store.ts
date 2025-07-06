import { useQuery } from '@tanstack/react-query';

export interface Product {
    id: string;
    img1: string;
    img2: string;
    name: string;
    price: number;
    realPrice: number;
    productDetail: string;
    quantity?: number;
}

// Mock API function - thay thế bằng API thực tế
const fetchProducts = async (): Promise<Product[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return Array.from({ length: 8 }, (_, i) => ({
        id: String(i + 1),
        img1: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-1.jpg?v=1744601195103",
        img2: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/img-0167-2.jpg?v=1744601195760",
        name: `Áo Polo Local Brand Unisex Teelab Pine Forests Polo AP069 - ${i + 1}`,
        price: 350000,
        realPrice: 195000,
        productDetail: "Đen / M",
        quantity: 1
    }));
};

export const useProductStore = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
}; 