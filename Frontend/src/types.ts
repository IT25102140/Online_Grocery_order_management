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

export interface SupplierItem {
  itemId: string;
  name: string;
  quantity: number;
  wholesalePrice: number;
}

export interface Supplier {
  supplierId: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  items: SupplierItem[];
}
