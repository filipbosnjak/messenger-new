import React from "react";
import { authUser } from "@/(components)/utils/ServerUtils";

export type PageProps = {};

const Page = async (props: PageProps) => {
  await authUser();
  return <>asdf</>;
};

export default Page;
