export function About() {
    return (
        <div className="bg-white px-6 py-16 md:py-24 animate-fade-in">
            {/* Our Story Header */}
            <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
                    Nurturing Communities,<br />One Delivery at a Time.
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    We bring farm-fresh organic produce and daily essentials right to your doorstep, cutting out the middlemen to ensure peak freshness and fair prices for local farmers.
                </p>
            </div>

            {/* Split Content section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-24">
                <div className="bg-gray-100 rounded-3xl aspect-square md:aspect-auto md:h-[600px] overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"
                        alt="Farm fresh produce"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="space-y-8">
                    <div>
                        <span className="text-primary-600 font-bold tracking-wider uppercase text-sm">Our Mission</span>
                        <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">Quality without Compromise</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Started in 2026, FreshCart was built on a simple belief: everyone deserves access to fresh, healthy, and organic food. Our mission is to bridge the gap between local sustainable farms and your kitchen table.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Sustainably Sourced</h2>
                        <p className="text-gray-600 leading-relaxed text-lg mb-6">
                            We partner directly with over 50 local farmers and sustainable brands to ensure that every apple, loaf of bread, and gallon of milk meets our rigorous standards. Better for the earth, better for you.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-gray-700 font-medium">
                                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                100% Organic Produce
                            </li>
                            <li className="flex items-center gap-3 text-gray-700 font-medium">
                                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Zero-Emission Delivery Fleet
                            </li>
                            <li className="flex items-center gap-3 text-gray-700 font-medium">
                                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Fair Trade Certified
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Team / Behind the Scenes Placeholder */}
            <div className="max-w-7xl mx-auto text-center bg-gray-50 rounded-3xl py-16 px-6 border border-gray-100">
                <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Team</span>
                <h2 className="text-3xl font-bold text-gray-900 mb-12">The People Behind FreshCart</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Team Member 1 */}
                    <div className="space-y-4">
                        <div className="w-48 h-48 mx-auto bg-gray-200 rounded-full overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" alt="Sarah J" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Sarah Jenkins</h3>
                            <p className="text-primary-600 font-medium">Founder & CEO</p>
                        </div>
                    </div>

                    {/* Team Member 2 */}
                    <div className="space-y-4">
                        <div className="w-48 h-48 mx-auto bg-gray-200 rounded-full overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" alt="Michael C" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Michael Chen</h3>
                            <p className="text-primary-600 font-medium">Head of Sourcing</p>
                        </div>
                    </div>

                    {/* Team Member 3 */}
                    <div className="space-y-4 sm:col-span-2 md:col-span-1">
                        <div className="w-48 h-48 mx-auto bg-gray-200 rounded-full overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400" alt="Emma T" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Emma Thompson</h3>
                            <p className="text-primary-600 font-medium">Lead Logistics</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
