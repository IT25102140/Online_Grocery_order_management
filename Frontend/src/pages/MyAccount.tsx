import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export function MyAccount() {
  const { user, logout, isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) return <Navigate to="/login" />;

  const tabs = [
    { name: 'Overview', path: '/myaccount' },
    { name: 'Previous Orders', path: '/myaccount/previousorders' },
    { name: 'Previous Payments', path: '/myaccount/previouspayments' },
    { name: 'My Cart', path: '/myaccount/cart' },
  ];

  const isRoot = location.pathname === '/myaccount';

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Account</h1>
          <p className="text-gray-500 mt-1">Welcome back, <span className="font-bold text-primary-600">{user?.name}</span></p>
        </div>
        <button onClick={logout} className="text-sm font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-colors">Sign Out</button>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <Link key={tab.path} to={tab.path}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${location.pathname === tab.path ? 'bg-primary-600 text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
            {tab.name}
          </Link>
        ))}
      </div>

      {isRoot ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-lg font-bold text-gray-900">{user?.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">User ID</p>
              <p className="text-lg font-bold text-gray-900 font-mono">{user?.userId}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Role</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary-50 text-primary-700">{user?.role}</span>
            </div>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
