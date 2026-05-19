import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface User { userId: string; name: string; email: string; role: string; }

export function Customers() {
  const { admin } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    fetch('http://localhost:8080/api/admin/customers', {
      headers: { 'Authorization': `Bearer ${admin?.token}` }
    }).then(r => r.json()).then(setUsers).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(fetchUsers, [admin]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this customer?')) return;
    await fetch(`http://localhost:8080/api/admin/customers/${id}`, {
      method: 'DELETE', headers: { 'Authorization': `Bearer ${admin?.token}` }
    });
    fetchUsers();
  };

  return (
    <div className="p-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Customer Management</h1>
      <p className="text-gray-500 mb-6">View and manage all registered users.</p>
      {loading ? <p className="text-gray-400">Loading...</p> : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map(u => (
                <tr key={u.userId} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-mono text-sm text-gray-600">{u.userId}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{u.name}</td>
                  <td className="px-6 py-4 text-gray-500">{u.email}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-full">{u.role}</span></td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(u.userId)} className="text-red-500 hover:text-red-700 text-sm font-bold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p className="text-center py-12 text-gray-400">No customers found.</p>}
        </div>
      )}
    </div>
  );
}
