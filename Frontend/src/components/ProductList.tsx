import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';

export function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/products/all');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setProducts(data);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center py-12 text-lg text-gray-500">Loading fresh groceries...</div>;
    }

    if (error) {
        return <div className="text-center py-12 text-lg text-red-500">Error: {error}</div>;
    }

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Fresh Groceries
                </h2>
                <p className="mt-2 text-lg text-gray-500">
                    Hand-picked daily for the best quality and taste.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
        </section>
    );
}
