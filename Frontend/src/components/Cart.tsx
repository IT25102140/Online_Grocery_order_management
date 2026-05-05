import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
    const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Slide-over panel */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col pointer-events-auto overflow-hidden animate-slide-in">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p className="text-lg font-medium">Your cart is empty</p>
                            <button
                                onClick={onClose}
                                className="text-primary-600 font-semibold hover:text-primary-700 hover:underline"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.productId} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-xl"
                                />
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                                            <button
                                                onClick={() => removeFromCart(item.productId)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                        <p className="text-primary-600 font-black text-sm">${item.price.toFixed(2)}</p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm">
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-l-lg transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium text-gray-900">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-r-lg transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-500 font-medium">Total</span>
                            <span className="text-2xl font-black text-gray-900">
                                ${cartTotal.toFixed(2)}
                            </span>
                        </div>
                        <button 
                            onClick={() => {
                                onClose();
                                navigate('/checkout');
                            }}
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3.5 px-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-primary-600/30 flex items-center justify-center gap-2"
                        >
                            Proceed to Checkout
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
