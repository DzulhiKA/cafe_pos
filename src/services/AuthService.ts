import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { compare } from "bcryptjs";

const config = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || credentials.password) return null;

        const user = await User.findOne({
            where: {
                username: credentials.username,
            }
        })

        // TODO: Validate credentials (eg. check DB)
        if (user) {
            const isValidPassword = await compare(
                credentials.password,
                user.password
            );

            if (!isValidPassword) return null;

          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async jwt({ token, user } : {
//         token: JWT
//         user: User,
//     }) {
//       if (user) { 
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user && token.id) {
//         session.user.id = token.id as string;
//       }
//       return session;
//     },
//   },
} satisfies NextAuthOptions;

const nextAuthHandler = NextAuth(config);
export default nextAuthHandler;