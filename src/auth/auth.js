import jwt from 'jsonwebtoken'
import { secretKey } from './config.js';

// Function to generate access token
export function generateAccessToken(user) {
  return jwt.sign({ email: user.email, _id: user._id }, secretKey, { expiresIn: '7d' });
}

