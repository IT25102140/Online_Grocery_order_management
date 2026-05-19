import { useEffect, useState } from 'react';

interface PaymentItem { paymentId: string; orderId: string; userId: string; amount: number; paymentMethod: string; paymentStatus: string; }

export function Payments() {
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/payments/all')
      .then(r => r.json()).then(setPayments).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Processing</h1>
      <p className="text-gray-500 mb-6">View all transactions and payment records.</p>
      {loading ? <p className="text-gray-400">Loading...</p> : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Payment ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Method</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.map(p => (
                <tr key={p.paymentId} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-mono text-sm text-gray-600">{p.paymentId}</td>
                  <td className="px-6 py-4 font-mono text-sm text-gray-600">{p.orderId}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">Rs. {p.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-500">{p.paymentMethod?.replace('_', ' ')}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-bold rounded-full ${p.paymentStatus === 'COMPLETED' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{p.paymentStatus}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          {payments.length === 0 && <p className="text-center py-12 text-gray-400">No payments found.</p>}
        </div>
      )}
    </div>
  );
}
