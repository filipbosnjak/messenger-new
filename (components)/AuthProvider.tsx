"use client";

import { SessionProvider } from "next-auth/react";

/**
 *
 * AuthProvider is a wrapper for the next-auth SessionProvider
 * It is used to provide the session to the entire app
 */

const AuthProvider = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
