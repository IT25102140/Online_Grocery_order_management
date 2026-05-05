import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import type { Product } from '../types';

interface NavbarProps {
    onCartClick: () => void;
}

export function Navbar({ onCartClick }: NavbarProps) {
    const { cartCount } = useCart();
    const { isLoggedIn, user, logout } = useAuth();
    const location = useLocation();

    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/api/products/all')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Failed to load products for search", err));
    }, []);

    const isActive = (path: string) => location.pathname === path;
    const navItemClass = (path: string) => `
    text-sm font-bold transition-colors ${isActive(path) ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}
  `;

    const filteredProducts = searchQuery
        ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || (p.category || '').toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    return (
        <nav className="glass-panel sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between border-b border-gray-100/50">
            {/* Brand & Left Navigation */}
            <div className="flex items-center gap-10">
                <Link to="/" className="flex items-center gap-2 group focus:outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-primary-500">
                    <div className="bg-primary-600 text-white p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-sm shadow-primary-600/20">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 tracking-tight">
                        FreshCart
                    </span>
                </Link>

                <div className="hidden lg:flex items-center gap-8 relative">
                    <Link to="/" className={navItemClass('/')}>Home</Link>
                    <Link to="/categories" className={navItemClass('/categories')}>Categories</Link>
                    <Link to="/about" className={navItemClass('/about')}>About Us</Link>
                    <Link to="/contact" className={navItemClass('/contact')}>Contact</Link>
                </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full text-gray-400 focus-within:text-primary-600 group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary-600">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                        className="block w-full pl-11 pr-3 py-2.5 border border-gray-200 rounded-full leading-5 bg-gray-50/50 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 sm:text-sm transition-all duration-300"
                        placeholder="Search our fresh catalog..."
                    />
                    
                    {/* Search Results Dropdown */}
                    {isSearchFocused && searchQuery && (
                        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                            {filteredProducts.length > 0 ? (
                                <ul className="max-h-80 overflow-y-auto">
                                    {filteredProducts.map(product => (
                                        <li key={product.productId}>
                                            <Link 
                                                to={`/product/${product.productId}`}
                                                className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                                                onClick={() => {
                                                    setSearchQuery('');
                                                    setIsSearchFocused(false);
                                                }}
                                            >
                                                <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">{product.name}</p>
                                                    <p className="text-primary-600 font-bold text-xs">${product.price.toFixed(2)}</p>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-4 text-center text-gray-500 text-sm">
                                    No products found for "{searchQuery}"
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
                {isLoggedIn ? (
                    <div className="hidden sm:flex items-center gap-3 mr-2">
                        <Link to="/myaccount" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary-600 transition-colors px-2">
                            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-black">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <span className="hidden md:inline">{user?.name?.split(' ')[0]}</span>
                        </Link>
                        <button onClick={logout} className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors px-2">
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div className="hidden sm:flex items-center gap-3 mr-2">
                        <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-primary-600 transition-colors px-2">
                            Log In
                        </Link>
                        <Link to="/register" className="text-sm font-bold bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-xl transition-colors shadow-sm shadow-primary-600/20">
                            Sign Up
                        </Link>
                    </div>
                )}

                {/* Mobile Menu Button */}
                <button className="lg:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>

                {/* Cart Icon */}
                <button
                    onClick={onCartClick}
                    className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg group"
                    aria-label="Toggle cart"
                >
                    <div className="group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    {cartCount > 0 && (
                        <span className="absolute top-1 right-1 inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 text-[10px] font-black leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full border-2 border-white shadow-sm">
                            {cartCount > 99 ? '99+' : cartCount}
                        </span>
                    )}
                </button>
            </div>
        </nav>
    );
}
