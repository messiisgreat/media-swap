import { DefaultSession } from "next-auth";

// そのままでは型が足りないので、型を拡張する
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
