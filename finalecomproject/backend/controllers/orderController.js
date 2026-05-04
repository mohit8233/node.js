import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    subtotal,
    totalAmount,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      totalAmount,
    });

    const createdOrder = await order.save();

    // Clear user cart after order
    await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] });

    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    // Only allow admin, seller, or the user who placed it to view
    if (
      req.user.role === 'admin' ||
      order.user._id.toString() === req.user._id.toString() ||
      order.orderItems.some((item) => item.seller.toString() === req.user._id.toString())
    ) {
      res.json(order);
    } else {
      res.status(403);
      throw new Error('Not authorized to view this order');
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get seller orders
// @route   GET /api/orders/seller
// @access  Private/Seller
export const getSellerOrders = asyncHandler(async (req, res) => {
  // Find orders that contain items from this seller
  const orders = await Order.find({ 'orderItems.seller': req.user._id });
  
  // Filter order items to only show the seller's own items
  const sellerOrders = orders.map((order) => {
    order.orderItems = order.orderItems.filter(
      (item) => item.seller.toString() === req.user._id.toString()
    );
    return order;
  });

  res.json(sellerOrders);
});
