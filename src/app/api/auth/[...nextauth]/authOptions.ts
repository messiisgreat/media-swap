import prisma from "@/lib/prisma";
import { env } from "@/utils/serverEnv";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prismaAdapter = PrismaAdapter(prisma);

// @ts-expect-error 一部のプロパティの名前を変更する
prismaAdapter.createUser = (data) => {
  return prisma.user.create({
    data: {
      email: data.email,
      image: data.image,
      name: data.name,
      isEmailVerified:
        data.emailVerified == undefined
          ? undefined
          : Boolean(data.emailVerified),
    },
  });
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
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
};
