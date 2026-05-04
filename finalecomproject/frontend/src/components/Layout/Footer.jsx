import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const subscribeHandler = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { data } = await axios.post('/api/newsletter/subscribe', { email });
      toast.success(data.message || 'Subscribed successfully');
      setEmail('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Subscription failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tighter text-gradient">Zenvy</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Your premium destination for multi-vendor e-commerce. Shop the best products from top sellers worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="/products" className="hover:text-primary-500 transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-primary-500 transition-colors">Categories</Link></li>
              <li><Link to="/deals" className="hover:text-primary-500 transition-colors">Deals & Offers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="/contact" className="hover:text-primary-500 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-primary-500 transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-primary-500 transition-colors">Shipping Info</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex" onSubmit={subscribeHandler}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 text-sm bg-white dark:bg-slate-800 border rounded-l-md w-full focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
              <button disabled={loading} type="submit" className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-r-md hover:bg-primary-700 transition-colors disabled:bg-slate-400">
                {loading ? '...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} Zenvy Platform. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-primary-500 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary-500 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
