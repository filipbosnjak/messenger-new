"use client";

import React, { useEffect } from "react";
import { AblyProvider, ChannelResult, useChannel } from "ably/react";
import * as Ably from "ably";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { NewMessageInput } from "@/app/messages/newmessage/page";
import { Message } from "@/app/api/send-message/route";
import { MessageSentSuccessfulyToast } from "@/(components)/ToastUtils";
import { DBMessage } from "@/app/api/get-messages/route";

export type NewMessageProps = {
  user: string;
};

const NewMessage = ({ user }: NewMessageProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [isMessageSending, setIsMessageSending] =
    React.useState<boolean>(false);

  const client = new Ably.Realtime.Promise({
    authUrl: "/ably",
    authMethod: "POST",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<NewMessageInput>();

  const newMessageChannel = useChannel(
    getValues("receiver"),
    (message: Ably.Types.Message) => {},
  );

  const sendMessage: SubmitHandler<NewMessageInput> = async ({
    receiver,
    text,
    subject,
  }: NewMessageInput) => {
    console.log(`Sending message to ${receiver}`);
    const newMessage: DBMessage = {
      id: "",
      fromId: "",
      toId: "",
      subject: subject,
      text: text,
      createdAt: new Date(),
      isRead: false,
      from: {
        email: "",
      },
    };
    await newMessageChannel.channel.publish("new-message", {
      text: JSON.stringify(newMessage),
    });

    const message: Message = {
      from: user,
      to: receiver,
      subject: subject,
      text: text,
    };
    setIsMessageSending(true);
    await fetch("/api/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    MessageSentSuccessfulyToast();
    setIsMessageSending(false);
  };
  return (
    <>
      <AblyProvider client={client}>
        <div
          className={
            "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] p-2"
          }
        >
          <form onSubmit={handleSubmit(sendMessage)}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label htmlFor="receiver">To:</Label>
                <Input
                  id="receiver"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register("receiver", { required: true })}
                />
                <Label htmlFor="subject">Subject:</Label>
                <Input
                  id="subject"
                  placeholder=""
                  type="text"
                  autoCapitalize="none"
                  autoComplete=""
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register("subject", { required: true })}
                />
                <Label htmlFor="receiver">Text:</Label>
                <Input
                  id="receiver"
                  placeholder=""
                  type="text"
                  autoCapitalize="none"
                  autoComplete=""
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register("text", { required: true })}
                />
              </div>
              <Button disabled={isLoading || isMessageSending}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isMessageSending ? "Sending..." : "Send message"}
              </Button>
            </div>
          </form>
        </div>
      </AblyProvider>
    </>
  );
};

export default NewMessage;
