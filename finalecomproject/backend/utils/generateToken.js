import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  // Set JWT as HTTP-Only cookie (optional, but good for security)
  // For standard API, we might just return the token
  // Let's return it to the client for easy frontend handling in this project
  return token;
};

export default generateToken;
