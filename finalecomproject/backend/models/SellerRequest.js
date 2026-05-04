import mongoose from 'mongoose';

const sellerRequestSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    shopName: {
      type: String,
      required: true,
    },
    shopCategory: {
      type: String,
      required: true,
    },
    shopDescription: {
      type: String,
      required: true,
    },
    businessEmail: {
      type: String,
      required: true,
    },
    businessPhone: {
      type: String,
      required: true,
    },
    gstNumber: {
      type: String,
      required: true,
    },
    pickupAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    rejectionReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const SellerRequest = mongoose.model('SellerRequest', sellerRequestSchema);

export default SellerRequest;
