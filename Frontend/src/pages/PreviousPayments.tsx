import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface PaymentItem {
  paymentId: string; orderId: string; amount: number;
  paymentMethod: string; paymentStatus: string;
}

export function PreviousPayments() {
  const { user } = useAuth();
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:8080/api/payments/user/${user.userId}`, {
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
      .then(r => r.json()).then(setPayments).catch(console.error).finally(() => setLoading(false));
  }, [user]);

  if (loading) return <div className="text-center py-12 text-gray-400 font-medium">Loading payments...</div>;

  return (
    <div className="space-y-4">
      {payments.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-400 text-lg font-medium">No previous payments found.</p>
        </div>
      ) : payments.map(p => (
        <div key={p.paymentId} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-bold text-gray-900 font-mono text-sm">{p.paymentId}</p>
            <p className="text-gray-500 text-sm">Order: {p.orderId}</p>
            <p className="text-gray-400 text-xs">{p.paymentMethod?.replace('_', ' ')}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-black text-gray-900">${p.amount.toFixed(2)}</p>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.paymentStatus === 'COMPLETED' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{p.paymentStatus}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
