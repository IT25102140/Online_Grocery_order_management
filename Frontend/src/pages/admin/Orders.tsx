import { useEffect, useState } from 'react';

interface OrderItem { orderId: string; userId: string; cartId: string; status: string; shippingAddress: string; orderDate: string; }

export function Orders() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/orders/all')
      .then(r => r.json()).then(setOrders).catch(console.error).finally(() => setLoading(false));
  }, []);

  const statusColor = (s: string) => {
    if (s === 'DELIVERED') return 'bg-green-50 text-green-700';
    if (s === 'SHIPPED') return 'bg-blue-50 text-blue-700';
    if (s === 'PROCESSING') return 'bg-orange-50 text-orange-700';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="p-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Orders Management</h1>
      <p className="text-gray-500 mb-6">Track and manage all customer orders.</p>
      {loading ? <p className="text-gray-400">Loading...</p> : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">User</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Address</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map(o => (
                <tr key={o.orderId} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-mono text-sm text-gray-600">{o.orderId}</td>
                  <td className="px-6 py-4 font-mono text-sm text-gray-600">{o.userId}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{o.shippingAddress}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{o.orderDate}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-bold rounded-full ${statusColor(o.status)}`}>{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && <p className="text-center py-12 text-gray-400">No orders found.</p>}
        </div>
      )}
    </div>
  );
}
