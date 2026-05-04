import asyncHandler from 'express-async-handler';
import Review from '../models/Review.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const productId = req.params.id;

  const product = await Product.findById(productId);

  if (product) {
    // Check if user actually bought the product
    const orders = await Order.find({ user: req.user._id, paymentStatus: 'completed' });
    const hasBought = orders.some(order => 
      order.orderItems.some(item => item.product.toString() === productId)
    );

    if (!hasBought) {
      res.status(400);
      throw new Error('You can only review products you have purchased');
    }

    const alreadyReviewed = await Review.findOne({
      userId: req.user._id,
      productId: productId,
    });

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = await Review.create({
      userId: req.user._id,
      productId: productId,
      rating: Number(rating),
      comment,
    });

    const reviews = await Review.find({ productId: productId });
    
    product.numReviews = reviews.length;
    product.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added', review });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get reviews for a product
// @route   GET /api/products/:id/reviews
// @access  Public
export const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ productId: req.params.id }).populate('userId', 'name avatar');
  res.json(reviews);
});
