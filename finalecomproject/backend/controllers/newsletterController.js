import asyncHandler from 'express-async-handler';
import Newsletter from '../models/Newsletter.js';

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
export const subscribeNewsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const existing = await Newsletter.findOne({ email });

  if (existing) {
    if (existing.isSubscribed) {
      res.status(400);
      throw new Error('Email is already subscribed');
    } else {
      existing.isSubscribed = true;
      await existing.save();
      return res.status(200).json({ message: 'Re-subscribed successfully' });
    }
  }

  await Newsletter.create({ email });
  res.status(201).json({ message: 'Subscribed successfully' });
});

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
export const unsubscribeNewsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const existing = await Newsletter.findOne({ email });

  if (!existing || !existing.isSubscribed) {
    res.status(400);
    throw new Error('Email is not subscribed');
  }

  existing.isSubscribed = false;
  await existing.save();
  res.status(200).json({ message: 'Unsubscribed successfully' });
});

// @desc    Get all newsletter subscribers
// @route   GET /api/admin/newsletter
// @access  Private/Admin
export const getSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Newsletter.find({ isSubscribed: true });
  res.json(subscribers);
});
