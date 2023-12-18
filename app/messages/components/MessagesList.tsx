import React, { useEffect, useTransition } from "react";
import { useChannel } from "ably/react";
import * as Ably from "ably";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { MdDelete, MdForwardToInbox } from "react-icons/md";
import { DBMessage } from "@/app/api/get-messages/route";
import { useRouter } from "next/navigation";

export type MessagesListProps = {
  user: string;
  messages: DBMessage[];
  setCurrentMessage: React.Dispatch<React.SetStateAction<DBMessage>>;
  setSingleMessageView: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
};

const MessagesList = ({
  user,
  messages,
  setCurrentMessage,
  setSingleMessageView,
  refresh,
}: MessagesListProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [clientMessages, setClientMessages] =
    React.useState<DBMessage[]>(messages);
  // message.data will be stringified JSON of the DBmessage object
  const { channel } = useChannel(user, (message: Ably.Types.Message) => {
    const newMessage = JSON.parse(message.data.text) as DBMessage;
    console.log("message: ", newMessage);
    setClientMessages((prev) => [...prev, newMessage]);
    console.log("state updated");
  });

  useEffect(() => {
    setClientMessages(messages);
  }, [messages]);
  const handleMessageClicked = async (message: DBMessage) => {
    console.log("message: ", message);
    setCurrentMessage(message);
    setSingleMessageView(true);
    if (!message.isRead) {
      await fetch("/api/messages/read", {
        method: "POST",
        body: JSON.stringify({ id: message.id }),
      });
    }
  };

  return (
    <>
      <Table>
        <TableCaption>Your messages</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Subject</TableHead>
            <TableHead>Text</TableHead>
            <TableHead>From</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientMessages.map((message) => (
            <TableRow
              key={message.id}
              className={"cursor-pointer"}
              onClick={async () => {
                console.log("clicked message: ", message);
                await handleMessageClicked(message);
              }}
            >
              <TableCell className={message.isRead ? "" : "font-bold"}>
                {message.subject}
              </TableCell>
              <TableCell className={message.isRead ? "" : "font-bold"}>
                {(message.text?.length || 0) < 20
                  ? message.text
                  : message.text?.substring(0, 20).concat("...")}
              </TableCell>
              <TableCell className={message.isRead ? "" : "font-bold"}>
                {message.from?.email}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Actions</span>
                      <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem
                      onClick={(event) => {
                        console.log("forward");
                        event.stopPropagation();
                      }}
                    >
                      Forward
                      <DropdownMenuShortcut className={"text-xl"}>
                        <MdForwardToInbox />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={(event) => {
                        fetch("/api/message", {
                          method: "DELETE",
                          body: JSON.stringify({ id: message.id }),
                        }).then(() => router.refresh());
                        refresh();
                        event.stopPropagation();
                      }}
                    >
                      Delete
                      <DropdownMenuShortcut className={"text-xl"}>
                        <MdDelete />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Footer</TableCell>
            <TableCell className="text-right">Table footer</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default MessagesList;
