import prisma from "@/prisma/prisma";

export type Message = {
  subject: string;
  text: string;
  from: string;
  to: string;
};

export async function POST(req: Request) {
  const message: Message = (await req.json()) as Message;

  const toUser = await prisma.user.findUnique({
    where: {
      email: message.to,
    },
  });
  console.log("toUser: ", toUser);
  if (!toUser) {
    return new Response("No user found with to email");
  }

  const fromUser = await prisma.user.findUnique({
    where: {
      email: message.from,
    },
  });

  await prisma.message.create({
    data: {
      subject: message.subject,
      text: message.text,
      from: {
        connect: {
          id: fromUser?.id,
        },
      },
      to: {
        connect: {
          id: toUser?.id,
        },
      },
    },
  });
  console.log("message: ", message);
  return new Response("Message sent");
}
