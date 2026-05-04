import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-20 text-center">Loading products...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="glass-card rounded-xl overflow-hidden group">
            <Link to={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
              {product.images && product.images[0] ? (
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
              )}
            </Link>
            <div className="p-4">
              <div className="text-xs text-primary-600 dark:text-primary-400 mb-1 font-medium">
                {product.categoryId?.name || 'Category'}
              </div>
              <Link to={`/products/${product.slug}`}>
                <h3 className="font-semibold text-lg mb-2 truncate hover:text-primary-500 transition-colors">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-col">
                  {product.discountPrice ? (
                    <>
                      <span className="text-lg font-bold">₹{product.discountPrice}</span>
                      <span className="text-xs text-slate-500 line-through">₹{product.price}</span>
                    </>
                  ) : (
                    <span className="text-lg font-bold">₹{product.price}</span>
                  )}
                </div>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-primary-600 hover:text-white transition-colors"
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && !loading && (
        <div className="text-center py-20 text-slate-500">
          No products found.
        </div>
      )}
    </div>
  );
};

export default Products;
