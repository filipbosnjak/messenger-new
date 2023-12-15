import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import prisma from "@/prisma/prisma";

export const googleProvider = GoogleProvider({
  async profile(profile: GoogleProfile) {
    // Connect to the database
    // Check if a user exists in the database
    // If so, return the user object
    // If not, create a new user object and save it to the database
    // Return the user object

    // Here we get data from Google and we can do whatever we want with it

    const foundUser = await prisma.user.findUnique({
      where: {
        email: profile?.email || "",
      },
    });

    if (foundUser) {
      return {
        id: foundUser.id.toString(),
        name: foundUser.username,
        email: foundUser.email,
        image: profile.picture,
      };
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: profile?.email || "",
          username: profile?.name || profile?.login || "",
          role: "USER",
          domain: "google",
        },
      });

      return {
        id: newUser.id.toString(),
        name: newUser.username,
        email: newUser.email,
        image: profile.picture,
      };
    }
  },
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
});
