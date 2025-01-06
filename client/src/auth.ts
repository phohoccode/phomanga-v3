import NextAuth, { AuthError, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";
import GoogleProvider from "next-auth/providers/google";

// export class InvalidLoginError extends AuthError {
//   code = "invalid_credentials"; // lỗi mặc định
//   constructor(public message: string) {
//     super(message);
//     this.code = message;
//   }
// }

export class InvalidLoginError extends AuthError {
  constructor(public code: string, public details?: string) {
    // kế thừa từ AuthError
    super(details || "Đăng nhập thất bại!");

    // gán đè
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
        console.log(">>> credentials", credentials);

        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = null;

          console.log(">>> user-login", user);

          if (!user) {
            throw new InvalidLoginError(
              "invalid_credentials",
              "Thông tin đăng nhập không hợp lệ!!"
            );
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
      console.log(">>> jwt", token);
      // const dataUser: any = await fetchUser(token.email);

      if (profile && account) {
        token.id = profile.sub;
        token.name = profile.name;
        token.email = profile.email;
        token.picture = profile.picture;
      }

      // token.role = dataUser?.data?.role ?? "guest";

      console.log(">>> jwt-token", token);
      return token;
    },
    async session({ session, token }: any) {
      // const user: any = await fetchUser(token.email);

      session.user.id = token.id;
      // session.user.role = user?.data?.role;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.picture;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
