import { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from '../../../lib/mongodb';
import User from '../../../models/user';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { SessionStrategy } from 'next-auth';


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      // Define an intermediate authorize function
      authorize: async (credentials, req) => {
        return new Promise<any>(async (resolve, reject) => {
          try {
            // Your custom authorization logic
            await connectMongoDB();
            const user = await User.findOne({ email: credentials?.email });

            if (!user) {
              resolve(null);
            }

            const passwordsMatch = await bcrypt.compare(
              credentials?.password || '',
              user.password
            );

            if (!passwordsMatch) {
              resolve(null);
            }

            resolve(user);
          } catch (error) {
            console.error('Error during authorization:', error);
            reject(new Error('Authorization failed'));
          }
        });
      },
    }),
     GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy | undefined,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        await connectMongoDB();

        if (account?.provider === 'google') {
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              password: null,
              verification_token: null,
              verification_code: null,
              verified: true,
              phone: null,
              image: null,
            });
          }
        } else {
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              verified: true,
            });
          }
        }
      } catch (error) {
        console.error('Error during sign-in:', error);
        throw new Error('Sign-in failed');
      }

      return true;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);
