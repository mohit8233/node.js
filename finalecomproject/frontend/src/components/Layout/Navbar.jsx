import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Sun, Moon, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 glass border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter text-gradient">
          Zenvy
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-sm font-medium hover:text-primary-500 transition-colors">Home</Link>
          <Link to="/products" className="text-sm font-medium hover:text-primary-500 transition-colors">Shop</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-sm font-medium hover:text-primary-500 transition-colors">Admin Dashboard</Link>
          )}
          {user?.role === 'seller' && (
            <Link to="/seller" className="text-sm font-medium hover:text-primary-500 transition-colors">Seller Dashboard</Link>
          )}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <Link to="/wishlist" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:block">
            <Heart size={20} />
          </Link>
          
          <Link to="/cart" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary-600 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative group">
              <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center">
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-6 h-6 rounded-full" />
                ) : (
                  <User size={20} />
                )}
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md shadow-xl py-1 hidden group-hover:block transition-all">
                <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 text-sm">
                  <p className="font-semibold truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
                <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">Profile</Link>
                <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">My Orders</Link>
                {user.role === 'user' && user.sellerStatus !== 'approved' && (
                  <Link to="/become-seller" className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">Become a Seller</Link>
                )}
                <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Link to="/login" className="px-4 py-2 text-sm font-medium hover:text-primary-500 transition-colors">Login</Link>
              <Link to="/register" className="px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">Sign Up</Link>
            </div>
          )}

          <button className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
