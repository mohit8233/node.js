import asyncHandler from 'express-async-handler';
import SellerRequest from '../models/SellerRequest.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc    Get all seller requests
// @route   GET /api/admin/seller-requests
// @access  Private/Admin
export const getSellerRequests = asyncHandler(async (req, res) => {
  const requests = await SellerRequest.find({}).populate('userId', 'name email');
  res.json(requests);
});

// @desc    Approve or reject seller request
// @route   PATCH /api/admin/seller-requests/:id
// @access  Private/Admin
export const updateSellerRequestStatus = asyncHandler(async (req, res) => {
  const { status, rejectionReason } = req.body;
  const request = await SellerRequest.findById(req.params.id);

  if (!request) {
    res.status(404);
    throw new Error('Request not found');
  }

  request.status = status;
  if (status === 'rejected') {
    request.rejectionReason = rejectionReason;
  }
  await request.save();

  // Update user role if approved
  const user = await User.findById(request.userId);
  if (user) {
    if (status === 'approved') {
      user.role = 'seller';
      user.sellerStatus = 'approved';
    } else if (status === 'rejected') {
      user.sellerStatus = 'rejected';
    }
    await user.save();
  }

  res.json(request);
});

// @desc    Get all pending products
// @route   GET /api/admin/pending-products
// @access  Private/Admin
export const getPendingProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ status: 'pending' }).populate('sellerId', 'name').populate('categoryId', 'name');
  res.json(products);
});

// @desc    Approve or reject a product
// @route   PATCH /api/admin/products/:id/status
// @access  Private/Admin
export const updateProductStatus = asyncHandler(async (req, res) => {
  const { status } = req.body; // 'approved' or 'rejected'
  
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.status = status;
  // If we had a rejection reason for products, we could save it here

  await product.save();
  res.json(product);
});
