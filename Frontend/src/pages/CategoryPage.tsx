import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import type { Product } from '../types';

export function CategoryPage() {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const categoryNameMap: Record<string, string> = {
        'produce': 'Produce',
        'dairy': 'Dairy & Eggs',
        'meat': 'Meat & Seafood',
        'bakery': 'Bakery',
        'pantry': 'Pantry Staples',
        'snacks': 'Snacks & Candy',
        'beverages': 'Beverages',
        'frozen': 'Frozen Foods'
    };

    const categoryTitle = categoryId ? categoryNameMap[categoryId] || categoryId : 'Products';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/products/all');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                
                // Filter products based on category title
                const filtered = data.filter((p: Product) => 
                    p.category?.toLowerCase() === categoryTitle.toLowerCase()
                );
                
                setProducts(filtered);
            } catch (err) {
                console.error('Failed to load products', err);
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        fetchProducts();
    }, [categoryId, categoryTitle]);

    return (
        <section className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
            {/* Breadcrumb */}
            <nav className="mb-8">
                <Link
                    to="/categories"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-600 transition-colors font-medium border border-gray-200 px-4 py-2 rounded-full text-sm bg-white shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Categories
                </Link>
            </nav>

            <div className="mb-10">
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                    {categoryTitle}
                </h2>
                <p className="mt-2 text-lg text-gray-500">
                    Showing results for {categoryTitle}.
                </p>
            </div>

            {loading ? (
                <div className="text-center py-12 text-lg text-gray-500">Loading {categoryTitle}...</div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.productId} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
                    <p className="text-xl text-gray-500">We couldn't find any items in this category yet.</p>
                </div>
            )}
        </section>
    );
}
