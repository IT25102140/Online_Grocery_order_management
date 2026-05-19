import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export function Dashboard() {
  const { admin } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    totalSales: 0,
    pendingOrders: 0,
    processingOrders: 0,
    dispatchedOrders: 0,
    deliveredOrders: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${admin?.token}` };

        // Fetch products (public but we just fetch it)
        const productsRes = await fetch('http://localhost:8080/api/products/all');
        const products = await productsRes.json();

        // Fetch orders
        const ordersRes = await fetch('http://localhost:8080/api/orders/all', { headers });
        const orders = await ordersRes.json();

        // Fetch customers
        const customersRes = await fetch('http://localhost:8080/api/admin/customers', { headers });
        const customers = await customersRes.json();

        // Fetch payments
        const paymentsRes = await fetch('http://localhost:8080/api/payments/all', { headers });
        const payments = await paymentsRes.json();

        let totalSalesAmount = 0;
        payments.forEach((p: { status?: string; paymentStatus?: string; amount?: number }) => {
          if (p.status === 'COMPLETED' || p.paymentStatus === 'COMPLETED' || p.status === 'SUCCESS' || p.paymentStatus === 'SUCCESS') {
            totalSalesAmount += p.amount || 0;
          }
        });

        const pending = orders.filter((o: { status: string }) => o.status === 'PENDING').length;
        const processing = orders.filter((o: { status: string }) => o.status === 'PROCESSING').length;
        const dispatched = orders.filter((o: { status: string }) => o.status === 'DISPATCHED' || o.status === 'SHIPPED').length;
        const delivered = orders.filter((o: { status: string }) => o.status === 'DELIVERED').length;

        setStats({
          totalOrders: orders.length,
          totalProducts: products.length,
          totalCustomers: customers.length,
          totalSales: totalSalesAmount,
          pendingOrders: pending,
          processingOrders: processing,
          dispatchedOrders: dispatched,
          deliveredOrders: delivered,
        });

      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };

    if (admin?.token) {
      fetchStats();
    }
  }, [admin?.token]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between animate-fade-in">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Overview</h1>
        <div className="flex gap-2">
           <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white border border-gray-200 shadow-sm text-gray-600">
              Live Data
           </span>
        </div>
      </div>

      {/* 2. Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 group hover:border-primary-200 transition-colors">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-gray-500 font-medium mb-1 drop-shadow-sm">Total Orders</p>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-gray-900 tracking-tight">{stats.totalOrders}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 group hover:border-primary-200 transition-colors">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          <div>
            <p className="text-gray-500 font-medium mb-1 drop-shadow-sm">Total Products</p>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-gray-900 tracking-tight">{stats.totalProducts}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 group hover:border-primary-200 transition-colors">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
          </div>
          <div>
            <p className="text-gray-500 font-medium mb-1 drop-shadow-sm">Total Customers</p>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-gray-900 tracking-tight">{stats.totalCustomers}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 group hover:border-primary-200 transition-colors">
          <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-gray-500 font-medium mb-1 drop-shadow-sm">Delivered Orders</p>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-gray-900 tracking-tight">{stats.deliveredOrders}</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Charts and Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Main Chart Card */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
               <div>
                  <h3 className="text-lg font-bold text-gray-900">Orders Overview</h3>
                  <p className="text-sm text-gray-500">Current order pipeline status.</p>
               </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center mt-8">
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                 <p className="text-orange-500 text-sm font-bold mb-1">Pending</p>
                 <p className="text-3xl font-black text-gray-900">{stats.pendingOrders}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                 <p className="text-blue-500 text-sm font-bold mb-1">Processing</p>
                 <p className="text-3xl font-black text-gray-900">{stats.processingOrders}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                 <p className="text-purple-500 text-sm font-bold mb-1">Dispatched</p>
                 <p className="text-3xl font-black text-gray-900">{stats.dispatchedOrders}</p>
              </div>
            </div>
         </div>

         {/* Side Metric Cards */}
         <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <h3 className="text-gray-300 font-medium mb-2 relative z-10">Total Sales Amount</h3>
               <div className="flex items-end gap-3 relative z-10">
                 <span className="text-4xl font-extrabold tracking-tight">Rs. {stats.totalSales.toFixed(2)}</span>
               </div>
               <p className="text-gray-400 text-sm mt-4 relative z-10">Cumulative total across all successful payments.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
