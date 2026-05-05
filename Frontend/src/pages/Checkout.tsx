import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in or register to proceed with checkout.");
      window.location.href = '/login';
      return;
    }
    setIsProcessing(true);
    
    try {
      const newOrderId = 'O-' + Date.now().toString().slice(-6);
      const newPaymentId = 'PAY-' + Date.now().toString().slice(-6);

      // 1. Place Order first (since payment needs orderId)
      const addressInput = (e.target as any).elements[2]?.value || 'Default Address'; // fallback
      
      const orderRes = await fetch('http://localhost:8080/api/orders/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          orderId: newOrderId,
          userId: user.userId, 
          cartId: `C-${user.userId}`, 
          status: 'PENDING',
          shippingAddress: addressInput,
          orderDate: new Date().toISOString().split('T')[0]
        })
      });

      if (!orderRes.ok) throw new Error('Order placement failed');

      // 2. Process Payment
      const paymentRes = await fetch('http://localhost:8080/api/payments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          paymentId: newPaymentId,
          orderId: newOrderId,
          userId: user.userId, 
          amount: cartTotal, 
          paymentMethod: 'CREDIT_CARD',
          paymentStatus: 'COMPLETED'
        })
      });

      if (!paymentRes.ok) throw new Error('Payment processing failed');

      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-6 text-center animate-fade-in">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm shadow-green-100/50">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Payment Successful!</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
          Thank you for choosing FreshCart. Your order has been placed and is currently being processed. You will receive an email confirmation shortly.
        </p>
        <Link 
          to="/"
          className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-1 inline-flex items-center gap-2 focus:ring-4 focus:ring-primary-500/50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          Return Home
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-6 text-center animate-fade-in">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 text-lg mb-8">Looks like you haven't added any fresh groceries to your cart yet.</p>
        <Link to="/" className="text-primary-600 font-bold hover:text-primary-700 hover:underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">Secure Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Payment Forms */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Shipping Detail Section */}
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm">1</span>
              Shipping Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">First Name</label>
                <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Last Name</label>
                <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Address Line 1</label>
                <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">City</label>
                <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Zip / Postal Code</label>
                <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
            </div>
          </section>

          {/* Payment Method Section */}
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm">2</span>
              Payment Gateway
            </h2>

            <form onSubmit={handlePayment} className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Cardholder Name</label>
                <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" placeholder="John Doe" />
              </div>
              <div className="space-y-1 relative">
                <label className="text-sm font-semibold text-gray-700">Card Number</label>
                <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-12 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none font-mono" placeholder="0000 0000 0000 0000" maxLength={19} />
                <div className="absolute right-4 top-8 flex gap-1">
                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Expiry Date</label>
                  <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none font-mono tracking-widest" placeholder="MM/YY" maxLength={5} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">CVC</label>
                  <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none font-mono tracking-widest" placeholder="123" maxLength={4} />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-6">
                 <button 
                  type="submit" 
                  disabled={isProcessing}
                  className={`w-full text-white font-bold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg flex justify-center items-center gap-2 ${
                    isProcessing ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-500 shadow-primary-600/30 hover:-translate-y-1 focus:ring-4 focus:ring-primary-500/50'
                  }`}
                 >
                   {isProcessing ? (
                     <>
                       <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                       Processing Protocol...
                     </>
                   ) : (
                     `Pay $${Math.max(0, cartTotal).toFixed(2)} Securely`
                   )}
                 </button>
                 <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Payments are encrypted and secured with end-to-end TLS.
                 </p>
              </div>
            </form>

          </section>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-gray-50/50 border border-gray-100 rounded-3xl p-6 md:p-8 sticky top-24">
             <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
             
             <div className="space-y-4 max-h-64 overflow-y-auto pr-2 mb-6 cart-scrollbar">
               {cartItems.map((item) => (
                 <div key={item.productId} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                    <div className="flex-1">
                       <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                       <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                       <p className="text-primary-600 font-bold text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                 </div>
               ))}
             </div>

             <div className="border-t border-gray-200 pt-6 space-y-3">
               <div className="flex justify-between text-gray-600 text-sm">
                 <span>Subtotal</span>
                 <span className="font-semibold">${cartTotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-gray-600 text-sm">
                 <span>Taxes & Fees</span>
                 <span className="font-semibold">$0.00</span>
               </div>
               <div className="flex justify-between text-gray-600 text-sm">
                 <span>Shipping</span>
                 <span className="font-semibold text-green-600">Free</span>
               </div>

               <div className="pt-4 mt-4 border-t border-gray-200 flex justify-between items-center">
                 <span className="font-bold text-gray-900">Total</span>
                 <span className="text-2xl font-black text-gray-900">${cartTotal.toFixed(2)}</span>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
