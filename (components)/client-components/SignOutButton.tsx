"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export type SignOutButtonProps = {};

const SignOutButton = (props: SignOutButtonProps) => {
  return (
    <>
      <Button
        onClick={() => {
          signOut().then((r) => {});
        }}
      >
        Logout
      </Button>
    </>
  );
};

export default SignOutButton;
