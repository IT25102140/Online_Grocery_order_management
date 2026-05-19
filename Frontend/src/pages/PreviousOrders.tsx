import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface OrderItem {
  orderId: string; userId: string; cartId: string; status: string;
  shippingAddress: string; orderDate: string;
}

export function PreviousOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:8080/api/orders/user/${user.userId}`, {
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
      .then(r => r.json()).then(setOrders).catch(console.error).finally(() => setLoading(false));
  }, [user]);

  const statusColor = (s: string) => {
    if (s === 'DELIVERED') return 'bg-green-50 text-green-700';
    if (s === 'SHIPPED') return 'bg-blue-50 text-blue-700';
    if (s === 'PROCESSING') return 'bg-orange-50 text-orange-700';
    return 'bg-gray-100 text-gray-600';
  };

  if (loading) return <div className="text-center py-12 text-gray-400 font-medium">Loading orders...</div>;

  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-400 text-lg font-medium">No previous orders found.</p>
        </div>
      ) : orders.map(order => (
        <div key={order.orderId} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-bold text-gray-900 font-mono text-sm">{order.orderId}</p>
            <p className="text-gray-500 text-sm">{order.shippingAddress}</p>
            <p className="text-gray-400 text-xs">{order.orderDate}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor(order.status)}`}>{order.status}</span>
        </div>
      ))}
    </div>
  );
}
