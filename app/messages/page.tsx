import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authUser } from "@/(components)/utils/ServerUtils";
import dynamic from "next/dynamic";
import prisma from "@/prisma/prisma";
import { DBMessage } from "@/app/api/get-messages/route";

export type PageProps = {};

export type ServerSession = {
  user: { name: string; email: string; image: string; role: string };
};

const Messages = dynamic(() => import("./components/Messages"), {
  ssr: false,
});

const Page = async (props: PageProps) => {
  await authUser();
  const session: ServerSession = (await authUser()) as ServerSession;
  console.log("messages from the server refreshed");

  const messages: DBMessage[] = await prisma.message.findMany({
    where: {
      to: {
        email: session.user.email,
      },
    },
    include: {
      from: {
        select: {
          email: true,
        },
      },
    },
  });

  console.log("messages: ", messages);

  return (
    <>
      <div>
        <div className={"flex h-[75px] justify-center items-center"}>
          <Button>
            <Link href={"/messages/newmessage"}>New message</Link>
          </Button>
        </div>
        <Messages user={session.user.email} messages={messages} />
      </div>
    </>
  );
};

export default Page;
