import NextAuth, { AuthError, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";
import GoogleProvider from "next-auth/providers/google";
import axios from "@/config/axios";
import { codeErrorLogin } from "./lib/types";

export class InvalidLoginError extends AuthError {
  constructor(public code: codeErrorLogin, public details?: string) {
    super(details);
    this.code = code;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user: any = await axios.post("/auth/login", {
            email,
            password,
          });

          console.log(">>> user", user);

          if (user?.status === "error") {
            throw new InvalidLoginError(user?.error_code, user?.message);
          }

          return user;
        } catch (error) {
          // Nếu lỗi là ZodError, thì xử lý lỗi
          if (error instanceof ZodError) {
            console.log(">>> error", error.issues);
            throw new InvalidLoginError(
              "zod_error",
              error?.issues?.[0]?.message
            );
          }
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, profile }: any) {
      const response: any = await axios.post("/user/get-user", {
        email: token?.email,
      });

      if (profile && response?.status === "error") {
        token.role = "guest";
      } else if (response?.status === "success" && !profile) {
        token.role = response?.user?.role_name;
      }

      return token;
    },
    // nhận token từ jwt callback và trả về session
    async session({ session, token }: any) {
      session.user.id = token?.id ?? token?.sub;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.picture;
      session.user.role = token.role;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
