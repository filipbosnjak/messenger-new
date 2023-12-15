import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { User } from "@prisma/client";

export type GetMessagesRequest = {
  email: string;
};

export type DBMessage = {
  id: string;
  subject: string | null;
  text: string | null;
  fromId: string | null;
  toId: string | null;
  isRead: boolean;
  createdAt: Date;
  from: { email: string | null } | null;
};

export async function POST(req: Request, res: NextResponse<DBMessage[]>) {
  const { email } = (await req.json()) as GetMessagesRequest;

  const messages = await prisma.message.findMany({
    where: {
      to: {
        email: email,
      },
    },
  });

  return NextResponse.json(messages, {
    status: 200,
  });
}
