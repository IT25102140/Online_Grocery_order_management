export function Contact() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 animate-fade-in relative">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                    Get in Touch
                </h1>
                <p className="text-lg text-gray-500">
                    Have a question about your order, our sourcing practices, or just want to say hello? We'd love to hear from you.
                </p>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row">

                {/* Left Side: Contact Form */}
                <div className="flex-1 p-8 md:p-12 lg:p-16 space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Send a Message</h2>
                        <p className="text-gray-500 text-sm">Our team will get back to you within 24 hours.</p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    placeholder="John"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-sm font-semibold text-gray-700">Message</label>
                            <textarea
                                id="message"
                                rows={5}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                                placeholder="How can we help you today?"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold text-lg py-4 rounded-xl transition-all duration-300 transform shadow-lg shadow-primary-600/30 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-primary-500/50"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Right Side: Contact Information Visuals */}
                <div className="flex-1 bg-gradient-to-br from-primary-900 to-primary-700 text-white p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
                    {/* Decorative Pattern Background */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10 pointer-events-none">
                        <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor">
                            <circle cx="50" cy="50" r="40" />
                        </svg>
                    </div>

                    <div className="relative z-10 space-y-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                            <p className="text-primary-100 font-medium">Reach out to us directly via phone or email during business hours.</p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-xl">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm text-primary-200 mb-1">Phone Support</p>
                                    <p className="text-lg font-bold">1 (800) 555-0199</p>
                                    <p className="text-sm text-primary-200 mt-1">Mon-Fri 8am to 6pm EST</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-xl">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm text-primary-200 mb-1">Email Address</p>
                                    <p className="text-lg font-bold">hello@freshcart.example.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-xl">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm text-primary-200 mb-1">Headquarters</p>
                                    <p className="text-lg font-bold">123 Market Street<br />San Francisco, CA 94105</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
