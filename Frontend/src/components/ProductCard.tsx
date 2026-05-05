import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart, cartItems } = useCart();

    // Check how many of this item are already in the cart
    const cartItem = cartItems.find((item) => item.productId === product.productId);
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    return (
        <div className="bg-white rounded-2xl overflow-hidden card-hover border border-gray-100 flex flex-col h-full group">

            <Link to={`/product/${product.productId}`} className="flex-1 flex flex-col focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-t-2xl">
                {/* Image Container with aspect ratio */}
                <div className="relative w-full pt-[75%] overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-gray-700 shadow-sm z-10">
                        {product.category}
                    </div>
                </div>

                {/* Content */}
                <div className="px-5 pt-5 pb-2 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2 gap-2">
                        <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">
                            {product.name}
                        </h3>
                        <span className="text-lg font-black text-primary-600">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>

                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
                        {product.description}
                    </p>
                </div>
            </Link>

            {/* Action Button */}
            <div className="px-5 pb-5 mt-auto">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white py-2.5 rounded-xl font-semibold transition-colors duration-200"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add to Cart
                    {quantityInCart > 0 && (
                        <span className="ml-1 bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded-full group-hover:bg-primary-500 group-hover:text-white transition-colors">
                            {quantityInCart}
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}
