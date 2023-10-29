import { prisma } from "@/lib/prisma";
import { env } from "@/utils/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // https://next-auth.js.org/configuration/callbacks
  /**
   * callbacksプロパティは、sessionというコールバック関数を持っています。
   * この関数は、sessionとuserという2つの引数を受け取ります。
   * sessionオブジェクトのuserプロパティのidに、userオブジェクトのidを代入しています。
   * そして、sessionオブジェクトを返しています。
   * これで、セッションにuser.idが保存されるようになりました。
   */
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
