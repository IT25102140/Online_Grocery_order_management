import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export function AdminLogin() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const success = await adminLogin(name, password);
    setLoading(false);
    if (!success) setError('Invalid admin credentials.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-6">
      <div className="max-w-md w-full bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary-600/10 rounded-bl-full pointer-events-none"></div>
        <div className="text-center relative z-10 mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="bg-primary-600 text-white p-2 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">FreshAdmin</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Admin Access</h2>
          <p className="mt-2 text-sm text-gray-400">Enter your admin credentials to continue.</p>
        </div>

        {error && <div className="bg-red-500/10 text-red-400 text-sm font-medium px-4 py-3 rounded-xl border border-red-500/20 mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">Admin Name</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-700 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-500" placeholder="admin" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-700 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-500" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold text-lg py-3 rounded-xl transition-all shadow-lg disabled:opacity-60">
            {loading ? 'Verifying...' : 'Sign In to Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}
