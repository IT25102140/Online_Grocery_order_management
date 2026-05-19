import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface ShopSettings { storeStatus: string; taxRate: number; currency: string; storeName: string; }

export function Settings() {
  const { admin } = useAuth();
  const [settings, setSettings] = useState<ShopSettings>({ storeStatus: 'OPEN', taxRate: 0.08, currency: 'USD', storeName: 'FreshCart' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/admin/settings', {
      headers: { 'Authorization': `Bearer ${admin?.token}` }
    }).then(r => r.json()).then(setSettings).catch(console.error).finally(() => setLoading(false));
  }, [admin]);

  const handleSave = async () => {
    setSaving(true);
    await fetch('http://localhost:8080/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${admin?.token}` },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <div className="p-8 text-gray-400">Loading settings...</div>;

  return (
    <div className="p-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Store Settings</h1>
      <p className="text-gray-500 mb-8">Configure your store's global settings.</p>

      <div className="max-w-xl space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Store Name</label>
            <input value={settings.storeName} onChange={e => setSettings({ ...settings, storeName: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Store Status</label>
            <select value={settings.storeStatus} onChange={e => setSettings({ ...settings, storeStatus: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none">
              <option value="OPEN">Open</option>
              <option value="CLOSED">Closed</option>
              <option value="MAINTENANCE">Maintenance</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Tax Rate</label>
              <input type="number" step="0.01" value={settings.taxRate} onChange={e => setSettings({ ...settings, taxRate: parseFloat(e.target.value) || 0 })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Currency</label>
              <input value={settings.currency} onChange={e => setSettings({ ...settings, currency: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:outline-none" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleSave} disabled={saving} className="bg-primary-600 hover:bg-primary-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
          {saved && <span className="text-green-600 font-bold text-sm animate-fade-in">✓ Settings saved!</span>}
        </div>
      </div>
    </div>
  );
}
