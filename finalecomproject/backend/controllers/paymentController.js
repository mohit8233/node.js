import asyncHandler from 'express-async-handler';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    // Return a mock success if keys are not configured
    return res.json({
      id: `mock_order_${Date.now()}`,
      amount: amount * 100,
      currency: 'INR',
    });
  }

  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    res.json(order);
  } catch (error) {
    res.status(500);
    throw new Error('Something went wrong creating payment order');
  }
});

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify
// @access  Private
export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, signature } = req.body;

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    // Return mock success if keys are not configured
    return res.json({ status: 'success', message: 'Mock Payment Verified Successfully' });
  }

  const sign = razorpayOrderId + '|' + razorpayPaymentId;
  const expectedSign = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest('hex');

  if (signature === expectedSign) {
    res.json({ status: 'success', message: 'Payment Verified Successfully' });
  } else {
    res.status(400);
    throw new Error('Invalid signature sent!');
  }
});
