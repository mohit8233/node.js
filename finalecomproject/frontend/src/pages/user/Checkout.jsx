import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          product: item.productId,
          seller: item.sellerId
        })),
        shippingAddress,
        paymentMethod,
        subtotal,
        totalAmount: subtotal,
      };

      if (paymentMethod === 'Razorpay') {
        // Mock Razorpay Flow
        const { data: orderResponse } = await axios.post('/api/payment/create-order', { amount: subtotal }, config);
        
        // In real app, open Razorpay popup here. We mock it for now.
        const verifyData = {
          razorpayOrderId: orderResponse.id,
          razorpayPaymentId: `mock_pay_${Date.now()}`,
          signature: 'mock_signature'
        };
        
        await axios.post('/api/payment/verify', verifyData, config);
        orderData.paymentStatus = 'completed';
        orderData.transactionId = verifyData.razorpayPaymentId;
      }

      const { data } = await axios.post('/api/orders', orderData, config);
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <form id="checkout-form" onSubmit={placeOrder} className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required type="text" name="fullName" placeholder="Full Name" value={shippingAddress.fullName} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" />
              <input required type="text" name="phone" placeholder="Phone Number" value={shippingAddress.phone} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" />
              <input required type="text" name="street" placeholder="Street Address" value={shippingAddress.street} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 md:col-span-2" />
              <input required type="text" name="city" placeholder="City" value={shippingAddress.city} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" />
              <input required type="text" name="state" placeholder="State" value={shippingAddress.state} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" />
              <input required type="text" name="pincode" placeholder="Pincode" value={shippingAddress.pincode} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" />
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="radio" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-primary-600" />
                <span>Cash on Delivery (COD)</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="radio" value="Razorpay" checked={paymentMethod === 'Razorpay'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-primary-600" />
                <span>Online Payment (Razorpay Mock)</span>
              </label>
            </div>
          </form>
        </div>

        <div className="p-6 border rounded-xl bg-slate-50 dark:bg-slate-900 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="truncate pr-4">{item.quantity} x {item.name}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mb-6 flex justify-between items-center">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-xl text-primary-600">₹{subtotal}</span>
          </div>
          <button 
            type="submit"
            form="checkout-form"
            disabled={loading}
            className="w-full py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors disabled:bg-slate-400"
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
