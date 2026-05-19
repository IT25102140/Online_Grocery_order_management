import { useEffect, useState } from 'react';

interface ProductItem {
  productId: string; productType: string; name: string; price: number;
  imageUrl: string; description: string; category: string;
  expiryDate?: string;
}

const empty: ProductItem = { productId: '', productType: 'NON_PERISHABLE', name: '', price: 0, imageUrl: '', description: '', category: '' };

export function Products() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ProductItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  const fetchProducts = () => {
    fetch('http://localhost:8080/api/products/all')
      .then(r => r.json()).then(setProducts).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(fetchProducts, []);

  const handleSave = async () => {
    if (!editing) return;
    const url = isNew ? 'http://localhost:8080/api/products/add' : 'http://localhost:8080/api/products/update';
    const method = isNew ? 'POST' : 'PUT';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
    setEditing(null);
    setIsNew(false);
    setLoading(true);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await fetch(`http://localhost:8080/api/products/${id}`, { method: 'DELETE' });
    setLoading(true);
    fetchProducts();
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
          <p className="text-gray-500">Manage all products in your store.</p>
        </div>
        <button onClick={() => { setEditing({ ...empty, productId: 'P-' + Date.now().toString().slice(-6) }); setIsNew(true); }}
          className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Product
        </button>
      </div>

      {/* Edit/Create Modal */}
      {editing && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setEditing(null); setIsNew(false); }}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 space-y-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900">{isNew ? 'Add New Product' : 'Edit Product'}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm font-semibold text-gray-700 block mb-1">Product Name</label>
                <input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Price (Rs.)</label>
                <input type="number" step="0.01" value={editing.price} onChange={e => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Category</label>
                <select value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none">
                  <option value="">Select Category</option>
                  <option value="Produce">Produce</option>
                  <option value="Dairy & Eggs">Dairy & Eggs</option>
                  <option value="Meat & Seafood">Meat & Seafood</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Pantry Staples">Pantry Staples</option>
                  <option value="Snacks & Candy">Snacks & Candy</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Frozen Foods">Frozen Foods</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Type</label>
                <select value={editing.productType} onChange={e => setEditing({ ...editing, productType: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none">
                  <option value="NON_PERISHABLE">Non-Perishable</option>
                  <option value="PERISHABLE">Perishable</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Product ID</label>
                <input value={editing.productId} disabled={!isNew} onChange={e => setEditing({ ...editing, productId: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none disabled:opacity-50" />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-semibold text-gray-700 block mb-1">Image URL</label>
                <input value={editing.imageUrl} onChange={e => setEditing({ ...editing, imageUrl: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" placeholder="https://example.com/image.jpg" />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-semibold text-gray-700 block mb-1">Description</label>
                <textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none" />
              </div>
              {editing.productType === 'PERISHABLE' && (
                <div className="col-span-2">
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Expiry Date</label>
                  <input type="date" value={editing.expiryDate || ''} onChange={e => setEditing({ ...editing, expiryDate: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                </div>
              )}
            </div>
            {editing.imageUrl && <img src={editing.imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-xl border border-gray-200" />}
            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} className="flex-1 bg-primary-600 hover:bg-primary-500 text-white font-bold py-2.5 rounded-xl transition-colors">{isNew ? 'Create Product' : 'Save Changes'}</button>
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? <p className="text-gray-400">Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => (
            <div key={p.productId} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
              {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover" />}
              <div className="p-5 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900">{p.name}</h3>
                  <span className="text-lg font-black text-primary-600">Rs. {p.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-500 text-sm line-clamp-2">{p.description}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">{p.productType}</span>
                  {p.category && <span className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs font-bold rounded-full">{p.category}</span>}
                </div>
                <div className="flex gap-2 pt-2 border-t border-gray-50">
                  <button onClick={() => { setEditing(p); setIsNew(false); }} className="flex-1 text-sm font-bold text-primary-600 hover:bg-primary-50 py-1.5 rounded-lg transition-colors">Edit</button>
                  <button onClick={() => handleDelete(p.productId)} className="flex-1 text-sm font-bold text-red-500 hover:bg-red-50 py-1.5 rounded-lg transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
          {products.length === 0 && <p className="col-span-full text-center py-12 text-gray-400">No products found. Add one to get started!</p>}
        </div>
      )}
    </div>
  );
}
