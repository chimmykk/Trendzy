import User from '../../../models/user';
import { connectMongoDB } from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { code, email } = req.body;
      await connectMongoDB();

      // Find the user with both email and passwordResetToken
      const user = await User.findOne({ email, passwordResetToken: code });

      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password reset token.' });
      }

      const successResponse = {
        message: 'Verification successful.',
      };
      res.status(200).json(successResponse);
    } catch (error) {
      console.error('An error occurred while verifying the code:', error);
      const errorResponse = {
        message: 'An error occurred while verifying the code.',
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
