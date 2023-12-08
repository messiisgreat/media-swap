import NextAuth from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
