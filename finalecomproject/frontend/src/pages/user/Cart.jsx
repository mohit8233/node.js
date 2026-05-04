import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const checkoutHandler = () => {
    if (!user) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-2xl">
          <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
          <Link to="/products" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
            Continue Shopping <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex items-center space-x-4 p-4 border rounded-xl bg-white dark:bg-slate-950">
                <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <Link to={`/products/${item.productId}`} className="font-semibold hover:text-primary-500 line-clamp-1">
                    {item.name || 'Product'}
                  </Link>
                  <p className="text-slate-500 text-sm">₹{item.price}</p>
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium">Qty: {item.quantity}</span>
                </div>
                <div className="font-bold text-lg">
                  ₹{item.price * item.quantity}
                </div>
                <button 
                  onClick={() => removeFromCart(item.productId)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="p-6 border rounded-xl bg-slate-50 dark:bg-slate-900 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 mb-6">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-green-500">Free</span>
              </div>
            </div>
            <div className="border-t pt-4 mb-6 flex justify-between items-center">
              <span className="font-bold text-lg text-slate-900 dark:text-white">Total</span>
              <span className="font-bold text-xl text-primary-600 dark:text-primary-400">₹{subtotal}</span>
            </div>
            <button 
              onClick={checkoutHandler}
              className="w-full py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
