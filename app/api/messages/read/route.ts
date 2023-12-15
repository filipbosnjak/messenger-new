import { RegisterResponse } from "@/app/api/register/route";
import { NextRequest, NextResponse } from "next/server";
import messageServer from "@/message-server/server";
import prisma from "@/prisma/prisma";

export type MessageId = {
  id: string;
};

export async function POST(
  req: NextRequest,
  res: NextResponse<RegisterResponse>,
) {
  const { id } = (await req.json()) as MessageId;

  const updatedMessage = await prisma.message.update({
    where: { id: id },
    data: {
      isRead: true,
      // Add other fields you want to update if needed
    },
  });

  return Response.json({
    message: "Message read",
  });
}
