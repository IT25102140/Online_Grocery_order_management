import { useState } from 'react';
import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Cart } from './Cart';
import { Footer } from './Footer';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-primary-100 selection:text-primary-900">
            <Navbar onCartClick={() => setIsCartOpen(true)} />

            <main className="flex-1 flex flex-col">
                {children}
            </main>

            <Footer />

            <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </div>
    );
}
