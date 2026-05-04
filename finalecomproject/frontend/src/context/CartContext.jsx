import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  // Load cart from local storage or DB
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const config = { headers: { Authorization: `Bearer ${user.token}` } };
          const { data } = await axios.get('/api/cart', config);
          setCartItems(data.items || []);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      } else {
        const localCart = localStorage.getItem('zenvy_cart');
        if (localCart) {
          setCartItems(JSON.parse(localCart));
        }
      }
    };
    fetchCart();
  }, [user]);

  // Sync to local storage for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem('zenvy_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (product, quantity = 1) => {
    if (user) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.post('/api/cart', { productId: product._id, quantity }, config);
        setCartItems(data.items);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      setCartItems((prev) => {
        const exists = prev.find((i) => i.productId === product._id);
        if (exists) {
          return prev.map((i) => (i.productId === product._id ? { ...i, quantity: i.quantity + quantity } : i));
        }
        return [...prev, { productId: product._id, name: product.name, price: product.price, quantity, image: product.images[0] }];
      });
    }
  };

  const removeFromCart = async (productId) => {
    if (user) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.delete(`/api/cart/${productId}`, config);
        setCartItems(data.items);
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    } else {
      setCartItems((prev) => prev.filter((i) => i.productId !== productId));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
