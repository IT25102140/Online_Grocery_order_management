export interface BaseProduct {
    productId: string;
    productType: 'PERISHABLE' | 'NON_PERISHABLE';
    name: string;
    price: number;
    category?: string;
    imageUrl: string;
    description: string;
    expiryDate?: string;
}

export type Product = BaseProduct;

export interface CartItemType extends Product {
    quantity: number;
}
