import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Icons } from "@/components/icons";
import { FcGoogle } from "react-icons/fc";

export type SingInWithGoogleButtonProps = {
  isLoading: boolean;
};

const SingInWithGoogleButton = ({ isLoading }: SingInWithGoogleButtonProps) => {
  return (
    <>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={(e) => {
          signIn("google", {
            callbackUrl: "/",
          }).then((r) => console.log(r));
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FcGoogle size={21} style={{ marginRight: "4px" }} />
        )}{" "}
        Google
      </Button>
    </>
  );
};

export default SingInWithGoogleButton;
