import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const BecomeSeller = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shopName: '',
    shopCategory: '',
    shopDescription: '',
    businessEmail: '',
    businessPhone: '',
    gstNumber: '',
    pickupAddress: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('/api/seller/request-status', config);
        setStatus(data);
      } catch (error) {
        // Normal if no request exists
      }
    };
    if (user) fetchStatus();
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post('/api/seller/request', formData, config);
      setStatus(data);
      toast.success('Seller request submitted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  if (status && status.status !== 'rejected') {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-2xl">
        <div className="glass-card p-10 rounded-3xl">
          <h2 className="text-3xl font-bold mb-4">Application Status</h2>
          <div className={`inline-block px-6 py-2 rounded-full text-lg font-medium mb-6 ${
            status.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
          }`}>
            {status.status.toUpperCase()}
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            {status.status === 'pending' 
              ? "Your request is currently under review by our admin team. We will notify you once it's processed."
              : "Congratulations! Your seller account is approved. You can now access the seller dashboard."}
          </p>
          {status.status === 'approved' && (
            <button onClick={() => navigate('/seller')} className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
              Go to Seller Dashboard
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Become a Zenvy Seller</h1>
        <p className="text-slate-600 dark:text-slate-400">Join thousands of sellers and reach millions of customers worldwide.</p>
      </div>

      <div className="glass-card p-8 rounded-2xl">
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Shop Name</label>
              <input required type="text" name="shopName" value={formData.shopName} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Shop Category</label>
              <input required type="text" name="shopCategory" value={formData.shopCategory} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 focus:ring-primary-500 focus:border-primary-500" placeholder="e.g. Electronics, Fashion" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Shop Description</label>
              <textarea required rows={3} name="shopDescription" value={formData.shopDescription} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 focus:ring-primary-500 focus:border-primary-500"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Business Email</label>
              <input required type="email" name="businessEmail" value={formData.businessEmail} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Business Phone</label>
              <input required type="text" name="businessPhone" value={formData.businessPhone} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GST/Tax Number</label>
              <input required type="text" name="gstNumber" value={formData.gstNumber} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Pickup Address</label>
              <input required type="text" name="pickupAddress" value={formData.pickupAddress} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 focus:ring-primary-500 focus:border-primary-500" />
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <button type="submit" disabled={loading} className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30 disabled:bg-slate-400">
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeSeller;
