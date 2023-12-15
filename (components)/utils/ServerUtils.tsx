import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export type CompProps = {};

export const authUser = async () => {
  const session = await getServerSession(options);
  const h = headers();
  const pathname = h.get("next-url");

  if (!session && !pathname?.includes("/login")) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  return session;
};

const ServerUtils = (props: CompProps) => {
  return <></>;
};

export default ServerUtils;
