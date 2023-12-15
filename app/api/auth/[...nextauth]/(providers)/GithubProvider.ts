import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import { TokenSetParameters } from "openid-client";
import prisma from "@/prisma/prisma";

export const githubProvider = GitHubProvider({
  profile: async (profile: GithubProfile, tokens: TokenSetParameters) => {
    // Connect to the database
    // Check if a user exists in the database
    // If so, return the user object
    // If not, create a new user object and save it to the database
    // Return the user object

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
        image: profile.avatar_url,
      };
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: profile?.email || "",
          username: profile?.name || profile?.login || "",
          role: "USER",
          domain: "github",
        },
      });

      return {
        id: newUser.id.toString(),
        name: newUser.username,
        email: newUser.email,
        image: profile.avatar_url,
      };
    }
  },
  clientId: process.env.GITHUB_CLIENT_ID || "",
  clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
});
