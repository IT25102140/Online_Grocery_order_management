import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartItemType } from '../types';


interface CartContextType {
    cartItems: CartItemType[];
    addToCart: (product: Product) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

import { useAuth } from './AuthContext';

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const { user } = useAuth();

    // Load initial cart from local storage for fast render
    useEffect(() => {
        if (user) {
            const stored = localStorage.getItem(`freshcart_cart_${user.userId}`);
            if (stored) {
                try {
                    setCartItems(JSON.parse(stored));
                } catch {}
            }
        } else {
            setCartItems([]);
        }
    }, [user]);

    // Sync cart to local storage and backend API whenever it changes
    useEffect(() => {
        if (user && cartItems.length >= 0) { // Always save to keep in sync
            localStorage.setItem(`freshcart_cart_${user.userId}`, JSON.stringify(cartItems));
            
            // Sync to backend
            const backendCart = {
                cartId: `C-${user.userId}`,
                userId: user.userId,
                items: cartItems.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity
                })),
                totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
            };

            fetch('http://localhost:8080/api/carts/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(backendCart)
            }).catch(err => console.error('Failed to sync cart to backend', err));
        }
    }, [cartItems, user]);

    const addToCart = async (product: Product) => {
        if (!user) {
            alert("Please log in to add items to your cart.");
            return;
        }
        setCartItems(prev => {
            const existing = prev.find(item => item.productId === product.productId);
            if (existing) {
                return prev.map(item =>
                    item.productId === product.productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 } as CartItemType];
        });
    };

    const removeFromCart = async (productId: string) => {
        setCartItems(prev => prev.filter(item => item.productId !== productId));
    };

    const updateQuantity = async (productId: string, quantity: number) => {
        if (quantity < 1) {
            await removeFromCart(productId);
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                item.productId === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    const cartTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const cartCount = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
