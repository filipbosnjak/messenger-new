import NextAuth from "next-auth";
import { options } from "./options";

/*
* This is a connector route for NextAuth.
* This route is called by the NextAuth client library.
 */

const handler = NextAuth(options);
export { handler as GET, handler as POST };