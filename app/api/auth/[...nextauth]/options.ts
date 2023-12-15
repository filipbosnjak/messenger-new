import {githubProvider} from "@/app/api/auth/[...nextauth]/(providers)/GithubProvider";
import {googleProvider} from "@/app/api/auth/[...nextauth]/(providers)/GoogleProvider";
import {credentialsProvider} from "@/app/api/auth/[...nextauth]/(providers)/CredentialsProvider";
// @ts-ignore
import {AuthOptions} from "next-auth/src/core/types";

/*
    * This is the options object for NextAuth.
    * It contains all the configuration options for NextAuth.
    * Here we register the providers we created in the providers' folder.
    * We also set the pages for sign in and error.
    * Finally, we set the callbacks for jwt and session.
 */
export const options: AuthOptions = {
    providers:[
    credentialsProvider,
    googleProvider,
    githubProvider
    ],
    pages: {
        signIn: "/login",
        error: "/notfound",
    },
    callbacks: {
        // @ts-ignore
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        // @ts-ignore
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role;
            return session;
        },
    },

};
