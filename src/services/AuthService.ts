import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { NextAuthConfig } from "next-auth";

const config = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;

        // TODO: Validate credentials (eg. check DB)
        if (email === "admin@example.com" && password === "admin") {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

const handler = NextAuth(config);

export default class AuthService {
    static async login(username: string, password: string) {
        // Simulate an API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    token: "fake-jwt-token",
                    user: { username },
                });
            }, 1000);
        });
    }

    static async logout() {
        // Simulate an API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    }
}