import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Supplier } from '../../types';

export function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Supplier | null>(null);
  const [isNew, setIsNew] = useState(false);

  const emptySupplier: Supplier = {
    supplierId: '',
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    status: 'ACTIVE',
    items: []
  };

  const fetchSuppliers = () => {
    fetch('http://localhost:8080/api/suppliers/all')
      .then(res => res.json())
      .then(setSuppliers)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSave = async () => {
    if (!editing) return;
    const url = isNew ? 'http://localhost:8080/api/suppliers/add' : 'http://localhost:8080/api/suppliers/update';
    const method = isNew ? 'POST' : 'PUT';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing)
      });
      setEditing(null);
      setIsNew(false);
      setLoading(true);
      fetchSuppliers();
    } catch (error) {
      console.error('Failed to save supplier', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this supplier?')) return;
    try {
      await fetch(`http://localhost:8080/api/suppliers/${id}`, { method: 'DELETE' });
      setLoading(true);
      fetchSuppliers();
    } catch (error) {
      console.error('Failed to delete supplier', error);
    }
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Supplier Management</h1>
          <p className="text-gray-500 mt-1">Manage wholesale suppliers and their inventory.</p>
        </div>
        <button
          onClick={() => {
            setEditing({ ...emptySupplier, supplierId: 'S-' + Date.now().toString().slice(-6) });
            setIsNew(true);
          }}
          className="bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Supplier
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{isNew ? 'Add New Supplier' : 'Edit Supplier'}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm font-semibold text-gray-700 block mb-1">Company Name</label>
                <input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-semibold text-gray-700 block mb-1">Contact Person</label>
                <input value={editing.contactPerson} onChange={e => setEditing({ ...editing, contactPerson: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
              <div className="col-span-1">
                <label className="text-sm font-semibold text-gray-700 block mb-1">Email</label>
                <input type="email" value={editing.email} onChange={e => setEditing({ ...editing, email: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
              <div className="col-span-1">
                <label className="text-sm font-semibold text-gray-700 block mb-1">Phone</label>
                <input value={editing.phone} onChange={e => setEditing({ ...editing, phone: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-semibold text-gray-700 block mb-1">Address</label>
                <input value={editing.address} onChange={e => setEditing({ ...editing, address: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
              <div className="col-span-1">
                <label className="text-sm font-semibold text-gray-700 block mb-1">Supplier ID</label>
                <input value={editing.supplierId} disabled={!isNew} onChange={e => setEditing({ ...editing, supplierId: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none disabled:opacity-50" />
              </div>
              <div className="col-span-1">
                <label className="text-sm font-semibold text-gray-700 block mb-1">Status</label>
                <select value={editing.status} onChange={e => setEditing({ ...editing, status: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none">
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-6">
              <button onClick={handleSave} className="flex-1 bg-primary-600 hover:bg-primary-500 text-white font-bold py-2.5 rounded-xl transition-colors">{isNew ? 'Create Supplier' : 'Save Changes'}</button>
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Items Provided</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {suppliers.map(s => (
                  <tr key={s.supplierId} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900">{s.name}</div>
                      <div className="text-xs text-gray-500 font-mono mt-0.5">{s.supplierId}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-900">{s.contactPerson}</div>
                      <div className="text-xs text-gray-500">{s.email}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${s.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center justify-center bg-primary-50 text-primary-700 font-bold text-xs px-2.5 py-1 rounded-full">
                        {s.items?.length || 0} Items
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/admin/suppliers/${s.supplierId}`} className="text-primary-600 hover:bg-primary-50 font-semibold text-sm px-3 py-1.5 rounded-lg transition-colors">
                          View Items
                        </Link>
                        <button onClick={() => { setEditing(s); setIsNew(false); }} className="text-gray-600 hover:bg-gray-100 font-semibold text-sm px-3 py-1.5 rounded-lg transition-colors">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(s.supplierId)} className="text-red-600 hover:bg-red-50 font-semibold text-sm px-3 py-1.5 rounded-lg transition-colors">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {suppliers.length === 0 && (
              <div className="text-center py-12 text-gray-400 font-medium">No suppliers found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
