import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Star, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  
  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        const { data: productData } = await axios.get(`/api/products/${slug}`);
        setProduct(productData);
        if (productData.images && productData.images.length > 0) {
          setActiveImage(productData.images[0]);
        }
        
        // Fetch reviews
        const { data: reviewsData } = await axios.get(`/api/products/${productData._id}/reviews`);
        setReviews(reviewsData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data', error);
        setLoading(false);
      }
    };
    fetchProductAndReviews();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${quantity} ${product.name} added to cart`);
    }
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to submit a review');
      return;
    }
    setSubmittingReview(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post(`/api/products/${product._id}/reviews`, { rating, comment }, config);
      toast.success('Review submitted successfully');
      
      // Refresh reviews
      const { data: reviewsData } = await axios.get(`/api/products/${product._id}/reviews`);
      setReviews(reviewsData);
      setComment('');
      setRating(5);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-20 text-center">Loading...</div>;
  if (!product) return <div className="container mx-auto px-4 py-20 text-center">Product not found.</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border">
            {activeImage ? (
              <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${activeImage === img ? 'border-primary-500' : 'border-transparent'}`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="text-sm text-primary-600 font-medium mb-2">{product.categoryId?.name}</div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center text-yellow-500">
              <Star size={18} fill="currentColor" />
              <span className="ml-1 text-slate-700 dark:text-slate-300 font-medium">{product.rating}</span>
            </div>
            <span className="text-slate-400">|</span>
            <span className="text-slate-500">{product.numReviews} Reviews</span>
            <span className="text-slate-400">|</span>
            <span className="text-sm font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md">
              Sold by: {product.sellerId?.name}
            </span>
          </div>

          <div className="text-3xl font-bold mb-6">
            {product.discountPrice ? (
              <div className="flex items-center space-x-3">
                <span>₹{product.discountPrice}</span>
                <span className="text-xl text-slate-500 line-through">₹{product.price}</span>
                <span className="text-sm font-medium text-green-500 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                </span>
              </div>
            ) : (
              <span>₹{product.price}</span>
            )}
          </div>

          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center border rounded-lg">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >-</button>
              <span className="px-4 py-2 font-medium border-x">{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >+</button>
            </div>
            <span className="text-sm text-slate-500">
              {product.stock > 0 ? `${product.stock} in stock` : <span className="text-red-500">Out of stock</span>}
            </span>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex justify-center items-center space-x-2 shadow-lg shadow-primary-500/30 mb-8"
          >
            <ShoppingCart size={20} />
            <span>Add to Cart</span>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t">
            <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
              <Truck className="text-primary-500" />
              <span>Free delivery on orders over ₹500</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
              <ShieldCheck className="text-primary-500" />
              <span>7 days return policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 pt-10 border-t">
        <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Submit Review */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-4">Write a Review</h3>
              {user ? (
                <form onSubmit={submitReviewHandler} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <select 
                      value={rating} 
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                    >
                      <option value={5}>5 - Excellent</option>
                      <option value={4}>4 - Very Good</option>
                      <option value={3}>3 - Good</option>
                      <option value={2}>2 - Fair</option>
                      <option value={1}>1 - Poor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Comment</label>
                    <textarea 
                      required
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      placeholder="Share your thoughts about this product..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={submittingReview}
                    className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium disabled:opacity-50"
                  >
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-sm text-center">
                  Please <a href="/login" className="text-primary-600 font-medium">login</a> to write a review.
                </div>
              )}
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {reviews.length === 0 ? (
              <p className="text-slate-500">No reviews yet. Be the first to review this product!</p>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="border-b dark:border-slate-800 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center overflow-hidden text-sm font-bold">
                        {review.userId?.avatar ? (
                          <img src={review.userId.avatar} alt={review.userId.name} className="w-full h-full object-cover" />
                        ) : (
                          review.userId?.name?.charAt(0) || 'U'
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{review.userId?.name || 'User'}</p>
                        <p className="text-xs text-slate-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-slate-300 dark:text-slate-600" : ""} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
