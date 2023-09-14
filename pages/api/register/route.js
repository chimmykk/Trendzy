import bcrypt from 'bcryptjs';
import User from '../../../models/user';
import { connectMongoDB } from '../../../lib/mongodb';
import crypto from 'crypto';

function generateVerificationToken() {
  const randomBytes = crypto.randomBytes(32);
  const verificationToken = randomBytes.toString('hex');
  return verificationToken;
}

function generateVerificationCode() {
  // Generate 6 digit code using Math.random
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  return code;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = generateVerificationToken();
      const verificationCode = generateVerificationCode();

      await connectMongoDB('email');
     
      await User.create({
        name,
        email,
        password: hashedPassword,
        verification_token: verificationToken,
        verification_code: verificationCode,
        verified: false,
      });

      const successResponse = {
        message: 'User registered successfully.',
        verification_token: verificationToken,
        verification_code: verificationCode,
      };
      res.status(201).json(successResponse);
    } catch (error) {
      console.error('An error occurred while registering the user:', error);
      const errorResponse = {
        message: 'An error occurred while registering the user.',
      };
      res.status(500).json(errorResponse);
    }
  } else {
    const notAllowedResponse = {
      message: 'Method not allowed.',
    };
    res.status(405).json(notAllowedResponse);
  }
}
