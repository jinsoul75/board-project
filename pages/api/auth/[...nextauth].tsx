import { connectDB } from '@/util/database';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

const clientId: string = process.env.KAKAO_CLIENT_ID || '';
const clientSecret: string = process.env.KAKAO_CLIENT_SECRET || '';

export const authOptions:any = {
  providers: [
    KakaoProvider({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  ],
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
