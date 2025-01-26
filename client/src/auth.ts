import NextAuth, { AuthError } from "next-auth";
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
            typeAccount: "credentials",
          });

          if (user?.status === "error") {
            throw new InvalidLoginError(user?.error_code, user?.message);
          }

          return user;
        } catch (error) {
          // Nếu lỗi là ZodError, thì xử lý lỗi
          if (error instanceof ZodError) {
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
    async jwt({ token, profile, account }: any) {
      
      if (account?.provider === "google") {
        await axios.post("/auth/register", {
          email: profile?.email,
          name: profile?.name,
          typeAccount: "google",
        });

        token.type_account = "google";
      } else if (account?.provider === "credentials") {
        token.type_account = "credentials";
      }

      const response: any = await axios.post("/user/get-user", {
        email: token?.email,
        typeAccount: account?.provider ?? token?.type_account,
      });

      token.id = response?.user?.user_id;
      token.role = response?.user?.role_name;
      token.email = response?.user?.email;
      token.name = response?.user?.username;
      token.type_account = response?.user?.type_account;
      token.created_at = response?.user?.created_at;

      return token;
    },
    // nhận token từ jwt callback và trả về session
    async session({ session, token }: any) {
      session.user.id = token?.id ?? token?.sub;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.picture;
      session.user.role = token.role;
      session.user.type_account = token.type_account;
      session.user.created_at = token.created_at;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
