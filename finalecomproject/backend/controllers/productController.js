import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

// @desc    Fetch all approved products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const products = await Product.find({ ...keyword, status: 'approved', isActive: true })
    .populate('categoryId', 'name slug')
    .populate('sellerId', 'name');

  res.json(products);
});

// @desc    Fetch single product by slug
// @route   GET /api/products/:slug
// @access  Public
export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, status: 'approved', isActive: true })
    .populate('categoryId', 'name slug')
    .populate('sellerId', 'name avatar');

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
