import asyncHandler from 'express-async-handler';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

// @desc    Upload image to Cloudinary
// @route   POST /api/upload/image
// @access  Private (User/Seller/Admin)
export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No image file provided');
  }

  // Use streamifier to upload buffer to Cloudinary
  const uploadFromBuffer = (req) => {
    return new Promise((resolve, reject) => {
      const cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          folder: 'zenvy',
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
    });
  };

  try {
    const result = await uploadFromBuffer(req);
    res.status(200).json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500);
    throw new Error('Image upload failed');
  }
});
