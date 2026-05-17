import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function MyCart() {
  const { cartItems, cartTotal } = useCart();

  return (
    <div className="space-y-4">
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-400 text-lg font-medium">Your cart is empty.</p>
          <Link to="/" className="text-primary-600 font-bold hover:underline mt-2 inline-block">Start Shopping</Link>
        </div>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.productId} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="font-bold text-gray-900">{item.name}</p>
                <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
              </div>
              <p className="font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between items-center">
            <span className="font-bold text-gray-900">Total</span>
            <span className="text-2xl font-black text-gray-900">${cartTotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="block w-full bg-primary-600 hover:bg-primary-500 text-white text-center font-bold py-3 rounded-xl shadow-lg transition-all">Proceed to Checkout</Link>
        </>
      )}
    </div>
  );
}
