import prisma from "@/lib/prisma";
import { env } from "@/utils/serverEnv";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import { type Adapter, type AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

const prismaAdapter: Adapter = {
  ...PrismaAdapter(prisma),
  // 一部のプロパティの名前を変更する
  createUser: async (data) => {
    const user = await prisma.user.create({
      data: {
        ...data,
        isEmailVerified:
          data.emailVerified == undefined
            ? undefined
            : Boolean(data.emailVerified),
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
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
};
