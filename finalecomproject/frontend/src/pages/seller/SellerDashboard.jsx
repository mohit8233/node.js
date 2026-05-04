import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Package, DollarSign, TrendingUp, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

const SellerDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Product Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    stock: '',
    brand: '',
    categoryId: '60d21b4667d0d8992e610c85', // Mock Object ID for category
  });

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const [productsRes, ordersRes] = await Promise.all([
          axios.get('/api/seller/products', config),
          axios.get('/api/orders/seller', config)
        ]);
        setProducts(productsRes.data);
        setOrders(ordersRes.data);
      } catch (error) {
        console.error('Error fetching seller data', error);
      } finally {
        setLoading(false);
      }
    };
    if (user && user.role === 'seller') fetchSellerData();
  }, [user]);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const addProductHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      // Note: We need a real category ID in a full implementation.
      // And image upload logic. We mock it for now.
      const productData = {
        ...newProduct,
        images: ['https://via.placeholder.com/400'],
      };
      
      const { data } = await axios.post('/api/seller/products', productData, config);
      setProducts([...products, data]);
      setShowAddForm(false);
      toast.success('Product added successfully. Pending admin approval.');
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  if (loading) return <div className="text-center py-20">Loading dashboard...</div>;
  if (user?.role !== 'seller') return <div className="text-center py-20 text-red-500">Access Denied</div>;

  const totalEarnings = orders.reduce((acc, order) => {
    return acc + order.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, 0);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          {showAddForm ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="glass-card p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Package size={24} /></div>
          <div>
            <p className="text-slate-500 text-sm">Total Products</p>
            <h3 className="text-2xl font-bold">{products.length}</h3>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-xl"><DollarSign size={24} /></div>
          <div>
            <p className="text-slate-500 text-sm">Total Earnings</p>
            <h3 className="text-2xl font-bold">₹{totalEarnings}</h3>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl"><ShoppingBag size={24} /></div>
          <div>
            <p className="text-slate-500 text-sm">Total Orders</p>
            <h3 className="text-2xl font-bold">{orders.length}</h3>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-xl"><TrendingUp size={24} /></div>
          <div>
            <p className="text-slate-500 text-sm">Pending Approval</p>
            <h3 className="text-2xl font-bold">{products.filter(p => p.status === 'pending').length}</h3>
          </div>
        </div>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="glass-card p-6 rounded-2xl mb-10">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <form onSubmit={addProductHandler} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleInputChange} className="px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" />
            <input required type="text" name="slug" placeholder="URL Slug (e.g. black-tshirt)" value={newProduct.slug} onChange={handleInputChange} className="px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" />
            <input required type="number" name="price" placeholder="Price (₹)" value={newProduct.price} onChange={handleInputChange} className="px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" />
            <input required type="number" name="stock" placeholder="Stock Quantity" value={newProduct.stock} onChange={handleInputChange} className="px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" />
            <input required type="text" name="brand" placeholder="Brand" value={newProduct.brand} onChange={handleInputChange} className="px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" />
            <div className="md:col-span-2">
              <textarea required rows={3} name="description" placeholder="Product Description" value={newProduct.description} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"></textarea>
            </div>
            <button type="submit" className="md:col-span-2 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700">Submit Product</button>
          </form>
        </div>
      )}

      {/* My Products Table */}
      <h2 className="text-2xl font-bold mb-4">My Products</h2>
      <div className="bg-white dark:bg-slate-900 rounded-xl border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800 border-b dark:border-slate-700">
              <th className="p-4 font-semibold text-sm">Product</th>
              <th className="p-4 font-semibold text-sm">Price</th>
              <th className="p-4 font-semibold text-sm">Stock</th>
              <th className="p-4 font-semibold text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan="4" className="p-4 text-center text-slate-500">No products found.</td></tr>
            ) : (
              products.map(product => (
                <tr key={product._id} className="border-b dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">₹{product.price}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">{product.stock}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'approved' ? 'bg-green-100 text-green-700' : 
                      product.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerDashboard;
