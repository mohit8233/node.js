import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('/api/orders/myorders', config);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchOrders();
  }, [user]);

  if (loading) return <div className="text-center py-20">Loading orders...</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-2xl border">
          <Package size={48} className="mx-auto text-slate-400 mb-4" />
          <h2 className="text-xl font-medium mb-2">No orders found</h2>
          <p className="text-slate-500 mb-6">Looks like you haven't placed any orders yet.</p>
          <Link to="/products" className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="glass-card rounded-xl overflow-hidden border">
              <div className="bg-slate-100 dark:bg-slate-800 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between border-b dark:border-slate-700">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-3/4 text-sm">
                  <div>
                    <p className="text-slate-500">Order Placed</p>
                    <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Total</p>
                    <p className="font-medium">₹{order.totalAmount}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Ship To</p>
                    <p className="font-medium">{order.shippingAddress.fullName}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Order ID</p>
                    <p className="font-medium">{order._id.substring(0, 8).toUpperCase()}</p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.paymentMethod} - {order.paymentStatus}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded object-cover flex items-center justify-center text-xs text-slate-500">
                        Img
                      </div>
                      <div className="flex-1">
                        <Link to={`/products/${item.product}`} className="font-semibold hover:text-primary-600">
                          {item.name}
                        </Link>
                        <p className="text-slate-500 text-sm">Seller ID: {item.seller}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{item.price}</p>
                        <p className="text-slate-500 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <div className="w-32 text-right">
                        <span className={`text-sm font-medium ${
                          item.orderStatus === 'delivered' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {item.orderStatus.charAt(0).toUpperCase() + item.orderStatus.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
