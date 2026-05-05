import { Link } from 'react-router-dom';
import { ProductList } from '../components/ProductList';

export function Home() {
    return (
        <div className="flex flex-col gap-16 md:gap-24 w-full animate-fade-in overflow-hidden">

            {/* 1. Hero Section (Split Screen / Large Banner Style) */}
            <section className="relative w-full min-h-[80vh] flex items-center pt-24 pb-12 overflow-hidden bg-primary-900 border-b-8 border-primary-500">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000"
                        alt="Abundant fresh organic vegetables"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            New: Spring Harvest Collection
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
                            Fresh, Organic <br />
                            <span className="text-primary-400">Groceries</span><br />
                            Delivered to Your Door.
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed font-medium">
                            Shop locally sourced produce and daily essentials. Grown with care, delivered with speed, directly from farm to table.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="bg-primary-500 hover:bg-primary-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl shadow-primary-500/30 transform hover:-translate-y-1">
                                Shop Now
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1">
                                View Offers
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Features / Value Proposition */}
            <section className="max-w-7xl mx-auto px-6 w-full -mt-24 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-start gap-4 transform transition-transform hover:-translate-y-2">
                        <div className="bg-primary-50 p-4 rounded-2xl text-primary-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Free Same-Day Delivery</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">On all orders over $50 placed before 2 PM.</p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-start gap-4 transform transition-transform hover:-translate-y-2">
                        <div className="bg-primary-50 p-4 rounded-2xl text-primary-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">100% Organic</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Certified organic and locally sourced products.</p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-start gap-4 transform transition-transform hover:-translate-y-2">
                        <div className="bg-primary-50 p-4 rounded-2xl text-primary-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Secure Payments</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Protected with enterprise-grade encryption.</p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-start gap-4 transform transition-transform hover:-translate-y-2">
                        <div className="bg-primary-50 p-4 rounded-2xl text-primary-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">24/7 Support</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Our friendly team is always here to help you.</p>
                    </div>

                </div>
            </section>

            {/* 3. Shop by Category (Interactive Grid) */}
            <section className="max-w-7xl mx-auto px-6 w-full">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Shop by Category</h2>
                        <p className="text-gray-500 mt-2">Explore our wide selection of premium groceries.</p>
                    </div>
                    <Link to="/categories" className="hidden sm:inline-flex text-primary-600 font-bold hover:text-primary-700 items-center gap-1 group">
                        View All Categories
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <Link to="/categories/produce" className="group relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow block">
                        <img src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800" alt="Produce" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                        <div className="absolute inset-x-0 bottom-0 p-6">
                            <h3 className="text-2xl font-bold text-white mb-1">Produce</h3>
                            <p className="text-gray-200 text-sm font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">Shop Farm Fresh ➔</p>
                        </div>
                    </Link>
                    <Link to="/categories/dairy" className="group relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow block">
                        <img src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=800" alt="Dairy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                        <div className="absolute inset-x-0 bottom-0 p-6">
                            <h3 className="text-2xl font-bold text-white mb-1">Dairy & Eggs</h3>
                            <p className="text-gray-200 text-sm font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">Shop Dairy ➔</p>
                        </div>
                    </Link>
                    <Link to="/categories/meat" className="group relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow block">
                        <img src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=800" alt="Meat" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                        <div className="absolute inset-x-0 bottom-0 p-6">
                            <h3 className="text-2xl font-bold text-white mb-1">Meat & Seafood</h3>
                            <p className="text-gray-200 text-sm font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">Shop Meats ➔</p>
                        </div>
                    </Link>
                    <Link to="/categories/bakery" className="group relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow block">
                        <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800" alt="Bakery" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                        <div className="absolute inset-x-0 bottom-0 p-6">
                            <h3 className="text-2xl font-bold text-white mb-1">Bakery</h3>
                            <p className="text-gray-200 text-sm font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">Shop Fresh Baked ➔</p>
                        </div>
                    </Link>
                </div>
            </section>

            {/* 4. Trending Products / Featured */}
            <section className="bg-white border-y border-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-6 mb-2">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Trending This Week</h2>
                    <p className="text-gray-500 mt-2">Our most popular items loved by customers.</p>
                </div>
                {/* Override the internal padding of ProductList slightly to fit into this flow better */}
                <div className="[-mt-8]">
                    <ProductList />
                </div>
            </section>

            {/* 5. Testimonials / Social Proof */}
            <section className="max-w-7xl mx-auto px-6 w-full">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 tracking-tight mb-12">What Our Customers Say</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div>
                            <div className="flex text-yellow-400 mb-4">
                                {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                            </div>
                            <p className="text-gray-700 italic mb-6">"Absolutely the best grocery delivery service I've ever used. The produce is always incredibly fresh and the delivery is always on time."</p>
                        </div>
                        <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-lg">AJ</div>
                            <div>
                                <p className="font-bold text-gray-900">Amanda Jackson</p>
                                <p className="text-sm text-gray-500">Verified Buyer</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div>
                            <div className="flex text-yellow-400 mb-4">
                                {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                            </div>
                            <p className="text-gray-700 italic mb-6">"I love finding locally sourced meats and dairy on here. The interface is beautiful and making an order takes literal seconds."</p>
                        </div>
                        <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-lg">MR</div>
                            <div>
                                <p className="font-bold text-gray-900">Marcus Robertson</p>
                                <p className="text-sm text-gray-500">Verified Buyer</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div>
                            <div className="flex text-yellow-400 mb-4">
                                {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                            </div>
                            <p className="text-gray-700 italic mb-6">"The customer support is top notch. Had a slight issue with a missing item and they credited my account immediately. Extremely happy."</p>
                        </div>
                        <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-lg">SK</div>
                            <div>
                                <p className="font-bold text-gray-900">Sarah Klein</p>
                                <p className="text-sm text-gray-500">Verified Buyer</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 6. Newsletter Banner */}
            <section className="mt-8 mb-24 px-6 max-w-7xl mx-auto w-full">
                <div className="bg-primary-900 rounded-[2.5rem] p-10 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Decorative SVG Pattern */}
                    <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                        <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor" className="text-white">
                            <circle cx="50" cy="50" r="40" />
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-2xl text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                            Get 10% Off Your First Order
                        </h2>
                        <p className="text-primary-100 text-lg">
                            Subscribe to our newsletter for weekly fresh arrivals, exclusive offers, and delicious seasonal recipes.
                        </p>
                    </div>

                    <div className="relative z-10 w-full max-w-md">
                        <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 bg-white/10 text-white placeholder-primary-200 border border-white/20 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm transition-all"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-white text-primary-900 font-bold rounded-xl px-8 py-4 hover:bg-primary-50 transition-colors shadow-lg"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p className="text-primary-300 text-xs mt-3 text-center lg:text-left">We respect your privacy. Unsubscribe at any time.</p>
                    </div>
                </div>
            </section>

        </div>
    );
}
