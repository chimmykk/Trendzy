// post api to add user to usergoogle database
import { connectMongoDB } from '../../../lib/mongodb';
import GoogleUser from '../../../models/google'; 

export default async function handler(req, res) {
  try {
    await connectMongoDB('google'); // Updated to use 'google'

    if (req.method === 'POST') {
      const { name, email } = req.body;

      const userExists = await GoogleUser.findOne({ email });

      if (!userExists) {
        const newUser = new GoogleUser({
          name,
          email,
        });

        await newUser.save(); 

        return res.status(200).json({ message: 'User added successfully' });
      } else {
        return res.status(409).json({ message: 'User already exists' });
      }
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
