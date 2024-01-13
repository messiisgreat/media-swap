import prisma from "@/lib/prisma";
import { env } from "@/utils/serverEnv";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import { type Adapter, type AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

/**
 * 初めてログインしたときにユーザーを作成する処理
 */
const prismaAdapter: Adapter = {
  ...PrismaAdapter(prisma),
  createUser: async ({ emailVerified, ...data }) => {
    const user = await prisma.user.create({
      data: {
        ...data,
        // 渡ってくる値がnullなのでデフォルト値を設定する
        emailVerified: emailVerified ?? new Date(),
        // 初回ログイン時はGoogleがメールアドレスを認証していることがわかっているのでtrueを設定する
        isEmailVerified: true,
      },
    });
    return user as unknown as AdapterUser;
  },
};

export const authOptions: NextAuthOptions = {
  adapter: prismaAdapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    session: ({ session, user: { id } }) => ({
      ...session,
      user: {
        ...session.user,
        id,
      },
    }),
  },
};
