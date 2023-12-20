"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/system";
import { BadgeProps } from "@mui/base";
import { useEffect, useState } from "react";
import { DBMessage } from "@/app/api/get-messages/route";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -6,
    top: -1,
    border: `1px solid white`,
    padding: "0 4px",
    width: "10px",
  },
}));

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [newMessages, setNewMessages] = useState(20);
  const [messages, setMessages] = useState<DBMessage[]>([]);

  useEffect(() => {
    fetch("/api/get-messages", {
      method: "POST",
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        const messages = data as DBMessage[];
        console.log(messages);
        setMessages(messages);
        setNewMessages(messages.filter((message) => !message.isRead).length);
      });
  }, []);
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6 h-12", className)}
      {...props}
    >
      <Link href="/" className="text-sm font-medium">
        Home
      </Link>
      <StyledBadge
        badgeContent={newMessages}
        color="primary"
        max={99}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Link href="/messages" className="text-sm font-medium">
          Messages
        </Link>
      </StyledBadge>

      <Link
        href="/dashboard"
        className="text-sm font-medium dark:text-gray-300"
      >
        Overview
      </Link>
      <Link href="/ablyauth" className="text-sm font-medium ">
        AblyAuth
      </Link>
      <Link href="/pubsub" className="text-sm font-medium">
        PubSub
      </Link>
      <Link href="/settings" className="text-sm font-medium">
        Settings
      </Link>
    </nav>
  );
}
