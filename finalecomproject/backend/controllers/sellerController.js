import asyncHandler from 'express-async-handler';
import SellerRequest from '../models/SellerRequest.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc    Submit a seller request
// @route   POST /api/seller/request
// @access  Private
export const submitSellerRequest = asyncHandler(async (req, res) => {
  const {
    shopName,
    shopCategory,
    shopDescription,
    businessEmail,
    businessPhone,
    gstNumber,
    pickupAddress,
  } = req.body;

  const existingRequest = await SellerRequest.findOne({ userId: req.user._id });

  if (existingRequest && existingRequest.status !== 'rejected') {
    res.status(400);
    throw new Error('You already have a pending or approved request');
  }

  const newRequest = await SellerRequest.create({
    userId: req.user._id,
    shopName,
    shopCategory,
    shopDescription,
    businessEmail,
    businessPhone,
    gstNumber,
    pickupAddress,
  });

  // Update user's sellerStatus
  await User.findByIdAndUpdate(req.user._id, { sellerStatus: 'pending' });

  res.status(201).json(newRequest);
});

// @desc    Get seller request status
// @route   GET /api/seller/request-status
// @access  Private
export const getSellerRequestStatus = asyncHandler(async (req, res) => {
  const request = await SellerRequest.findOne({ userId: req.user._id });

  if (request) {
    res.json(request);
  } else {
    res.status(404);
    throw new Error('No seller request found');
  }
});

// @desc    Add a new product
// @route   POST /api/seller/products
// @access  Private/Seller
export const addProduct = asyncHandler(async (req, res) => {
  // Add logic to add a product. Status will be 'pending' by default.
  const product = new Product({
    sellerId: req.user._id,
    ...req.body,
    status: 'pending', // Explicitly pending for admin approval
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Get seller's products
// @route   GET /api/seller/products
// @access  Private/Seller
export const getSellerProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ sellerId: req.user._id }).populate('categoryId', 'name');
  res.json(products);
});
