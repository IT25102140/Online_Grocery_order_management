import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import type { Product } from '../types';

export function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();
    const [localQuantity, setLocalQuantity] = useState(1);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/products/all`);
                if (res.ok) {
                    const data: Product[] = await res.json();
                    const found = data.find(p => p.productId === id);
                    setProduct(found || null);
                }
            } catch (error) {
                console.error("Failed to load product", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center py-24">Loading product details...</div>;

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-24 text-center h-screen flex flex-col items-center justify-center space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Product Not Found</h2>
                <p className="text-gray-500 max-w-md">We couldn't find the product you're looking for. It may have been removed or the link is incorrect.</p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 hover:underline"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Return to All Products
                </Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        // Add item (or simulate multiple adds via context depending on implementation)
        // Here we'll just loop until quantity is fulfilled for simplicity with existing context API
        for (let i = 0; i < localQuantity; i++) {
            addToCart(product);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-24 md:py-16 animate-fade-in relative">
            {/* Dynamic Background Blob */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none -z-10"></div>

            {/* Breadcrumb Navigation */}
            <nav className="mb-12">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-600 transition-colors font-medium border border-gray-200 px-4 py-2 rounded-full text-sm bg-white shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Groceries
                </Link>
            </nav>

            {/* Product Split Layout */}
            <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100/50 overflow-hidden lg:grid lg:grid-cols-2 lg:gap-8">

                {/* Left: Image Container */}
                <div className="relative aspect-square w-full lg:aspect-auto h-[400px] lg:h-full bg-gray-50/50 flex items-center justify-center p-8 group">
                    <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                        <span className="bg-white/90 backdrop-blur-sm text-primary-700 text-sm font-bold px-4 py-2 rounded-full shadow-sm">
                            {product.category}
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full w-fit">
                            100% Organic
                        </span>
                    </div>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-3xl shadow-xl transition-transform duration-700 hover:scale-[1.03] border border-gray-200"
                    />
                </div>

                {/* Right: Details Container */}
                <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-center gap-8">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
                            {product.name}
                        </h1>
                        <p className="text-3xl font-black text-primary-600 mb-6 flex items-baseline gap-2">
                            ${product.price.toFixed(2)}
                            <span className="text-lg text-gray-400 font-medium line-through">${(product.price * 1.25).toFixed(2)}</span>
                        </p>

                        <div className="prose prose-lg text-gray-500 max-w-none">
                            <p className="leading-relaxed">
                                {product.description}
                            </p>
                            <p className="mt-4 leading-relaxed text-sm text-gray-400 border-l-2 border-primary-200 pl-4">
                                Sourced direct from our partner farms. Harvested at the peak of ripeness to guarantee the ultimate flavor and nutritional value.
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="border-gray-100" />

                    {/* Actions Container */}
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4">

                            {/* Quantity Selector */}
                            <div className="flex-shrink-0 flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-2 h-16 w-36 shadow-inner">
                                <button
                                    onClick={() => setLocalQuantity(Math.max(1, localQuantity - 1))}
                                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-primary-600 hover:bg-white rounded-xl transition-colors font-medium text-2xl focus:outline-none"
                                >
                                    -
                                </button>
                                <span className="w-10 text-center text-xl font-bold text-gray-900 select-none">
                                    {localQuantity}
                                </span>
                                <button
                                    onClick={() => setLocalQuantity(localQuantity + 1)}
                                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-primary-600 hover:bg-white rounded-xl transition-colors font-medium text-2xl focus:outline-none"
                                >
                                    +
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-primary-600 hover:bg-primary-500 text-white font-bold text-xl h-16 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-primary-600/30 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-primary-500/50"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Add {localQuantity} to Cart • ${(product.price * localQuantity).toFixed(2)}
                            </button>
                        </div>
                    </div>

                    {/* Footer Features */}
                    <div className="grid grid-cols-2 gap-4 pt-6 mt-2 bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center gap-4 text-gray-600">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <span className="block text-sm font-bold text-gray-900">In Stock</span>
                                <span className="block text-xs text-gray-500">Ready to ship</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-600">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                <svg className="w-6 h-6 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                            </div>
                            <div>
                                <span className="block text-sm font-bold text-gray-900">Fast Delivery</span>
                                <span className="block text-xs text-gray-500">Under 2 hours</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
