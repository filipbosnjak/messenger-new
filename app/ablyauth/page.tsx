import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { authUser } from "@/(components)/utils/ServerUtils";

export type PageProps = {};

const AblyAuthClientComponent = dynamic(
  () => import("./AblyAuthClientComponent"),
  {
    ssr: false,
  },
);

const Page = async (props: PageProps) => {
  await authUser();
  return (
    <>
      ablyauth
      <AblyAuthClientComponent />
    </>
  );
};

export default Page;
