import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";

export const credentialsProvider = CredentialsProvider({
  type: "credentials",
  id: "credentials",
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "text", placeholder: "jsmith" },
    password: { label: "Password", type: "password" },
  },
  //@ts-ignore
  async authorize(credentials, request) {
    try {
      const foundUser = await prisma.user.findUnique({
        where: {
          email: credentials?.email,
        },
      });

      if (foundUser) {
        // compare the password from the form with the stored password
        const passwordsMatch = await bcrypt.compare(
          credentials?.password || "",
          foundUser?.password || "",
        );
        if (!passwordsMatch) {
          console.log("passwords don't match");
          return null;
        }
        return {
          email: foundUser.email,
          name: foundUser.username,
        };
      } else {
        return { error: "No user found" };
      }
    } catch (error) {
      console.log("error: ", error);
    }
    return { error: "No user found" };
  },
});
