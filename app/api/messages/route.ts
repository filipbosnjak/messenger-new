import { RegisterResponse } from "@/app/api/register/route";
import { NextRequest, NextResponse } from "next/server";
import messageServer from "@/message-server/server";

export type MessageInput = {
  sender: string;
  receiver: string;
  message: string;
};

export async function POST(
  req: NextRequest,
  res: NextResponse<RegisterResponse>,
) {
  const message = (await req.json()) as MessageInput;
  const { server, id } = messageServer;
  server?.emit("message", "server server");

  setTimeout(() => {
    if (server !== null) {
      console.log("message server is not null");
    }
    server?.emit("message", "server server");
  }, 2000);
  return Response.json({
    message: "User created",
  });
}
