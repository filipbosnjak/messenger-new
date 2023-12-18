"use client";
import React from "react";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { authUser } from "@/(components)/utils/ServerUtils";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import * as Ably from "ably";
import { AblyProvider } from "ably/react";

export type NewMessageInput = {
  receiver: string;
  sender: string;
  subject: string;
  text: string;
};

const NewMessage = dynamic(() => import("./components/NewMessage"), {
  ssr: false,
});

const client = new Ably.Realtime.Promise({
  authUrl: "/ably",
  authMethod: "POST",
});

export type PageProps = {};

const Page = (props: PageProps) => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  return (
    <>
      <AblyProvider client={client}>
        <NewMessage user={session?.user?.email || ""} />
      </AblyProvider>
    </>
  );
};

export default Page;
