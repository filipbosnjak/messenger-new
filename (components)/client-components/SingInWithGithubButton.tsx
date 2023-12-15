import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Icons } from "@/components/icons";

export type SingInWithGithubButtonProps = {
  isLoading: boolean;
};

const SingInWithGithubButton = ({ isLoading }: SingInWithGithubButtonProps) => {
  return (
    <>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={(e) => {
          signIn("github", {
            callbackUrl: "/",
          }).then((r) => console.log(r));
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </>
  );
};

export default SingInWithGithubButton;
