import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Supplier, SupplierItem } from '../../types';

export function SupplierDetail() {
  const { id } = useParams<{ id: string }>();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<SupplierItem | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);

  const fetchSupplier = () => {
    fetch(`http://localhost:8080/api/suppliers/${id}`)
      .then(res => res.json())
      .then(setSupplier)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSupplier();
  }, [id]);

  const handleSaveItem = async () => {
    if (!supplier || !editingItem) return;
    
    const updatedItems = isNewItem 
      ? [...(supplier.items || []), editingItem]
      : (supplier.items || []).map(item => item.itemId === editingItem.itemId ? editingItem : item);

    const updatedSupplier = { ...supplier, items: updatedItems };

    try {
      await fetch('http://localhost:8080/api/suppliers/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSupplier)
      });
      setEditingItem(null);
      setIsNewItem(false);
      fetchSupplier();
    } catch (error) {
      console.error('Failed to save item', error);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!supplier || !window.confirm('Delete this item?')) return;
    
    const updatedItems = (supplier.items || []).filter(item => item.itemId !== itemId);
    const updatedSupplier = { ...supplier, items: updatedItems };

    try {
      await fetch('http://localhost:8080/api/suppliers/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSupplier)
      });
      fetchSupplier();
    } catch (error) {
      console.error('Failed to delete item', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="p-8 text-center h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Supplier Not Found</h2>
        <p className="text-gray-500">The requested supplier could not be found or has been deleted.</p>
        <Link to="/admin/suppliers" className="text-primary-600 font-bold hover:underline">Back to Suppliers</Link>
      </div>
    );
  }

  const totalInventoryValue = supplier.items?.reduce((sum, item) => sum + (item.quantity * item.wholesalePrice), 0) || 0;

  return (
    <div className="p-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link to="/admin/suppliers" className="text-gray-400 hover:text-primary-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-3xl font-extrabold text-gray-900">{supplier.name}</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${supplier.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
              {supplier.status}
            </span>
          </div>
          <p className="text-gray-500 font-mono text-sm ml-9">Supplier ID: {supplier.supplierId}</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="bg-primary-50 p-3 rounded-xl text-primary-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Contact Person</p>
            <p className="font-semibold text-gray-900">{supplier.contactPerson}</p>
            <p className="text-sm text-gray-500 mt-1">{supplier.email}</p>
            <p className="text-sm text-gray-500">{supplier.phone}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Company Address</p>
            <p className="text-sm text-gray-800 leading-relaxed">{supplier.address}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="bg-green-50 p-3 rounded-xl text-green-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Inventory Value</p>
            <p className="text-2xl font-black text-gray-900">Rs. {totalInventoryValue.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">{supplier.items?.length || 0} unique items</p>
          </div>
        </div>
      </div>

      {/* Supplied Items Table */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 ml-1">Supplied Inventory</h3>
        <button
          onClick={() => {
            setEditingItem({ itemId: 'I-' + Date.now().toString().slice(-6), name: '', quantity: 0, wholesalePrice: 0 });
            setIsNewItem(true);
          }}
          className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2"
        >
          + Add Item
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Item ID</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Item Name</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Available Quantity</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Wholesale Price</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Total Value</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {supplier.items && supplier.items.length > 0 ? (
                supplier.items.map(item => (
                  <tr key={item.itemId} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-mono text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">{item.itemId}</span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-900">{item.name}</td>
                    <td className="py-4 px-6 text-right font-medium text-gray-700">{item.quantity.toLocaleString()} units</td>
                    <td className="py-4 px-6 text-right font-bold text-primary-600">Rs. {item.wholesalePrice.toFixed(2)}</td>
                    <td className="py-4 px-6 text-right font-bold text-gray-900">Rs. {(item.quantity * item.wholesalePrice).toFixed(2)}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => { setEditingItem(item); setIsNewItem(false); }} className="text-gray-600 hover:bg-gray-100 font-semibold text-sm px-3 py-1.5 rounded-lg transition-colors">Edit</button>
                        <button onClick={() => handleDeleteItem(item.itemId)} className="text-red-600 hover:bg-red-50 font-semibold text-sm px-3 py-1.5 rounded-lg transition-colors">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 font-medium">No items supplied by this vendor currently.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingItem && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{isNewItem ? 'Add New Item' : 'Edit Item'}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Item Name</label>
                <input value={editingItem.name} onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Quantity</label>
                  <input type="number" value={editingItem.quantity} onChange={e => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value) || 0 })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Wholesale Price (Rs.)</label>
                  <input type="number" step="0.01" value={editingItem.wholesalePrice} onChange={e => setEditingItem({ ...editingItem, wholesalePrice: parseFloat(e.target.value) || 0 })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-6">
              <button onClick={handleSaveItem} className="flex-1 bg-primary-600 hover:bg-primary-500 text-white font-bold py-2.5 rounded-xl transition-colors">Save Item</button>
              <button onClick={() => { setEditingItem(null); setIsNewItem(false); }} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
