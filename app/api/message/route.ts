import { NextRequest, NextResponse } from "next/server";
import { RegisterResponse } from "@/app/api/register/route";
import { MessageId } from "@/app/api/messages/read/route";
import prisma from "@/prisma/prisma";

export async function DELETE(
  req: NextRequest,
  res: NextResponse<RegisterResponse>,
) {
  const { id } = (await req.json()) as MessageId;

  const deleted = await prisma.message.delete({
    where: { id: id },
  });

  console.log("deleting message: ", deleted);

  return Response.json({
    message: "Message deleted",
  });
}
