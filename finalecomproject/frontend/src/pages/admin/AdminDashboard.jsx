import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Users, Store, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [sellerRequests, setSellerRequests] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const [requestsRes, productsRes] = await Promise.all([
          axios.get('/api/admin/seller-requests', config),
          axios.get('/api/admin/pending-products', config)
        ]);
        setSellerRequests(requestsRes.data);
        setPendingProducts(productsRes.data);
      } catch (error) {
        console.error('Error fetching admin data', error);
      } finally {
        setLoading(false);
      }
    };
    if (user && user.role === 'admin') fetchAdminData();
  }, [user]);

  const handleSellerRequest = async (id, status) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.patch(`/api/admin/seller-requests/${id}`, { status }, config);
      toast.success(`Seller request ${status}`);
      setSellerRequests(sellerRequests.map(req => req._id === id ? { ...req, status } : req));
    } catch (error) {
      toast.error('Action failed');
    }
  };

  const handleProductApproval = async (id, status) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.patch(`/api/admin/products/${id}/status`, { status }, config);
      toast.success(`Product ${status}`);
      setPendingProducts(pendingProducts.filter(p => p._id !== id));
    } catch (error) {
      toast.error('Action failed');
    }
  };

  if (loading) return <div className="text-center py-20">Loading dashboard...</div>;
  if (user?.role !== 'admin') return <div className="text-center py-20 text-red-500">Access Denied</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="glass-card p-6 rounded-2xl flex items-center space-x-4 border-l-4 border-l-blue-500">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Users size={24} /></div>
          <div>
            <p className="text-slate-500 text-sm">Total Users</p>
            <h3 className="text-2xl font-bold">120</h3> {/* Mocked */}
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center space-x-4 border-l-4 border-l-purple-500">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl"><Store size={24} /></div>
          <div>
            <p className="text-slate-500 text-sm">Pending Sellers</p>
            <h3 className="text-2xl font-bold">{sellerRequests.filter(r => r.status === 'pending').length}</h3>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center space-x-4 border-l-4 border-l-orange-500">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-xl"><Store size={24} /></div>
          <div>
            <p className="text-slate-500 text-sm">Pending Products</p>
            <h3 className="text-2xl font-bold">{pendingProducts.length}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Seller Requests */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Seller Applications</h2>
          <div className="space-y-4">
            {sellerRequests.filter(r => r.status === 'pending').length === 0 ? (
              <p className="text-slate-500">No pending seller applications.</p>
            ) : (
              sellerRequests.filter(r => r.status === 'pending').map(request => (
                <div key={request._id} className="border p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">{request.shopName}</h3>
                      <p className="text-sm text-slate-500">{request.userId?.name} ({request.userId?.email})</p>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => handleSellerRequest(request._id, 'approved')} className="text-green-500 hover:bg-green-50 p-2 rounded-full transition-colors">
                        <CheckCircle size={20} />
                      </button>
                      <button onClick={() => handleSellerRequest(request._id, 'rejected')} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
                        <XCircle size={20} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm">{request.shopCategory} - {request.businessPhone}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pending Products */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Pending Products</h2>
          <div className="space-y-4">
            {pendingProducts.length === 0 ? (
              <p className="text-slate-500">No pending products to review.</p>
            ) : (
              pendingProducts.map(product => (
                <div key={product._id} className="border p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-sm text-slate-500">₹{product.price} | Stock: {product.stock}</p>
                    <p className="text-xs text-primary-600 mt-1">Seller: {product.sellerId?.name}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleProductApproval(product._id, 'approved')} className="text-green-500 hover:bg-green-50 px-3 py-1 rounded border border-green-500 transition-colors text-sm font-medium">
                      Approve
                    </button>
                    <button onClick={() => handleProductApproval(product._id, 'rejected')} className="text-red-500 hover:bg-red-50 px-3 py-1 rounded border border-red-500 transition-colors text-sm font-medium">
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
