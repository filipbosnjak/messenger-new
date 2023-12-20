"use client";

import React from "react";
import { AblyProvider, useChannel } from "ably/react";
import * as Ably from "ably";
import MessagesList from "@/app/messages/components/MessagesList";
import { DBMessage } from "@/app/api/get-messages/route";
import SingleMessageView from "@/app/messages/components/SingleMessageView";
import { useRouter } from "next/navigation";
import { ShadDataTable } from "@/(components)/ShadDataTable";
import { Button } from "@/components/ui/button";

export type MessagesProps = {
  user: string;
  messages: DBMessage[];
};

export const defaultMessage: DBMessage = {
  id: "",
  fromId: "",
  toId: "",
  subject: "",
  text: "",
  createdAt: new Date(),
  isRead: false,
  from: {
    email: "",
  },
};

export const ablyClient = new Ably.Realtime.Promise({
  authUrl: "/ably",
  authMethod: "POST",
});

const Messages = ({ user, messages }: MessagesProps) => {
  const router = useRouter();

  const refresh = () => {
    router.refresh();
  };

  const [singleMessageView, setSingleMessageView] =
    React.useState<boolean>(false);

  const [currentMessage, setCurrentMessage] =
    React.useState<DBMessage>(defaultMessage);

  console.log("user: ", user);

  return (
    <>
      <AblyProvider client={ablyClient}>
        <Button
          onClick={() => {
            router.refresh();
          }}
        >
          Refresh
        </Button>
        {singleMessageView ? (
          <SingleMessageView
            message={currentMessage}
            setSingleMessageView={setSingleMessageView}
          />
        ) : (
          <div>
            <ShadDataTable
              user={user}
              messages={messages}
              setSingleMessageView={setSingleMessageView}
              setCurrentMessage={setCurrentMessage}
              refresh={refresh}
            />
          </div>
        )}
      </AblyProvider>
    </>
  );
};

export default Messages;
