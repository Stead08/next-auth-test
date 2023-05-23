import type {NextAuthOptions} from "next-auth";
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import {auth} from "@/firebase/admin";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        idToken: { label: "ID Token", type: "text" },
      },
      authorize: async (credentials: Record<"idToken", string> | undefined, _req) => {
        if (credentials) {
          try {
            const decoded = await auth.verifyIdToken(credentials.idToken);
            return {
              id: decoded.uid,
              email: decoded.email,
            };
          } catch (err) {
            console.error(err);
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {...token, uid: user.id, email: user.email};
      }
      return token;
    },
    // sessionにJWTトークンからのユーザ情報を格納
    async session({ session, token }) {
      session.user.emailVerified = token.emailVerified;
      session.user.uid = token.uid;
      return session;
    },
  },
};

export default NextAuth(authOptions);