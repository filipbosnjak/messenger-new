import { RegisterResponse } from "@/app/api/register/route";
import { NextRequest, NextResponse } from "next/server";

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
  return Response.json({
    message: "User created",
  });
}
