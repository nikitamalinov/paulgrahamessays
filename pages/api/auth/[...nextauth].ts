import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import GoogleProvider from "next-auth/providers/google";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
    callbacks: {
      async session({ session, token, user }) {
        session.idToken = token.idToken || "";
        return session;
      },
      async jwt({ token, account }) {
        if (account) {
          token.idToken = account.id_token;
        }
        return token;
      },
    },
    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
  });
}
