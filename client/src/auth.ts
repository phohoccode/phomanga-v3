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

          console.log(">>> user-login", user);

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
          throw error; // Ném lại nếu là InvalidLoginError
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
    async jwt({ token, user, account, profile }: any) {
      const dataUser: any = await axios.post("/user/get-user", {
        email: token?.email,
      });

      console.log(">>> token-before", token);
      console.log(">>> dataUser-jwt", dataUser);

      if (profile && account) {
        token.id = profile.sub;
        token.name = profile.name;
        token.email = profile.email;
        token.picture = profile.picture;
      }

      if (dataUser.status === "success") {
        token.role = dataUser?.user?.role_id === 1 ? "guest" : "admin";
      } else {
        token.role = "guest";
      }

      console.log(">>> token-after", token);
      return token;
    },
    async session({ session, token }: any) {
      const dataUser: any = await axios.post("/user/get-user", {
        email: token?.email,
      });

      console.log(">>> session-before", session);
      console.log(">>> dataUser-session", dataUser);

      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.picture;

      if (dataUser.status === "success") {
        session.user.role = dataUser?.user?.role_id === 1 ? "guest" : "admin";
      } else {
        session.user.role = "guest";
      }

      console.log(">>> session-after", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
